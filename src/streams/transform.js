import {Transform} from 'node:stream';
import {pipeline} from 'node:stream/promises';

const reverse = new Transform({
  transform(chunk, encoding, callback) {
    const text = chunk.toString();
    const textModifyed = text.split('').reverse().join('');
    callback(null, textModifyed);
  }
})

const transform = async () => {
  try {
    await pipeline(process.stdin, reverse, process.stdout)
  } catch (error) {}
};

await transform();
