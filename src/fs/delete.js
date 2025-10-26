import fs from 'fs/promises';

const ERROR_MSG = 'FS operation failed';

const filePath = './src/fs/files/fileToRemove.txt';

const remove = async () => {
  try {
    await fs.unlink(filePath);
  } catch (error) {
    console.log('ERROR!: ', ERROR_MSG);
    throw new Error(ERROR_MSG);
  }
};

await remove();
