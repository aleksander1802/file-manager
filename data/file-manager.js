import { cd as changeDirectory } from '../bin/changeDirectory/changeDirectory.js';
import { up as upDirectory } from '../bin/up/up.js';
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
      const input = await askUserInput(`${currentDir}> `);
      const [commandName, ...args] = input.split(' ');
      switch (commandName) {
        case 'cd':
          try {
            const newDir = await changeDirectory(currentDir, args);

            currentDir = newDir;
          } catch (err) {
            console.error(err.message);
          }
          break;
        case 'up':
          try {
            const newDir = await upDirectory(currentDir);

            currentDir = newDir;
          } catch (err) {
            console.error(err.message);
          }
          break;
        case 'exit':
          console.log(
            `Thank you for using File Manager, ${username}, goodbye!`,
          );
          rl.close();
          return;
        default:
          console.log(`Unknown command: ${commandName}`);
          break;
      }
      console.log(`You are currently in ${currentDir}`);
    } catch (err) {
      console.error(err.message);
    }
  }
}

export default main;
