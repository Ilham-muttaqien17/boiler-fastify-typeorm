import { z, ZodError } from 'zod';
import type { ZodSchema, ZodIssue } from 'zod';
import ResponseError from '@src/error';
import { ucFirst } from '@src/utils/helper';

type AnyType = any;

interface Validator {
  schema: ZodSchema;
  data: any;
}

/**
 * Parse error to be object
 * @param err ZodIssues[]
 * @returns Record<string, any>
 */
const getErrors = (err: ZodIssue[]) => {
  const error: Record<string, string[]> = {};
  err.forEach((e) => {
    const tmpKey = e.path.map((v) => v.toString()).join('.');
    if (error[tmpKey]) {
      error[tmpKey].push(e.message);
    } else {
      error[tmpKey] = [e.message];
    }
  });
  return error;
};

/**
 * Parse error to be string
 * @param err ZodIssue[]
 * @returns string
 */
const createErrorMessage = (err: ZodIssue[]): string => {
  const errorLength = err.length;
  const restOfError = err.length - 1;
  if (err[0].code === z.ZodIssueCode.invalid_type && err[0].received === 'undefined') {
    return err[0].path
      .map((v) => ucFirst(String(v).replace(/_/, ' ')))
      .join('.')
      .concat(' is required')
      .concat(errorLength > 1 ? ` & ${restOfError} other ${restOfError > 1 ? 'errors' : 'error'}` : '');
  }
  const message = err[0].path
    .map((v) => ucFirst(String(v).replace(/_/, ' ')))
    .join('.')
    .concat(' ' + err[0].message.toLowerCase())
    .concat(errorLength > 1 ? ` & ${restOfError} other ${restOfError > 1 ? 'errors' : 'error'}` : '');
  return message;
};

/**
 * Form input validator
 * @param options Validator<T>
 * @returns result
 */
export const useValidator = <T extends AnyType = AnyType>({ schema, data }: Validator) => {
  try {
    const result = schema.parse(data);
    return result as T;
  } catch (err: any) {
    if (err instanceof ZodError) {
      throw new ResponseError(422, createErrorMessage(err.issues), getErrors(err.issues));
    }
  }
};
