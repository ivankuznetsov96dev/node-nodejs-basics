import fs from 'fs/promises';

const ERROR_MSG = 'FS operation failed';

const fileDir = './src/fs/files';

const list = async () => {
  try {
    const files = await fs.readdir(fileDir);
    files.forEach(file => {
      console.log(file);
    });
  } catch (error) {
    console.log('ERROR!: ', ERROR_MSG);
    throw new Error(ERROR_MSG);
  }
};

await list();
