import fs from 'fs';
import { resolve } from 'path';

export const rn = async (args) => {
  const pathToFile = resolve(args[0]);
  const newFilename = resolve(args[1]);

  try {
    await fs.promises.rename(pathToFile, newFilename);
    console.log(`File renamed from ${pathToFile} to ${newFilename}`);
  } catch (error) {
    if (err.code === 'ERR_INVALID_ARG_TYPE') {
      console.error(`Invalid input`);
    } else {
      console.error(`Operation failed`);
    }
  }
};
