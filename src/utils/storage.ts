import fs from 'node:fs';

type WriteOptions = {
  file: File;
  name: string;
  extension: string;
};

type ReadOptions = {
  name: string;
  extension: string;
};

/**
 * File operation
 * @param dir - Public directory
 */
export const useLocalStorage = (dir: string) => {
  return {
    writeFile: async (opts: WriteOptions) => {
      const arrBuffer = await opts.file.arrayBuffer();
      const buffer = Buffer.from(arrBuffer);

      const basePath = `./uploads/${dir}/`;
      if (!fs.existsSync(basePath)) {
        fs.mkdirSync(basePath);
      }

      const fullPath = basePath.concat(opts.name, '.', opts.extension);

      const ws = fs.createWriteStream(fullPath);
      ws.write(buffer);
      ws.end();
    },
    publicPathResolver: (opts: ReadOptions) => {
      return '/public/'.concat(dir, '/', opts.name.concat('.', opts.extension));
    }
  };
};
