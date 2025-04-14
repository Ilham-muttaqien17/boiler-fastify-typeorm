const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,6})+$/;

const PASSWORD_REGEX = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])');

export const VALID_MIMETYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'text/csv'
] as const;

const VALID_VIDEO_MIME_TYPES = Object.freeze({
  'video/mp4': 'mp4',
  'video/x-msvideo': 'avi',
  'video/x-matroska': 'mkv',
  'video/webm': 'webm'
});

const MAX_FILE_SIZE = 10 * 1024 * 1024;

export { EMAIL_REGEX, PASSWORD_REGEX, VALID_VIDEO_MIME_TYPES, MAX_FILE_SIZE };
