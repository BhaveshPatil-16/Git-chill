const { db } = require('../firebase');

module.exports = async function (fastify, opts) {
  
  // POST /create — Create a new investment deal
  fastify.post('/create', { preHandler: [fastify.authenticate] }, async (request, reply) => {
    const { title, description, entityName, fundingGoal, valuation, equityOffered } = request.body;
    const userId = request.user.uid;

    try {
      // Check if user is a verified founder (Optional check or just flag it)
      const userDoc = await db.collection('users').where('firebaseUid', '==', userId).limit(1).get();
      const userData = userDoc.empty ? {} : userDoc.docs[0].data();
      
      const newDeal = {
        founderId: userId,
        founderName: userData.name || 'Unknown',
        entityName,
        title,
        description,
        fundingGoal,
        valuation,
        equityOffered,
        status: 'active',
        trustIndicators: {
          isFounderVerified: userData.founderStatus === 'verified',
          isEntityVerified: false,
          directHandshakeOnly: true
        },
        representatives: [
          { uid: userId, role: 'Owner', permissions: ['all'] }
        ],
        createdAt: new Date().toISOString()
      };

      const docRef = await db.collection('investmentDeals').add(newDeal);
      return { success: true, dealId: docRef.id, message: 'Investment deal listed successfully' };
    } catch (error) {
      return reply.code(500).send({ success: false, message: error.message });
    }
  });

  // GET /deals — Fetch all active deals
  fastify.get('/deals', async (request, reply) => {
    try {
      const snapshot = await db.collection('investmentDeals')
        .where('status', '==', 'active')
        .get();
      
      const deals = [];
      snapshot.forEach(doc => {
        deals.push({ id: doc.id, ...doc.data() });
      });
      return { success: true, deals };
    } catch (error) {
      return reply.code(500).send({ success: false, message: error.message });
    }
  });

  // POST /verify-owner — Submit ownership docs
  fastify.post('/verify-owner', { preHandler: [fastify.authenticate] }, async (request, reply) => {
    const { entityName, documentUrl } = request.body;
    const userId = request.user.uid;

    try {
      // Find the user's Firestore doc
      const userSnapshot = await db.collection('users').where('firebaseUid', '==', userId).limit(1).get();
      if (userSnapshot.empty) return reply.code(404).send({ success: false, message: 'User not found' });
      
      const userDoc = userSnapshot.docs[0];
      await userDoc.ref.update({
        founderStatus: 'pending',
        pendingEntity: entityName,
        ownershipDoc: documentUrl
      });

      return { success: true, message: 'Founder verification documents submitted' };
    } catch (error) {
      return reply.code(500).send({ success: false, message: error.message });
    }
  });

  // POST /request-intro — Handshake request
  fastify.post('/request-intro', { preHandler: [fastify.authenticate] }, async (request, reply) => {
    const { dealId, investorNote } = request.body;
    const investorId = request.user.uid;

    try {
      const dealDoc = await db.collection('investmentDeals').doc(dealId).get();
      if (!dealDoc.exists) return reply.code(404).send({ success: false, message: 'Deal not found' });

      const dealData = dealDoc.data();
      
      // Create a handshake request
      const handshake = {
        dealId,
        investorId,
        founderId: dealData.founderId,
        investorNote,
        status: 'pending', // pending, accepted, rejected
        timestamp: new Date().toISOString()
      };

      await db.collection('handshakes').add(handshake);
      return { success: true, message: 'Intro request sent to the verified owner' };
    } catch (error) {
      return reply.code(500).send({ success: false, message: error.message });
    }
  });
};
