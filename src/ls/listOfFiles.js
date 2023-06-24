import fs from 'fs/promises';

export const ls = async (currentDir) => {
  try {
    let files = [];

    const items = await fs.readdir(currentDir, { withFileTypes: true });
    items.forEach((item) => {
      if (item.isFile()) {
        files.push({ Name: item.name, Type: 'file' });
      } else {
        files.push({ Name: item.name, Type: 'directory' });
      }
    });

    const sortedList = files.sort((a, b) => {
      if (a.Type === b.Type) {
        return a.Name.localeCompare(b.Name);
      } else if (a.Type === 'directory') {
        return -1;
      } else {
        return 1;
      }
    });

    return sortedList;
  } catch (error) {
    base.printError(error);
  }
};
