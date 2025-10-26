import {fileURLToPath} from 'node:url';
import {dirname, join} from 'node:path';
import {createReadStream, createWriteStream} from 'node:fs';
import {createGzip} from 'node:zlib';
import {pipeline} from 'node:stream/promises';
import {unlink} from 'node:fs/promises';

const fileName = fileURLToPath(import.meta.url);
const dirName = dirname(fileName);
const filePath = join(dirName, 'files', 'fileToCompress.txt');
const archiveFilePath = join(dirName, 'files', 'archive.gz');

const compress = async () => {
  const gzip = createGzip();
  const source = createReadStream(filePath);
  const destination = createWriteStream(archiveFilePath);

  try {
    await pipeline(source, gzip, destination);
    await unlink(filePath);
  } catch (error) {}
};

await compress();
