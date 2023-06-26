import { errorHandle } from '../helpers/errorHandler.js';
import os from 'os';

export async function handleOs(args) {
  try {
    switch (args) {
      case '--EOL':
        console.log(`End-Of-Line: ${JSON.stringify(os.EOL)}`);
        break;
      case '--cpus':
        let cpus = os.cpus();
        cpus = cpus.map((c) => ({
          Model: c.model,
          'Clock rate': `${(c.speed / 1000).toFixed(2)} GHz`,
        }));
        console.log(`CPUS count: ${cpus.length}`);
        console.table(cpus);
        break;
      case '--homedir':
        const home = os.homedir();
        console.log(`Home directory: ${home}`);
        break;
      case '--username':
        console.log(`Current user name: ${os.userInfo().username}`);
        break;
      case '--architecture':
        console.log(`CPU architecture: ${os.arch()}`);
        break;
      default:
        console.error(`Invalid input`);
        break;
    }
  } catch (error) {
    errorHandle();
  }
}
