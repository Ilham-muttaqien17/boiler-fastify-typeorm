import type { FastifyRequest } from 'fastify';

type OrderDirection = 'ASC' | 'DESC';

/**
 * Create pagination params
 * @param req - Axios Request
 * @returns Object of pagination params - page, limit, col, direction, offset
 */
export const buildPaginationParams = (req: FastifyRequest) => {
  const query = req.query as Record<string, any>;
  const limit = parseInt(query.limit as string, 10) || 10;
  const page = parseInt(query.page as string, 10) || 1;
  const offset = limit * (page - 1);
  const col = (query.col as string) || 'id';
  const direction = (query.direction as OrderDirection) || 'ASC';
  const search = query.search || '';

  return { limit, page, col, direction, offset, search };
};
