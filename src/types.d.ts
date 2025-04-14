import type { VALID_MIMETYPES, VALID_VIDEO_MIME_TYPES } from './constants';

export type Nullable<T> = T | null;

export type AnyType = any;

export type VideoMimeType = keyof typeof VALID_VIDEO_MIME_TYPES;

export type MIME_TYPE = (typeof VALID_MIMETYPES)[number];
