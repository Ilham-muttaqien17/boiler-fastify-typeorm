import { VALID_VIDEO_MIME_TYPES } from '@src/constants';
import type { VideoMimeType } from '@src/types';
import { useMultipartFormData } from '@src/utils/form-data';
import { useLocalStorage } from '@src/utils/storage';
import { useValidator } from '@src/utils/validator';
import type { FastifyReply, FastifyRequest } from 'fastify';
import { randomUUID } from 'node:crypto';
import dataSource from '@src/db/data-source';
import { Video } from '@src/db/entities/video.entity';
import { buildPaginationParams } from '@src/utils/pagination';
import { uploadVideoSchema } from '@src/schema/video.schema';
import type z from 'zod';
import ResponseError from '@src/error';
import fs from 'node:fs';
import { useRedisClient } from '@src/utils/redis';
import { useDayjs } from '@src/utils/dayjs';

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

async function stream(req: FastifyRequest, rep: FastifyReply) {
  const uniqId = (req.params as Record<string, any>).id;

  const cacheKey = 'video-stream-'.concat(uniqId);
  const cacheDuration = 60 * 60 * 24; // 1 Day
  let video: Video;

  // Check video cache
  let videoCache = await useRedisClient.getData(cacheKey);
  if (!videoCache) {
    const result = await videoRepository.findOne({
      where: {
        unique_id: uniqId
      }
    });

    if (!result) {
      throw new ResponseError(404, 'Video not found');
    }

    video = result;

    await useRedisClient.setData(cacheKey, JSON.stringify(result), cacheDuration);
  } else {
    video = JSON.parse(videoCache) as Video;
  }

  const range = req.headers.range;

  if (!range) {
    throw new ResponseError(400, 'Invalid range header');
  }

  const extension = VALID_VIDEO_MIME_TYPES[video?.mime_type as VideoMimeType];
  const path = './uploads/videos/'.concat(video?.unique_id, '.', extension);

  // Check is file exists in disk storage
  try {
    await fs.promises.access(path);
  } catch {
    throw new ResponseError(404, 'Video file not found on disk');
  }

  const fileSize = (await fs.promises.stat(path)).size;
  const CHUNK_SIZE = 10 ** 6; // 1 MB
  const match = range.match(/bytes=(\d+)-(\d*)/);
  if (!match) {
    throw new ResponseError(400, 'Invalid range header format');
  }

  const start = parseInt(match[1], 10);
  const end = match[2] ? parseInt(match[2], 10) : Math.min(start + CHUNK_SIZE, fileSize - 1);
  const contentLength = end - start + 1;

  if (start >= fileSize || start > end) {
    throw new ResponseError(416, 'Requested Range Not Satisfiable');
  }

  rep.raw.writeHead(206, {
    'Content-Range': `bytes ${start}-${end}/${fileSize}`,
    'Accept-Ranges': 'bytes',
    'Content-Length': contentLength,
    'Content-Type': video?.mime_type,
    'Last-Modified': useDayjs.utc().toISOString(),
    'Cache-Control': `public, max-age=${cacheDuration}`
  });

  const stream = fs.createReadStream(path, { start, end });

  rep.hijack();
  stream.pipe(rep.raw);
}

export default {
  upload,
  getList,
  stream
};
