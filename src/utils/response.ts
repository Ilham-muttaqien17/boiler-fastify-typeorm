import type { AnyType } from '@src/types';
import type { FastifyReply } from 'fastify';
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
import ResponseError from '@src/error';
import { QueryFailedError, TypeORMError } from 'typeorm';
import { RateLimiterRes } from 'rate-limiter-flexible';

interface SuccessResponse<T extends AnyType = AnyType> {
  statusCode: number;
  result?: T;
  message?: string;
}

const HttpResponse = {
  success: (rep: FastifyReply, { statusCode, message, result }: SuccessResponse) => {
    return rep.status(statusCode).send({
      message,
      result
    });
  },
  error: (rep: FastifyReply, err: any) => {
    if (err instanceof TokenExpiredError || err instanceof JsonWebTokenError) {
      return rep.status(401).send({
        message: 'Token is not valid, please sign in again'
      });
    }

    if (err instanceof ResponseError) {
      return rep.status(err.statusCode).send({
        message: err.message,
        errors: err.errors
      });
    }

    if (err instanceof QueryFailedError || err instanceof TypeORMError) {
      return rep.status(400).send({
        message: err.message
      });
    }

    if (err instanceof RateLimiterRes) {
      rep.header('X-RateLimit-Retry-After', err.msBeforeNext / 1000);
      rep.header('X-RateLimit-Limit', rep.rateLimitPoint);
      rep.header('X-RateLimit-Remaining', err.remainingPoints);
      rep.header('X-RateLimit-Reset', new Date(Date.now() + err.msBeforeNext));

      return rep.status(429).send({
        message: 'Too many request, please try again later.'
      });
    }

    if (err instanceof TypeError) {
      return rep.status(500).send({
        message: err.message
      });
    }

    return rep.status(500).send({
      message: err?.message ?? 'Internal server error, please contact developer!'
    });
  }
};

export default HttpResponse;
