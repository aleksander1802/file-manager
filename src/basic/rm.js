import fs from 'fs/promises';

export const rm = async (args) => {
  try {
    await fs.unlink(args);
    process.stdout.write(`The file has been deleted \n`);
  } catch (error) {
    if (error.code === 'ERR_INVALID_ARG_TYPE') {
      console.error(`Invalid input`);
    } else {
      console.error(`Operation failed`);
    }
  }
};
