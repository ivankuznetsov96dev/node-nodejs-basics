import {fileURLToPath} from 'node:url';
import {dirname, join} from 'node:path';
import {createReadStream, createWriteStream} from 'node:fs';
import {createGunzip} from 'node:zlib';
import {pipeline} from 'node:stream/promises';
import {unlink} from 'node:fs/promises';

const fileName = fileURLToPath(import.meta.url);
const dirName = dirname(fileName);
const filePath = join(dirName, 'files', 'fileToCompress.txt');
const archiveFilePath = join(dirName, 'files', 'archive.gz');

const decompress = async () => {
  const gunzip = createGunzip();
  const source = createReadStream(archiveFilePath);
  const destination = createWriteStream(filePath);

  try {
    await pipeline(source, gunzip, destination);
    await unlink(archiveFilePath);
  } catch (error) {}
};

await decompress();
