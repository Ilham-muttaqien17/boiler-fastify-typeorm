import type { Nullable } from '@src/types';

interface FormError {
  [k: string]: string[];
}

class ResponseError extends Error {
  public statusCode: number = 500;
  public errors?: Nullable<FormError>;

  constructor(statusCode: number, message: string, errors?: FormError) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
  }
}

export default ResponseError;
