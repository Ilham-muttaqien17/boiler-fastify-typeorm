import userService from '@src/services/user.service';
import HttpResponse from '@src/utils/response';
import type { FastifyReply, FastifyRequest } from 'fastify';

async function getUserList(req: FastifyRequest, rep: FastifyReply) {
  const result = await userService.getList(req);
  HttpResponse.success(rep, {
    statusCode: 200,
    result
  });
}

async function getUserDetail(req: FastifyRequest, rep: FastifyReply) {
  const result = await userService.getDetail(req);
  HttpResponse.success(rep, {
    statusCode: 200,
    result
  });
}

async function createUser(req: FastifyRequest, rep: FastifyReply) {
  const result = await userService.create(req);
  HttpResponse.success(rep, {
    statusCode: 201,
    message: 'User created successfully',
    result
  });
}

async function updateUser(req: FastifyRequest, rep: FastifyReply) {
  await userService.update(req);
  HttpResponse.success(rep, {
    statusCode: 200,
    message: 'User updated successfully'
  });
}

async function deleteUser(req: FastifyRequest, rep: FastifyReply) {
  await userService.destroy(req);
  HttpResponse.success(rep, {
    statusCode: 200,
    message: 'User deleted succesfully'
  });
}

export default {
  getUserList,
  getUserDetail,
  createUser,
  updateUser,
  deleteUser
};
