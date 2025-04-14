import videoService from '@src/services/video.service';
import HttpResponse from '@src/utils/response';
import type { FastifyReply, FastifyRequest } from 'fastify';

async function uploadVideo(req: FastifyRequest, rep: FastifyReply) {
  const result = await videoService.upload(req);
  HttpResponse.success(rep, {
    statusCode: 200,
    result
  });
}

async function getVideoList(req: FastifyRequest, rep: FastifyReply) {
  const result = await videoService.getList(req);
  HttpResponse.success(rep, {
    statusCode: 200,
    result
  });
}

export default {
  uploadVideo,
  getVideoList
};
