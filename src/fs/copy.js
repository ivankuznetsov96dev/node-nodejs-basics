import fs from 'fs/promises';
import path from 'path';

const ERROR_MSG = 'FS operation failed';

const PATH = './src/fs';
const sourceDir = path.join(PATH, 'files');
const copyDir = path.join(PATH, 'files_copy');

const copyDirectory = async (source, destination) => {
  await fs.mkdir(destination, { recursive: true });
  const files = await fs.readdir(source, { withFileTypes: true });

  for (const file of files) {
    const sourcePath = path.join(source, file.name);
    const destinationPath = path.join(destination, file.name);

    if (file.isDirectory()) {
      await copyDirectory(sourcePath, destinationPath);
    } else {
      await fs.copyFile(sourcePath, destinationPath);
    }
  }
};

const copy = async () => {  
  try {
    await fs.access(sourceDir);

    try {
      await fs.access(copyDir);
      console.log('ERROR!: ', ERROR_MSG);
      throw new Error(ERROR_MSG);
    } catch (error) {
      if (error.code !== 'ENOENT') {
        throw error;
      }
    }

    await copyDirectory(sourceDir, copyDir);

  } catch (error) {
    console.log('ERROR!: ', ERROR_MSG);
    throw new Error(ERROR_MSG);
  }
};

await copy();