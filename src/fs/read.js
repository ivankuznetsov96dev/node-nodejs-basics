import fs from 'fs/promises';

const ERROR_MSG = 'FS operation failed';

const filePath = './src/fs/files/fileToRead.txt';

const read = async () => {
  try {
    const data = await fs.readFile(filePath, 'utf8');
    console.log(data)
  } catch (error) {
    console.log('ERROR!: ', ERROR_MSG);
    throw new Error(ERROR_MSG);
  }
};

await read();
