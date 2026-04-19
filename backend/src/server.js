const fastify = require('fastify')({ logger: true, bodyLimit: 10485760 });
const cors = require('@fastify/cors');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

// Register plugins
fastify.register(cors, { 
  origin: '*', // For demo purposes. Restrict in production.
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
});

// Register routes
fastify.register(require('./routes/auth'), { prefix: '/api/auth' });
fastify.register(require('./plugins/auth'));
fastify.register(require('./plugins/rbac'));
fastify.register(require('./routes/verification'), { prefix: '/api/verification' });
fastify.register(require('./routes/new_auth'), { prefix: '/api/v2/auth' });
fastify.register(require('./routes/admin'), { prefix: '/api/v2/admin' });
fastify.register(require('./routes/events'), { prefix: '/api/v2/events' });


// Health check route
fastify.get('/', async (request, reply) => {
  return { status: 'Verification backend is running' };
});

const start = async () => {
  try {
    const port = process.env.PORT || 3001;
    await fastify.listen({ port, host: '0.0.0.0' });
    fastify.log.info(`Server listening on port ${port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
