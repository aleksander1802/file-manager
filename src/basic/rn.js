import { errorHandle } from '../helpers/errorHandler.js';
import fs from 'fs';
import { resolve } from 'path';

export const rn = async (args) => {
  try {
    const pathToFile = resolve(args[0]);
    const newFilename = resolve(args[1]);

    await fs.promises.rename(pathToFile, newFilename);
    console.log(`The file was renamed`);
  } catch (error) {
    errorHandle(error);
  }
};
