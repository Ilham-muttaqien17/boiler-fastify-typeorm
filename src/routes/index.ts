import type { FastifyInstance } from 'fastify';
import userRoutes from './user.route';

async function routes(app: FastifyInstance) {
  /* User Routes */
  app.register(userRoutes, { prefix: '/users' });
}

export default routes;
