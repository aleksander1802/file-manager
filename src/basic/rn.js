import fs from 'fs';
import { resolve } from 'path';

export const rn = async (args) => {
  try {
    const pathToFile = resolve(args[0]);
    const newFilename = resolve(args[1]);

    await fs.promises.rename(pathToFile, newFilename);
    console.log(`File renamed from ${pathToFile} to ${newFilename}`);
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.error('Invalid input');
    } else if (error.code === 'ERR_INVALID_ARG_TYPE') {
      console.error('Invalid input');
    } else {
      console.error(`Operation failed`);
    }
  }
};
