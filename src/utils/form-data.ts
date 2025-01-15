import type { MultipartFile } from '@fastify/multipart';
import { pipeline } from 'node:stream/promises';
import fs from 'node:fs';
import type { FastifyRequest } from 'fastify';
import { File } from 'node:buffer';
import ResponseError from '@src/error';
import { toArray } from './helper';

/**
 * Parse multipart/form-data
 * @param req - FastifyRequest
 * @returns Promise of T Object
 */
export async function useMultipartFormData<T = any>(req: FastifyRequest): Promise<T> {
  if (!req.isMultipart()) {
    throw new ResponseError(400, 'Invalid form data request');
  }

  const formData: Record<string, any> = {};
  for await (const part of req.parts()) {
    /* Handle if value is File */
    if ((part as MultipartFile).file) {
      const fieldPart = part as MultipartFile;

      /* Create static folder */
      if (!fs.existsSync('uploads/')) {
        fs.mkdirSync('uploads/');
      }

      const tempFilePath = `./uploads/${Date.now() + '_' + fieldPart.filename}`;
      await pipeline(fieldPart.file, fs.createWriteStream(tempFilePath));

      const fileBuffer = await fs.promises.readFile(tempFilePath);

      const fileObject = new File([fileBuffer], fieldPart.filename, { type: fieldPart.mimetype });

      /* Handle if value is array */
      if (formData[fieldPart.fieldname]) {
        formData[fieldPart.fieldname] = [...toArray(formData[fieldPart.fieldname], true), fileObject];
      } else {
        formData[part.fieldname] = fileObject;
      }
    } else {
      const fieldPart = part as { fieldname: string; value: any };

      /* Handle if value is array */
      if (formData[fieldPart.fieldname]) {
        formData[fieldPart.fieldname] = [...toArray(formData[fieldPart.fieldname], true), fieldPart.value];
      } else {
        formData[fieldPart.fieldname] = fieldPart.value;
      }
    }
  }

  return formData as T;
}
