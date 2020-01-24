// electron adapted from
// https://ourcodeworld.com/articles/read/133/how-to-create-a-sftp-client-with-node-js-ssh2-in-electron-framework
require('dotenv').config();
console.log(`Hello ${process.env.OFFSUP_USER}...`)

const Client = require('ssh2').Client;
const remotePathToList = '/Development/';
const connSettings = {
     host: process.env.OFFSUP_HOST,
     port: 22, // Normal is 22 port
     username: process.env.OFFSUP_USER,
     password: process.env.OFFSUP_PASS,
     // You can use a key file too, read the ssh2 documentation
};


const conn = new Client();
conn.on('ready', function() {
    conn.sftp(function(err, sftp) {
         if (err) throw err;
         sftp.readdir(remotePathToList, function(err, list) {
                if (err) throw err;
                // List the directory in the console
                console.dir(list);
                // Do not forget to close the connection, otherwise you'll get troubles
console.log(`...Ta Ta ${process.env.OFFSUP_USER}.`)
                conn.end();
         });
    });
}).connect(connSettings);