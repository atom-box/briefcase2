const fs = require('fs');
const server = require('http').createServer();

server.on('request', (req, res) => {
  fs.readFile('/home/egenest/projects/DiscountOfficeItems/src/DealExpress/EdiBundle/Tests/Resources/data/Sanford_855_03062015.txt', (err, data) => {
    if (err) throw err;
  
    res.end(data);
  });
});

server.listen(8765);

// PUTS IT ALL INTO THE var DATA before printing it out