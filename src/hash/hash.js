import fs from 'fs/promises';
import { resolve } from 'path';
import { createHash } from 'crypto';

export const hashCalculate = async (path) => {
  try {
    const pathToFile = resolve(path);

    const message = await fs.readFile(pathToFile, 'utf8');

    const hash = createHash('sha256').update(message).digest('hex');

    console.log(hash);
  } catch (error) {
    if (error.code === 'ERR_INVALID_ARG_TYPE') {
      console.error(`Invalid input`);
    } else {
      console.error(`Operation failed`);
    }
  }
};
