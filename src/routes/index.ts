import type { FastifyInstance } from 'fastify';
import userRoutes from './user.route';
import videoRoutes from './video.route';

async function routes(app: FastifyInstance) {
  /* User Routes */
  app.register(userRoutes, { prefix: '/users' });
  /* Video Routes */
  app.register(videoRoutes, { prefix: '/videos' });
}

export default routes;
