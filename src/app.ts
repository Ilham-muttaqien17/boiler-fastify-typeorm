import type { FastifyError, FastifyReply, FastifyRequest } from 'fastify';
import Fastify from 'fastify';
import { loggerOptions } from './utils/logger';
import sanitizer from './middlewares/sanitizer';
import HttpResponse from './utils/response';
import { useDayjs } from './utils/dayjs';
import { useMultipartFormData } from './utils/form-data';
import routes from './routes';
import requestId from './plugins/request-id';
import rateLimiter from './plugins/rate-limiter';

const app = Fastify({
  logger: loggerOptions
});

/* Custom request id */
app.register(requestId);

/* Compress http response */
app.register(import('@fastify/compress'));

/* Secure Express by set HTTP response headers */
app.register(import('@fastify/helmet'));

/* Configure CORS */
app.register(import('@fastify/cors'), {
  origin: '*',
  optionsSuccessStatus: 200
});

/* Parse multipart/formdata */
app.register(import('@fastify/multipart'));

/* Parse x-www-form-urlencoded */
app.register(import('@fastify/formbody'));

/* Rate limiter for each request based on ip address */
app.register(rateLimiter);

/* Sanitize request data */
app.addHook('onRequest', sanitizer);

/* Api Routes */
app.register(routes, { prefix: '/api' });

/* Example of multipart/form-data */
app.post('/upload', async (req: FastifyRequest, rep: FastifyReply) => {
  const formData = await useMultipartFormData<{ name: string; files: File[] }>(req);

  HttpResponse.success(rep, {
    statusCode: 200,
    message: `Hello ${formData.name ?? 'Guest'}`
  });
});

app.setErrorHandler((err: FastifyError, req: FastifyRequest, rep: FastifyReply) => {
  const errData = {
    path: req.url,
    method: req.method,
    statusCode: err?.statusCode,
    ua: req.headers['user-agent'],
    ip: req.ip,
    requestTime: useDayjs(new Date()).format(),
    requestId: req.reqId,
    stack: err?.stack
  };
  app.log.error(errData, err.message);
  HttpResponse.error(rep, err);
});

export default app;
