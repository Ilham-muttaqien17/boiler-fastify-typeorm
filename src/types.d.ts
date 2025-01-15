export type Nullable<T> = T | null;

export type AnyType = any;

export const VALID_MIMETYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'text/csv'
] as const;

export type MIME_TYPE = (typeof VALID_MIMETYPES)[number];
