import { openApiDoc } from '@docs/open-api';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';
import type { FastifyInstance, HookHandlerDoneFunction } from 'fastify';
import fp from 'fastify-plugin';

function openAPI(app: FastifyInstance, _: any, done: HookHandlerDoneFunction) {
  app.register(swagger, {
    mode: 'static',
    specification: {
      document: openApiDoc
    }
  });

  app.register(swaggerUi, {
    routePrefix: '/api-docs'
  });

  done();
}

export default fp(openAPI, { fastify: '5.x' });
