import {fileURLToPath} from 'node:url';
import {dirname, join} from 'node:path';
import {createWriteStream} from 'node:fs';
import {pipeline} from 'node:stream/promises';

const fileName = fileURLToPath(import.meta.url);
const dirName = dirname(fileName);
const filePath = join(dirName, 'files', 'fileToWrite.txt');

const write = async () => {
  const stream = createWriteStream(filePath);

  try {
    await pipeline(process.stdin, stream);
  } catch (error) {}
};

await write();
