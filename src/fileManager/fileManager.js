import { cd as changeDirectory } from '../cd/changeDirectory.js';
import { up as upDirectory } from '../up/up.js';
import { ls as listOfFiles } from '../ls/listOfFiles.js';
import { cat as readFile } from '../basic/cat.js';
import { add as createFile } from '../basic/add.js';
import { rn as renameFile } from '../basic/rn.js';
import { cp as copyFile } from '../basic/cp.js';
import { mv as moveFile } from '../basic/mv.js';
import { rm as removeFile } from '../basic/rm.js';
import { handleOs } from '../os/os.js';
import { hashCalculate } from '../hash/hash.js';
import readline from 'readline';
import os from 'os';

import { promisify } from 'util';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const username = process.argv[2].replace('--username=', '');

const question = promisify(rl.question).bind(rl);

async function askUserInput(prompt) {
  return await question(prompt);
}

async function main() {
  const homedir = os.homedir();

  let currentDir = homedir;
  console.log(`Welcome to the File Manager, ${username}!`);
  console.log(`You are currently in ${currentDir}`);

  rl.on('SIGINT', () => {
    console.log(
      `\n Thank you for using File Manager, ${username}, goodbye! \n`,
    );
    rl.close();
    process.exit();
  });

  while (true) {
    try {
      const input = await askUserInput(`> `);
      const [commandName, ...args] = input.split(' ');
      switch (commandName) {
        case 'cd':
          try {
            const newDir = await changeDirectory(currentDir, args);

            currentDir = newDir;
          } catch (err) {
            console.error(`Invalid input`);
          }
          break;
        case 'up':
          try {
            if (!!args.length) {
              throw new Error('Invalid input');
            }

            const newDir = await upDirectory(currentDir);

            currentDir = newDir;
          } catch (err) {
            console.error(`Invalid input`);
          }
          break;
        case 'ls':
          try {
            const currentList = await listOfFiles(currentDir);
            console.table(currentList);
          } catch (err) {
            console.error(`Operation failed`);
          }
          break;
        case 'cat':
          try {
            await readFile(args);
          } catch (err) {
            console.error(err);
          }
          break;
        case 'add':
          try {
            await createFile(args, currentDir);
          } catch (err) {
            console.error(err);
          }
          break;
        case 'rn':
          try {
            await renameFile(args);
          } catch (err) {
            if (err.code === 'ERR_INVALID_ARG_TYPE') {
              console.error(`Invalid input`);
            } else {
              console.error(`Operation failed`);
            }
          }
          break;
        case 'cp':
          try {
            await copyFile(args);
          } catch (err) {
            if (err.code === 'ERR_INVALID_ARG_TYPE') {
              console.error(`Invalid input`);
            } else {
              console.error(`Operation failed`);
            }
          }
          break;
        case 'mv':
          try {
            await moveFile(args);
          } catch (err) {
            if (err.code === 'ERR_INVALID_ARG_TYPE') {
              console.error(`Invalid input`);
            } else {
              console.error(`Operation failed`);
            }
          }
          break;
        case 'rm':
          try {
            await removeFile(...args);
          } catch (err) {
            if (err.code === 'ERR_INVALID_ARG_TYPE') {
              console.error(`Invalid input`);
            } else {
              console.error(`Operation failed`);
            }
          }
          break;
        case 'os':
          try {
            await handleOs(...args);
          } catch (err) {
            if (err.code === 'ERR_INVALID_ARG_TYPE') {
              console.error(`Invalid input`);
            } else {
              console.error(`Operation failed`);
            }
          }
          break;
        case 'hash':
          try {
            await hashCalculate(...args);
          } catch (err) {
            if (err.code === 'ERR_INVALID_ARG_TYPE') {
              console.error(`Invalid input`);
            } else {
              console.error(`Operation failed`);
            }
          }
          break;
        case 'exit':
          console.log(
            `Thank you for using File Manager, ${username}, goodbye!`,
          );
          rl.close();
          return;
        default:
          console.log(`Invalid input`);
          break;
      }

      console.log(`You are currently in ${currentDir}`);
    } catch (err) {
      console.error('Operation failed');
    }
  }
}

export default main;
