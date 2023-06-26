import { errorHandle } from '../helpers/errorHandler.js';
import fs from 'fs/promises';

export const rm = async (args) => {
  try {
    await fs.unlink(args);
    console.log(`The file has been deleted`);
  } catch (error) {
    errorHandle();
  }
};
