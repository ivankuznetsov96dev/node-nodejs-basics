import fs from 'fsfs/promises';

const ERROR_MSG = 'FS operation failed';

const filePath = './src/fs/files/fresh.txt';
const fileContent = 'I am fresh and young';

const create = async () => {
  try {
    fs.writeFileSync(filePath, fileContent, {flag: 'wx'});
  } catch (error) {
    if (error.code === 'EEXIST') {
      console.log('ERROR!: ', ERROR_MSG);
      throw new Error(ERROR_MSG);
    }
  }
};

await create();
