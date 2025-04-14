import { PASSWORD_REGEX } from '@src/constants';
import z from 'zod';

const storeUserValidation = z.object({
  email: z.string().trim().min(1, 'Email is required').email('Email is not valid'),
  password: z
    .string()
    .trim()
    .min(8)
    .refine((val) => PASSWORD_REGEX.test(val), 'Password at least contain lower char, upper char & number')
});

export { storeUserValidation };
