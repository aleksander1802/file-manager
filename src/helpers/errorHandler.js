export const errorHandle = (error) => {
  if (error.code === 'ERR_INVALID_ARG_TYPE') {
    console.error(`Invalid input`);
  } else {
    console.error(`Operation failed`);
  }
};
