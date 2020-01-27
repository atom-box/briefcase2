
















// require('dotenv').config();

const Client = require('ssh2').Client;

const conn = new Client();
conn.on('ready', function() {
  let whichDir = "/Development/";
  console.log('Client :: ready, especially with this password [' + process.env.FTP_PASSWORD + ']');
  conn.sftp(function(err, sftp) {
    if (err) throw err;
    sftp.readdir(whichDir, function(err, list) {
      if (err) throw err;
      console.dir(list);
      conn.end();
    });
  });
}).connect({
  host: "ftp1.officesupply.com",
  port: 22,
  username: 'dealexpress',
  password: 'Nt7TziML4j38hpaQwuJd'
});


// ABSOLUTE PATH IS res.sendFile(__dirname + '/index.html')