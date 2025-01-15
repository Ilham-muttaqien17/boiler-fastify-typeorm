import type { FastifyRequest, FastifyReply, HookHandlerDoneFunction } from 'fastify';
import sanitize from '@src/utils/sanitizer';

const target = ['body', 'params', 'headers', 'query'] as const;

const sanitizerMiddleware = (req: FastifyRequest, rep: FastifyReply, done: HookHandlerDoneFunction) => {
  target.forEach((key) => {
    req[key] && sanitize(req[key]);
  });
  done();
};

export default sanitizerMiddleware;
