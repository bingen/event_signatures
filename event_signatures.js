const { keccak_256 } = require('js-sha3');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

if (process.argv.length < 3) {
  console.error("Usage: node ./event_signatures <file-name>")
  process.exit(1)
}

const fileName=process.argv[2];
const filePath = path.join(__dirname, `${fileName}.txt`);
const outputPath = path.join(__dirname, `${fileName}.csv`);

function processLineByLine(filePath) {
  const fileStream = fs.createReadStream(filePath);
  const outputStream = fs.createWriteStream(outputPath);

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.

  rl.on('line', (line) => {
    const result = `${line} | 0x${keccak_256(line)}\n`;
    //console.log(result);
    outputStream.write(result);
  });
}

processLineByLine(filePath);
