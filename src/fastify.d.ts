declare module 'fastify' {
  interface FastifyRequest {
    reqId?: string;
  }

  interface FastifyReply {
    rateLimitPoint?: number;
  }
}

export {};
