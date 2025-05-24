import type { ResponseConfig } from '@asteasolutions/zod-to-openapi';

type APIDefaultResponse = {
  [statusCode: string]: ResponseConfig;
};

export const openAPIDefaultResponse: APIDefaultResponse = {
  400: {
    description: 'Bad Request',
    content: {
      'application/json': {
        example: {
          message: 'Bad Request'
        },
        schema: {}
      }
    }
  },
  401: {
    description: 'Unathorized User',
    content: {
      'application/json': {
        example: {
          message: 'Unauthorized'
        },
        schema: {}
      }
    }
  },
  404: {
    description: 'Resource Not Found',
    content: {
      'application/json': {
        example: {
          message: 'Resource not found'
        },
        schema: {}
      }
    }
  },
  422: {
    description: 'Unprocessable Entity',
    content: {
      'application/json': {
        example: {
          message: 'Required',
          errors: {}
        },
        schema: {}
      }
    }
  },
  429: {
    description: 'Too Many Request',
    content: {
      'application/json': {
        example: {
          message: 'Too many request, please try again later.'
        },
        schema: {}
      }
    }
  },
  500: {
    description: 'Internal Server Error',
    content: {
      'application/json': {
        example: {
          message: 'Internal server error, please contact developer!'
        },
        schema: {}
      }
    }
  }
};
