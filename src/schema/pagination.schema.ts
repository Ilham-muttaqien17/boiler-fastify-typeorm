import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import z from 'zod';

extendZodWithOpenApi(z);

export const paginationQuerySchema = z.object({
  limit: z.coerce.number().openapi({ example: 10 }).optional(),
  page: z.coerce.number().openapi({ example: 1 }).optional(),
  col: z.string().openapi({ example: 'created_at' }).optional(),
  direction: z.enum(['ASC', 'DESC']).openapi({ example: 'ASC' }).optional(),
  search: z.string().openapi({ example: '' }).optional()
});

export const paginationResultSchema = z.object({
  result: z.object({
    limit: z.coerce.number().openapi({ example: 10 }),
    page: z.coerce.number().openapi({ example: 1 }),
    total: z.coerce.number().openapi({ example: 0 }),
    rows: z.array(z.any()).openapi({ example: [] })
  })
});
