import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { MAX_FILE_SIZE, VALID_VIDEO_MIME_TYPES } from '@src/constants';
import z from 'zod';

extendZodWithOpenApi(z);

const uploadVideoSchema = z.object({
  title: z
    .string({
      error: 'Title is required'
    })
    .trim()
    .min(1, 'Title is required'),
  description: z
    .string({
      error: 'Description is required'
    })
    .trim()
    .min(1, 'Description is required'),
  file: z
    .file({ error: 'File is not valid' })
    .max(MAX_FILE_SIZE, { error: 'File is too large' })
    .mime(Object.keys(VALID_VIDEO_MIME_TYPES), { error: 'File is not supported' })
    .openapi({ type: 'string', format: 'binary' })
});

export { uploadVideoSchema };
