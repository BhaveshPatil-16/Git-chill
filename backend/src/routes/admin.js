const { db } = require('../firebase');

module.exports = async function (fastify, opts) {
  
  // POST /login — generate real JWT for admin
  fastify.post('/login', async (request, reply) => {
    const { username, password } = request.body;
    if (username === 'admin' && password === 'admin123') {
      const token = require('jsonwebtoken').sign(
        { username: 'admin', role: 'admin' },
        process.env.JWT_SECRET || 'supersecretkey_for_demo',
        { expiresIn: '1d' }
      );
      return { success: true, token };
    }
    return reply.code(401).send({ success: false, message: 'Invalid credentials' });
  });

  // GET /pending — fetch users awaiting verification
  fastify.get('/pending', { preHandler: [fastify.authenticate] }, async (request, reply) => {
    console.log('[Admin] Fetching pending users...');
    try {
      const snapshot = await db.collection('users')
        .where('verificationStatus', '==', 'pending')
        .get();
      
      console.log(`[Admin] Found ${snapshot.size} pending users.`);
      
      const pendingUsers = [];
      snapshot.forEach(doc => {
        const data = doc.data();
        console.log(`[Admin] User: ${data.email}, Status: ${data.verificationStatus}`);
        pendingUsers.push({ id: doc.id, ...data });
      });
      return { success: true, pendingUsers };
    } catch (error) {
      console.error('[Admin] Error fetching pending users:', error);
      return reply.code(500).send({ success: false, message: 'Failed to fetch pending users', error: error.message });
    }

  });

  // DEBUG: GET /debug-users — fetch all users regardless of status
  fastify.get('/debug-users', { preHandler: [fastify.authenticate] }, async (request, reply) => {

    try {
      const snapshot = await db.collection('users').get();
      const users = [];
      snapshot.forEach(doc => {
        users.push({ id: doc.id, ...doc.data() });
      });
      return { success: true, users };
    } catch (error) {
      return reply.code(500).send({ success: false, error: error.message });
    }
  });



  // POST /approve — approve a user
  fastify.post('/approve', { preHandler: [fastify.authenticate] }, async (request, reply) => {
    const { userId } = request.body;
    if (!userId) return reply.code(400).send({ success: false, message: 'User ID required' });
    try {
      await db.collection('users').doc(userId).update({ verificationStatus: 'verified' });
      return { success: true, message: 'User verified successfully' };
    } catch (error) {
      fastify.log.error(error);
      return reply.code(500).send({ success: false, message: 'Failed to approve user', error: error.message });
    }
  });

  // POST /reject — reject a user
  fastify.post('/reject', { preHandler: [fastify.authenticate] }, async (request, reply) => {
    const { userId } = request.body;
    if (!userId) return reply.code(400).send({ success: false, message: 'User ID required' });
    try {
      await db.collection('users').doc(userId).update({ verificationStatus: 'rejected' });
      return { success: true, message: 'User rejected' };
    } catch (error) {
      fastify.log.error(error);
      return reply.code(500).send({ success: false, message: 'Failed to reject user', error: error.message });
    }
  });
};
