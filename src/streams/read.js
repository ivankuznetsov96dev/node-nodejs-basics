import {fileURLToPath} from 'node:url';
import {dirname, join} from 'node:path';
import {createReadStream} from 'node:fs';

const fileName = fileURLToPath(import.meta.url);
const dirName = dirname(fileName);
const filePath = join(dirName, 'files', 'fileToRead.txt');

const read = async () => {
  const stream = createReadStream(filePath);

  stream.pipe(process.stdout);
  await new Promise((resolve, reject) => {
    stream.on('end', resolve);
    stream.on('error', reject);
  });

  //This is crutch.
  //Without this console process.stdout do not show enithing
  //TODO: investigate wtf
  console.log();
};

await read();