import dataSource from '@src/db/data-source';
import { User } from '@src/db/entities/user.entity';
import ResponseError from '@src/error';
import { storeUserValidation } from '@src/schema/user.schema';
import { omit } from '@src/utils/helper';
import { buildPaginationParams } from '@src/utils/pagination';
import { useValidator } from '@src/utils/validator';
import type { FastifyRequest } from 'fastify';
import z from 'zod';

const userRepository = dataSource.getRepository(User);

type StoreUser = z.infer<typeof storeUserValidation>;

async function create(req: FastifyRequest) {
  const { email, password } = req.body as { email: string; password: string };

  const parsedBody = useValidator<StoreUser>({
    data: { email, password },
    schema: storeUserValidation
  });

  const existingUser = await userRepository.findOne({
    where: {
      email: parsedBody?.email
    }
  });

  if (existingUser) throw new ResponseError(400, 'Email already registered');

  const user = userRepository.create({
    email: parsedBody?.email,
    password: parsedBody?.password
  });

  const savedUser = await userRepository.save(user);

  return omit<User>(savedUser, ['password']);
}

async function getUser(id: string) {
  const user = await userRepository.findOne({
    where: {
      id: id
    }
  });

  if (!user) throw new ResponseError(404, 'User is not found');

  return user;
}

async function getList(req: FastifyRequest) {
  const { page, limit, offset, col, direction, search } = buildPaginationParams(req);

  const [users, count] = await userRepository
    .createQueryBuilder('users')
    .where('users.email LIKE :email', { email: `%${search}%` })
    .orderBy(col, direction)
    .limit(limit)
    .offset(offset)
    .cache(3000)
    .getManyAndCount();

  const data = {
    page,
    limit,
    total: count,
    rows: users.map((v) => ({
      id: v.id,
      email: v.email,
      created_at: v.created_at,
      updated_at: v.updated_at
    }))
  };

  return data;
}

async function getDetail(req: FastifyRequest) {
  const user = await getUser((req.params as Record<string, any>).id);

  return omit<User>(user, ['password']);
}

async function update(req: FastifyRequest) {
  const parsedBody = useValidator<StoreUser>({
    data: req.body,
    schema: storeUserValidation
  });

  const user = await getUser((req.params as Record<string, any>).id);

  const queryRunner = dataSource.createQueryRunner();
  await queryRunner.connect();
  await queryRunner.startTransaction();

  try {
    user.email = parsedBody?.email as string;
    user.password = parsedBody?.password as string;
    await queryRunner.manager.save(user);

    await queryRunner.commitTransaction();
  } catch (err: any) {
    await queryRunner.rollbackTransaction();
    throw new ResponseError(400, err.message);
  } finally {
    await queryRunner.release();
  }
}

async function destroy(req: FastifyRequest) {
  const { user_ids } = req.body as { user_ids: string[] };
  const validateIds = z.array(z.string().uuid()).min(1).safeParse(user_ids);
  if (!validateIds.success) throw new ResponseError(400, 'User ID is not valid');

  await userRepository
    .createQueryBuilder('users')
    .softDelete()
    .where('users.id IN (:...ids)', {
      ids: validateIds.data
    })
    .execute();
}

export default {
  getList,
  getDetail,
  create,
  update,
  destroy
};
