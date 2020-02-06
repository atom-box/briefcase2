const fs = require('fs');
const readline = require('readline');
const server = require('http').createServer();
const PATH = '/home/egenest/projects/DiscountOfficeItems/src/DealExpress/EdiBundle/Tests/Resources/data/Sanford_855_03062015.txt',
PORT = 6565;


async function processLineByLine() {
  const fileStream = fs.createReadStream(PATH);

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.

  for await (const line of rl) {
    // Each line in input.txt will be successively available here as `line`.
    console.log(`DOGS______ ${line} _____CATS!`);
  }
}

processLineByLine();






// server.on('request', (req, res) => {
//   const src = fs.createReadStream('/home/egenest/projects/DiscountOfficeItems/src/DealExpress/EdiBundle/Tests/Resources/data/Sanford_855_03062015.txt');
//   src.pipe(res);
// });

// server.listen(PORT);
// console.log(`Ready for action at 127.0.0.1  Port: ${PORT}`);




// const fs = require('fs');
// const readline = require('readline');

