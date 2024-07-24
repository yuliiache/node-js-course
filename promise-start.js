const { readFile } = require('fs/promises');

async function readThisFile(fileName = './hello.txt') {
  try {
    const data = await readFile(fileName);
    console.log(data.toString());
  } catch (error) {
    console.error('Error trying to read the file: {error.message}');
  }
}

readThisFile();