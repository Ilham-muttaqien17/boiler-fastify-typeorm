import type { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import { uploadVideoSchema } from '@src/schema/video.schema';
import { openAPIDefaultResponse } from '../default_response';
import { omit, pick } from '@src/utils/helper';
import { paginationQuerySchema, paginationResultSchema } from '@src/schema/pagination.schema';

export const registerVideoPaths = (registry: OpenAPIRegistry) => {
  registry.register('Upload Video', uploadVideoSchema);

  registry.registerPath({
    summary: 'Get list of videos',
    method: 'get',
    path: '/api/videos',
    tags: ['Video'],
    security: [{ bearerAuth: [] }],
    request: {
      query: paginationQuerySchema
    },
    responses: {
      200: {
        description: 'List of Videos',
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
    summary: 'Upload Video',
    method: 'post',
    path: '/api/videos',
    tags: ['Video'],
    security: [{ bearerAuth: [] }],
    request: {
      body: {
        content: {
          'multipart/form-data': {
            schema: uploadVideoSchema
          }
        }
      }
    },
    responses: {
      201: {
        description: 'Upload Video Success Response',
        content: {
          'application/json': {
            example: {
              result: {
                title: 'string',
                description: 'string',
                path: 'string',
                created_at: '2025-05-24T03:25:23.284Z',
                updated_at: '2025-05-24T03:25:23.284Z'
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
    summary: 'Stream video',
    method: 'get',
    path: '/api/videos/stream/{id}',
    tags: ['Video'],
    security: [{ bearerAuth: [] }],
    parameters: [
      {
        name: 'id',
        in: 'path',
        required: true,
        schema: {
          type: 'string'
        },
        description: 'Unique video identifier'
      },
      {
        name: 'Range',
        in: 'header',
        required: true,
        schema: { type: 'string', example: 'bytes=0-' },
        description: 'HTTP Range header to stream partial video content'
      }
    ],
    responses: {
      206: {
        description: 'Partial content (video stream)',
        content: {
          'video/mp4': {
            schema: {
              type: 'string',
              format: 'binary'
            }
          },
          'video/x-msvideo': {
            schema: {
              type: 'string',
              format: 'binary'
            }
          },
          'video/x-matroska': {
            schema: {
              type: 'string',
              format: 'binary'
            }
          },
          'video/webm': {
            schema: {
              type: 'string',
              format: 'binary'
            }
          }
        }
      },
      416: {
        description: 'Requested Range Not Satisfiable',
        content: {
          'application/json': {
            example: {
              message: 'Requested Range Not Satisfiable'
            },
            schema: {}
          }
        }
      },
      400: {
        description: 'Bad request - Invalid range header format',
        content: {
          'application/json': {
            example: {
              message: 'Invalid range header format'
            },
            schema: {}
          }
        }
      },
      ...pick(openAPIDefaultResponse, ['500'])
    }
  });
};
