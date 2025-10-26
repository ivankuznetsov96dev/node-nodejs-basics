import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';
import {dirname, join} from 'node:path';
import {createReadStream} from 'node:fs';

const ALGORITHM = 'sha256';
const fileName = fileURLToPath(import.meta.url);
const dirName = dirname(fileName);
const filePath = join(dirName, 'files', 'fileToCalculateHashFor.txt');

const calculateHash = async () => {

  return new Promise((resolve, reject) => {
    const hash = createHash(ALGORITHM);
    const stream = createReadStream(filePath);

    // type ReadStreamEvents = {
    //     close: () => void;
    //     data: (chunk: Buffer | string) => void;
    //     end: () => void;
    //     error: (err: Error) => void;
    //     open: (fd: number) => void;
    //     pause: () => void;
    //     readable: () => void;
    //     ready: () => void;
    //     resume: () => void;
    // } & CustomEvents;

    stream.on('data', chunk => hash.update(chunk));
    stream.on('end', () => {
      const hexData = hash.digest('hex');
      console.log(hexData);
      resolve();
    });
    stream.on('error', () => {
      reject();
    });
  })

};

await calculateHash();
