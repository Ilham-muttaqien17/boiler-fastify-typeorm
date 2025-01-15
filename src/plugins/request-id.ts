import type { FastifyInstance, HookHandlerDoneFunction } from 'fastify';
import fp from 'fastify-plugin';
import { randomUUID } from 'node:crypto';

interface Options {
  headerName?: string;
}

const defaultOptions = {
  headerName: 'x-request-id'
};

function customRequestId(app: FastifyInstance, opts: Options, done: HookHandlerDoneFunction) {
  app.decorateRequest('reqId', '');

  const options = Object.assign({}, defaultOptions, opts);

  app.addHook('onRequest', (req, _rep, next) => {
    req.reqId = (req.headers[options.headerName] as string) || randomUUID();
    next();
  });

  app.addHook('onSend', (req, rep, _payload, next) => {
    rep.header(options.headerName, req.reqId);
    next();
  });

  done();
}

export default fp(customRequestId, { fastify: '5.x' });
