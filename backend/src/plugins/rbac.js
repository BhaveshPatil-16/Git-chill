const fp = require('fastify-plugin');
const userRepository = require('../services/userRepository');

module.exports = fp(async function rbacPlugin(fastify) {
  fastify.decorate('requireVerifiedIdentity', async function requireVerifiedIdentity(request, reply) {
    const uid = request.user?.userId;
    if (!uid) {
      return reply.code(401).send({ error: 'Unauthorized' });
    }

    const user = await userRepository.getById(uid);
    const verified = user?.verification_status === 'verified' && user?.trust_signal?.is_verified === true;

    if (!verified) {
      return reply.code(403).send({
        error: 'Identity verification required',
        verification_status: user?.verification_status || 'pending'
      });
    }
  });
});
