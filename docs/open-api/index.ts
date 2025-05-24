import { OpenApiGeneratorV3, OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import { registerSecurityComponents } from './components/security';
import { type OpenAPIV3 } from 'openapi-types';
import { registerVideoPaths } from './paths/video.path';
import { registerUserPaths } from './paths/user.path';

const registry = new OpenAPIRegistry();

/* Register components */
registerSecurityComponents(registry);

/* Register Paths */
registerUserPaths(registry);
registerVideoPaths(registry);

const generator = new OpenApiGeneratorV3(registry.definitions);

export const openApiDoc = generator.generateDocument({
  info: {
    title: 'API Docs for Boilerplate Fastify Typeorm',
    version: '1.0.0'
  },
  openapi: '3.0.0',
  servers: [
    {
      description: 'Local Development',
      url: 'http://localhost:3300'
    }
  ]
}) as OpenAPIV3.Document<{}>;
