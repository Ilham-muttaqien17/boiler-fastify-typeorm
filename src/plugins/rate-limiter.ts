import type { FastifyInstance, HookHandlerDoneFunction } from 'fastify';
import fp from 'fastify-plugin';
import { redisClient } from '@src/utils/redis';
import { RateLimiterRedis } from 'rate-limiter-flexible';
import type { IRateLimiterRedisOptions } from 'rate-limiter-flexible';

const defaultOptions: IRateLimiterRedisOptions = {
  storeClient: redisClient,
  /* Max request before reset time */
  points: 60,
  /* Reset after time in seconds */
  duration: 60,
  /* Redist key prefix */
  keyPrefix: 'rate-limit'
};

function rateLimiter(
  app: FastifyInstance,
  opts: Omit<IRateLimiterRedisOptions, 'storeClient'>,
  done: HookHandlerDoneFunction
) {
  app.decorateReply('rateLimitPoint', 0);

  const options = Object.assign({}, defaultOptions, opts);

  app.addHook('onRequest', (req, rep, next) => {
    if (req.method === 'OPTIONS') {
      return next();
    }

    const rateLimitRedis = new RateLimiterRedis(options);
    rateLimitRedis
      .consume(req.ip as string)
      .then((res) => {
        rep.header('X-RateLimit-Retry-After', res.msBeforeNext / 1000);
        rep.header('X-RateLimit-Limit', rateLimitRedis.points);
        rep.header('X-RateLimit-Remaining', res.remainingPoints);
        rep.header('X-RateLimit-Reset', new Date(Date.now() + res.msBeforeNext));
        next();
      })
      .catch((err) => {
        rep.rateLimitPoint = rateLimitRedis.points;
        next(err);
      });
  });

  done();
}

export default fp(rateLimiter, { fastify: '5.x' });
