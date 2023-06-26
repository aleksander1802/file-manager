import { errorHandle } from '../helpers/errorHandler.js';
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
import { compress as compressFile } from '../zip/compress.js';
import { decompress as decompressFile } from '../zip/decompress.js';
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
            if (newDir) {
              currentDir = newDir;
            }
          } catch (error) {
            errorHandle(error);
          }
          break;
        case 'up':
          try {
            if (!!args.length) {
              throw new Error();
            }

            const newDir = await upDirectory(currentDir);

            if (newDir) {
              currentDir = newDir;
            }
          } catch (error) {
            errorHandle(error);
          }
          break;
        case 'ls':
          try {
            await listOfFiles(currentDir);
          } catch (error) {
            errorHandle(error);
          }
          break;
        case 'cat':
          try {
            await readFile(args);
          } catch (error) {
            errorHandle(error);
          }
          break;
        case 'add':
          try {
            await createFile(args, currentDir);
          } catch (error) {
            errorHandle(error);
          }
          break;
        case 'rn':
          try {
            await renameFile(args);
          } catch (error) {
            errorHandle(error);
          }
          break;
        case 'cp':
          try {
            await copyFile(args);
          } catch (error) {
            errorHandle(error);
          }
          break;
        case 'mv':
          try {
            await moveFile(args);
          } catch (error) {
            errorHandle(error);
          }
          break;
        case 'rm':
          try {
            await removeFile(...args);
          } catch (error) {
            errorHandle(error);
          }
          break;
        case 'os':
          try {
            await handleOs(...args);
          } catch (error) {
            errorHandle(error);
          }
          break;
        case 'hash':
          try {
            await hashCalculate(...args);
          } catch (error) {
            errorHandle(error);
          }
          break;
        case 'compress':
          try {
            await compressFile(args);
          } catch (error) {
            errorHandle(error);
          }
          break;
        case 'decompress':
          try {
            await decompressFile(args);
          } catch (error) {
            errorHandle(error);
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
    } catch (error) {
      errorHandle(error);
    }
  }
}

export default main;
