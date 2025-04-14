import { VALID_VIDEO_MIME_TYPES } from '@src/constants';
import type { VideoMimeType } from '@src/types';
import { useMultipartFormData } from '@src/utils/form-data';
import { useLocalStorage } from '@src/utils/storage';
import { useValidator } from '@src/utils/validator';
import type { FastifyRequest } from 'fastify';
import { randomUUID } from 'node:crypto';
import dataSource from '@src/db/data-source';
import { Video } from '@src/db/entities/video.entity';
import { buildPaginationParams } from '@src/utils/pagination';
import { uploadVideoSchema } from '@src/schema/video.schema';
import type z from 'zod';

const videoRepository = dataSource.getRepository(Video);

type UploadFile = z.infer<typeof uploadVideoSchema>;

async function upload(req: FastifyRequest) {
  const formData = await useMultipartFormData(req);

  const parsedBody = useValidator<UploadFile>({
    data: formData,
    schema: uploadVideoSchema
  });

  const file = parsedBody?.file as File;
  const extension = VALID_VIDEO_MIME_TYPES[file?.type as VideoMimeType];
  const randomId = randomUUID();

  const video = videoRepository.create({
    title: parsedBody?.title,
    description: parsedBody?.description,
    mime_type: file?.type,
    unique_id: randomId
  });

  const savedVideo = await videoRepository.save(video);

  const localStorage = useLocalStorage('videos');

  await localStorage.writeFile({
    name: randomId,
    extension,
    file
  });

  return {
    title: savedVideo.title,
    description: savedVideo.description,
    path: localStorage.publicPathResolver({
      name: randomId,
      extension
    }),
    created_at: savedVideo.created_at,
    updated_at: savedVideo.updated_at
  };
}

async function getList(req: FastifyRequest) {
  const { page, limit, offset, col, direction, search } = buildPaginationParams(req);

  const [videos, count] = await videoRepository
    .createQueryBuilder('videos')
    .where('videos.title LIKE :title', { title: `%${search}%` })
    .orderBy(col, direction)
    .limit(limit)
    .offset(offset)
    .cache(3000)
    .getManyAndCount();

  const localStorage = useLocalStorage('videos');

  const data = {
    page,
    limit,
    total: count,
    rows: videos.map((v) => {
      const extension = VALID_VIDEO_MIME_TYPES[v?.mime_type as VideoMimeType];
      return {
        title: v.title,
        description: v.description,
        path: localStorage.publicPathResolver({
          name: v.unique_id,
          extension
        }),
        created_at: v.created_at,
        updated_at: v.updated_at
      };
    })
  };

  return data;
}

export default {
  upload,
  getList
};
