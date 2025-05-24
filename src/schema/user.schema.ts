import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { PASSWORD_REGEX } from '@src/constants';
import z from 'zod';

extendZodWithOpenApi(z);

const storeUserSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, 'Email is required')
    .email('Email is not valid')
    .openapi({ example: 'string@example.com' }),
  password: z
    .string()
    .trim()
    .min(8)
    .refine((val) => PASSWORD_REGEX.test(val), 'Password at least contain lower char, upper char & number')
    .openapi({ example: '@String123' })
});

const updatePartialUserSchema = z.object({
  password: z
    .string()
    .trim()
    .min(8)
    .refine((val) => PASSWORD_REGEX.test(val), 'Password at least contain lower char, upper char & number')
    .optional()
    .openapi({ example: '@String123' })
});

const deleteBatchUserSchema = z.object({
  user_ids: z.array(z.string().uuid()).min(1)
});

export { storeUserSchema, updatePartialUserSchema, deleteBatchUserSchema };
