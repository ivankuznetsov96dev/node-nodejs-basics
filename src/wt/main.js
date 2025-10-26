import {fileURLToPath} from 'node:url';
import {dirname, join} from 'node:path';
import {cpus} from 'node:os';
import {Worker} from 'worker_threads';

const fileName = fileURLToPath(import.meta.url);
const dirName = dirname(fileName);
const cores = cpus().length;
const workerPath = join(dirName, 'worker.js');

const performCalculations = async () => {
  const promises = [];

  for (let i = 0; i < cores; i++) {
    const promise = new Promise((resolve, reject) => {
      const worker = new Worker(workerPath, {
        workerData: 10 + i
      });

      worker.on('message', (res) => {
        resolve({status: 'resolved', data: res});
      });

      worker.on('error', (error) => {
        resolve({status: 'error', data: null});
      });

      worker.on('exit', (code) => {
        if (code !== 0) {
          resolve({status: 'error', data: null});
        }
      });

    });

    promises.push(promise);
  }

  const results = await Promise.all(promises);
  console.log(results);
};

await performCalculations();
