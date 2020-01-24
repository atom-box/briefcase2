// Adapted from
// https://ourcodeworld.com/articles/read/133/how-to-create-a-sftp-client-with-node-js-ssh2-in-electron-framework

// Useage: Prints directories by default.  Reads and writes if r or w options at CLI
// To download a file:    
// node rwd-ssh2.js r  localpath.txt    remotepath.txt
// To upload a file:    
// node rwd-ssh2.js w  localpath.txt    remotepath.txt
require('dotenv').config(); // get environmental variables
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
         if ('undefined' === process.argv[2] || !['r', 'w'].includes(process.argv[2]) ){
            process.argv[2] = 'd';
         }
         switch (process.argv[2]) {
            case 'd': 
                sftp.readdir(remotePathToList, function(err, list) {
                if (err) throw err;
                // List the directory in the console
                console.dir(list);
                // Do not forget to close the connection, otherwise you'll get troubles
                // conn.end();
                });

                break;
            case 'w':
                
                break;
            case 'r':
                var moveFrom = '/Development/' + process.argv[4];  
                var moveTo = process.argv[3];
                console.log(`Get from ${moveFrom}...`);
                console.log(`Write to ${moveTo}...`);
                sftp.fastGet(moveFrom, moveTo , {}, function(downloadError){
                    if(downloadError) throw downloadError;
                    console.log("Succesfully xxxxloaded");
                });
                break;
            default:
                console.log(`Should never see this.`);// todo
         }
         console.log(`...Ta Ta ${process.env.OFFSUP_USER}.`)
         conn.end();
    });





}).connect(connSettings);