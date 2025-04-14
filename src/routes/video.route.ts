import { type FastifyInstance } from 'fastify';
import videoController from '@src/controllers/video.controller';

async function videoRoutes(app: FastifyInstance) {
  app.post('/', videoController.uploadVideo);
  app.get('/', videoController.getVideoList);
}

export default videoRoutes;
