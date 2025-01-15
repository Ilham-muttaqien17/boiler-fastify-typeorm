import { type FastifyInstance } from 'fastify';
import userController from '@src/controllers/user.controller';

async function userRoutes(app: FastifyInstance) {
  app.get('/', userController.getUserList);
  app.post('/', userController.createUser);
  app.get('/:id', userController.getUserDetail);
  app.patch('/:id', userController.updateUser);
  app.delete('/', userController.deleteUser);
}

export default userRoutes;
