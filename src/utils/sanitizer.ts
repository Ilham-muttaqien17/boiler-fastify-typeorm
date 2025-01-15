import { FilterXSS } from 'xss';

const saniziter = new FilterXSS();

/**
 * Data sanitizer form XSS Injection
 * @param data - Any type of data
 * @returns Sanitized data from xss injection
 */
const sanitize = (data: any): any => {
  if (typeof data === 'string') {
    return saniziter.process(data);
  }

  if (Array.isArray(data)) {
    return data.map((item) => {
      if (typeof item === 'string') {
        return saniziter.process(item);
      }
      if (Array.isArray(item) || typeof item === 'object') {
        return sanitize(item);
      }
      return item;
    });
  }

  if (typeof data === 'object') {
    Object.keys(data).forEach((key) => {
      const item = data[key];
      if (typeof item === 'string') {
        data[key] = sanitize(item);
      } else if (Array.isArray(item) || typeof item === 'object') {
        data[key] = item ? sanitize(item) : item;
      }
    });
  }

  return data;
};

export default sanitize;
