import { type OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';

export const registerSecurityComponents = (registry: OpenAPIRegistry) => {
  /* Register components */
  registry.registerComponent('securitySchemes', 'bearerAuth', {
    type: 'http',
    scheme: 'bearer',
    bearerFormat: 'JWT'
  });
};
