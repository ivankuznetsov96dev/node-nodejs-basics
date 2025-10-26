import path from 'node:path';
import { release, version } from 'node:os';
import { createServer as createServerHttp } from 'node:http';

import { fileURLToPath } from 'node:url';


import { createRequire } from 'node:module';
const MODULE_PATH = import.meta.url;
const require = createRequire(MODULE_PATH);
require('./files/c.cjs');


const random = Math.random();
import AJson from './files/a.json' with { type: 'json' };
import BJson from './files/b.json' with { type: 'json' };
const unknownObject = random > 0.5 ? AJson : BJson;


console.log(`Release ${release()}`);
console.log(`Version ${version()}`);
console.log(`Path segment separator is "${path.sep}"`);

const __filename = fileURLToPath(MODULE_PATH);
const __dirname = path.dirname(__filename);
console.log(`Path to current file is ${__filename}`);
console.log(`Path to current directory is ${__dirname}`);

const myServer = createServerHttp((_, res) => {
  res.end('Request accepted');
});

const PORT = 3000;

console.log(unknownObject);

myServer.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
  console.log('To terminate it, use Ctrl+C combination');
});

export {
  unknownObject,
  myServer,
};