import type { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import { paginationQuerySchema, paginationResultSchema } from '@src/schema/pagination.schema';
import { deleteBatchUserSchema, storeUserSchema, updatePartialUserSchema } from '@src/schema/user.schema';
import { openAPIDefaultResponse } from '../default_response';
import { omit } from '@src/utils/helper';

export const registerUserPaths = (registry: OpenAPIRegistry) => {
  registry.register('Store User', storeUserSchema);
  registry.register('Update Partial User', updatePartialUserSchema);
  registry.register('Delete Batch User', deleteBatchUserSchema);

  registry.registerPath({
    summary: 'Get list of users',
    method: 'get',
    path: '/api/users',
    tags: ['User'],
    security: [{ bearerAuth: [] }],
    request: {
      query: paginationQuerySchema
    },
    responses: {
      200: {
        description: 'List of Users',
        content: {
          'application/json': {
            schema: paginationResultSchema
          }
        }
      },
      ...omit(openAPIDefaultResponse, ['400', '401', '404', '422'])
    }
  });

  registry.registerPath({
    summary: 'Create new user',
    method: 'post',
    path: '/api/users',
    tags: ['User'],
    security: [{ bearerAuth: [] }],
    request: {
      body: {
        content: {
          'application/json': {
            schema: storeUserSchema
          }
        }
      }
    },
    responses: {
      201: {
        description: 'Created User',
        content: {
          'application/json': {
            example: {
              message: 'User created successfully',
              result: {
                id: 'cc3545ae-5e11-46a9-a48e-705bac92a471',
                email: 'string@example.com',
                created_at: '2025-05-24T03:57:28.823Z',
                updated_at: '2025-05-24T03:57:28.823Z',
                deleted_at: null
              }
            },
            schema: {}
          }
        }
      },
      ...omit(openAPIDefaultResponse, ['401', '404'])
    }
  });

  registry.registerPath({
    summary: 'Get detail user',
    method: 'get',
    path: '/api/users/{id}',
    tags: ['User'],
    security: [{ bearerAuth: [] }],
    parameters: [
      {
        name: 'id',
        in: 'path',
        required: true,
        schema: {
          type: 'string'
        },
        description: 'Unique user identifier'
      }
    ],
    responses: {
      200: {
        description: 'Detail user',
        content: {
          'application/json': {
            example: {
              result: {
                id: 'cc3545ae-5e11-46a9-a48e-705bac92a471',
                email: 'string@example.com',
                created_at: '2025-05-24T03:57:28.823Z',
                updated_at: '2025-05-24T03:57:28.823Z',
                deleted_at: null
              }
            },
            schema: {}
          }
        }
      },
      ...omit(openAPIDefaultResponse, ['400', '401', '422'])
    }
  });

  registry.registerPath({
    summary: 'Update partial user data',
    method: 'patch',
    path: '/api/users/{id}',
    tags: ['User'],
    security: [{ bearerAuth: [] }],
    parameters: [
      {
        name: 'id',
        in: 'path',
        required: true,
        schema: {
          type: 'string'
        },
        description: 'Unique user identifier'
      }
    ],
    request: {
      body: {
        content: {
          'application/json': {
            schema: updatePartialUserSchema
          }
        }
      }
    },
    responses: {
      200: {
        description: 'Update user',
        content: {
          'application/json': {
            example: {
              message: 'User updated successfully'
            },
            schema: {}
          }
        }
      },
      ...omit(openAPIDefaultResponse, ['400', '401'])
    }
  });

  registry.registerPath({
    summary: 'Delete batch user',
    method: 'delete',
    path: '/api/users',
    tags: ['User'],
    security: [{ bearerAuth: [] }],
    request: {
      body: {
        content: {
          'application/json': {
            schema: deleteBatchUserSchema
          }
        }
      }
    },
    responses: {
      200: {
        description: 'Delete user success',
        content: {
          'application/json': {
            example: {
              message: 'User deleted succesfully'
            },
            schema: {}
          }
        }
      },
      ...omit(openAPIDefaultResponse, ['401', '404', '422'])
    }
  });
};
