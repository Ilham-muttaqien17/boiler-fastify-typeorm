import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { MAX_FILE_SIZE, VALID_VIDEO_MIME_TYPES } from '@src/constants';
import { isMultipartFile } from '@src/utils/form-data';
import z from 'zod';

extendZodWithOpenApi(z);

const uploadVideoSchema = z.object({
  title: z
    .string({
      required_error: 'Title is required'
    })
    .trim()
    .min(1, 'Title is required'),
  description: z
    .string({
      required_error: 'Description is required'
    })
    .trim()
    .min(1, 'Description is required'),
  file: z
    .any()
    .superRefine((val, ctx): val is File => {
      if (!isMultipartFile(val)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'File is not valid',
          fatal: true
        });

        return z.NEVER;
      }

      if (val.size > MAX_FILE_SIZE) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'File is too large',
          fatal: true
        });

        return z.NEVER;
      }

      if (!Object.keys(VALID_VIDEO_MIME_TYPES).includes(val.type)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'File is not supported',
          fatal: true
        });

        return z.NEVER;
      }

      return true;
    })
    .openapi({ type: 'string', format: 'binary' })
});

export { uploadVideoSchema };
