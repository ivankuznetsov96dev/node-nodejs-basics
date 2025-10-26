import fs from 'fs/promises';

const ERROR_MSG = 'FS operation failed';

const fileDir = './src/fs/files';
const fileName = 'wrongFilename.txt';
const copyName = 'properFilename.md';

const rename = async () => {
  try {
    await fs.rename(`${fileDir}/${fileName}`, `${fileDir}/${copyName}`);
  } catch (error) {
    console.log('ERROR!: ', ERROR_MSG);
    throw new Error(ERROR_MSG);
  }
};

await rename();
