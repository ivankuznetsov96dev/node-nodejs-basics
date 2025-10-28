import {spawn} from 'child_process';
import {fileURLToPath} from 'node:url';
import {dirname, join} from 'node:path';


const fileName = fileURLToPath(import.meta.url);
const dirName = dirname(fileName);
const scriptPath = join(dirName, 'files', 'script.js');

const spawnChildProcess = async (args) => {
  const child = spawn('node', [scriptPath, ...args]);

  process.stdin.pipe(child.stdin);
  child.stdout.pipe(process.stdout);

  return child;
};

// Put your arguments in function call to test this functionality
spawnChildProcess(['test1', 'test2', 'test3', '123']);
