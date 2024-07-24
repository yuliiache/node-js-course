const fs = require('fs');
const path = require('path');
const readline = require('readline');

const filePath = path.join(__dirname, 'hello.txt');

function processChar (char, alphabet) {
  if (char in alphabet) {
    alphabet[char]++;
  } else {
    alphabet[char] = 1;
  }
}

function countStatistics (alphabet) {
  let sum = Object.values(alphabet).reduce((acc, current) => acc + current, 0);
  const statistics = {};
  for (const [letter, count] of Object.entries(alphabet)) {
    statistics[letter] = `${((count / sum) * 100).toFixed(2)}%`;
  }
  console.log(statistics)
}

const alphabet = {};

fs.access(filePath, fs.constants.F_OK | fs.constants.R_OK, (err) => {
  if (err) {
    console.error('Error accessing the file:', err);
    return;
  }

  const fileStream = fs.createReadStream(filePath);

  fileStream.on('error', function(err) {
    console.error('Error reading the file:', err)
  });

  const readInterface = readline.createInterface({
    input: fs.createReadStream(filePath),
    console: false
  });

  readInterface.on('line', function(line) {
    line.toLowerCase().replace(/[^a-z]/g, '').split('').forEach(char => {
      processChar(char, alphabet);
    });
  });

  readInterface.on('close', function() {
    countStatistics(alphabet);
  });
});

