const { db } = require('../firebase');

module.exports = async function (fastify, opts) {

  // POST /create — organizer submits event for admin approval
  fastify.post('/create', async (request, reply) => {
    const { title, description, date, price, organizerId, organizerName } = request.body;
    if (!title || !date || price === undefined) {
      return reply.code(400).send({ success: false, message: 'Missing required fields: title, date, price' });
    }
    try {
      const eventData = {
        title,
        description: description || '',
        date,
        price: Number(price),
        organizerId: organizerId || 'anonymous',
        organizerName: organizerName || 'Unknown Organizer',
        status: 'pending',
        createdAt: new Date().toISOString()
      };
      const eventRef = await db.collection('events').add(eventData);
      return { success: true, eventId: eventRef.id, message: 'Event submitted and pending admin approval' };
    } catch (error) {
      fastify.log.error(error);
      return reply.code(500).send({ success: false, message: 'Failed to create event', error: error.message });
    }
  });

  // GET /pending — admin sees all pending events
  fastify.get('/pending', async (request, reply) => {
    try {
      const snapshot = await db.collection('events').where('status', '==', 'pending').get();
      const pendingEvents = [];
      snapshot.forEach(doc => pendingEvents.push({ id: doc.id, ...doc.data() }));
      return { success: true, pendingEvents };
    } catch (error) {
      return reply.code(500).send({ success: false, error: error.message });
    }
  });

  // GET /approved — public: all approved events
  fastify.get('/approved', async (request, reply) => {
    try {
      const snapshot = await db.collection('events').where('status', '==', 'approved').get();
      const events = [];
      snapshot.forEach(doc => events.push({ id: doc.id, ...doc.data() }));
      return { success: true, events };
    } catch (error) {
      return reply.code(500).send({ success: false, error: error.message });
    }
  });

  // POST /approve
  fastify.post('/approve', async (request, reply) => {
    const { eventId } = request.body;
    try {
      await db.collection('events').doc(eventId).update({ status: 'approved' });
      return { success: true, message: 'Event approved' };
    } catch (error) {
      return reply.code(500).send({ success: false, error: error.message });
    }
  });

  // POST /reject
  fastify.post('/reject', async (request, reply) => {
    const { eventId } = request.body;
    try {
      await db.collection('events').doc(eventId).update({ status: 'rejected' });
      return { success: true, message: 'Event rejected' };
    } catch (error) {
      return reply.code(500).send({ success: false, error: error.message });
    }
  });
};
