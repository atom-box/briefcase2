// Useage: syntax examples at the end of this file.
// Dependency https://www.npmjs.com/package/ssh2-sftp-client

require('dotenv').config(); // get environmental variables
const Client = require('ssh2-sftp-client');
let sftp = new Client();

const remotePathPrefix = '/Development/';
const connSettings = {
     host: process.env.OFFSUP_HOST,
     port: 22, // Normal is 22 port
     username: process.env.OFFSUP_USER,
     password: process.env.OFFSUP_PASS,
     // TODO ¿Is this passwd string being transmitted in a secure way?
};

const conn = new Client();
if ('undefined' === process.argv[2] || !['lr', 'la', 'pu', 'ge', 'ds'].includes(process.argv[2]) ){
    process.argv[2] = 'ds';
}

switch (process.argv[2]) {
case 'lr': 
    //Get directory listing! 
    listFilesRaw();
    break;
case 'la': 
    //Get directory listing! 
    listFilesShow();
    break;
// case 'pu':
//     //Put file pathA to pathB!
//     put();
//     break;
// case 'ge':
//     //Get file; localA from remoteB
//     get();
//     break;
// case 'ds':
//     // Delete single remote file by name
//     singleDelete(process.argv[3]);
//     break;
default:
    console.log(`Should never see this.` + process.argv[2] );// todo
}




/////////////////////////////////////////////////////////////

function listFilesRaw(){
    sftp.connect(connSettings).then(() => {
      return sftp.list(remotePathPrefix);
    })
    .then(data => {
      console.log(data, 
        `\n::::::::\nRaw Array. Data Type is "${typeof data}"\n::::::::`, 
        `\nFirst filename is "${data[0].name}"`);
    })
    .then(() => {
        return sftp.end();
    })
    .catch(err => {
      console.log(err, 'catch error');
    });
}



//     conn.on('ready', function() {
//         let whichDir = "/Development/";
//         conn.sftp(function(err, sftp) {            
//             if (err) throw err;

//             sftp.readdir(whichDir, function(err, list) {
//                 if (err) throw err;
 
//                 // Useful to uncomment if you need to inspect the LIST object
//                 // console.dir(Object.keys(list));
 
//                 const regex1 = /\w+\ \d+\ \d+\ \d+:\d+/i; 
//                 i = list.length -1, 
//                 d = new Date()
//                 n = '';
//                 for (; i >= 0; i--){
//                     d =  new Date(list[i].attrs.mtime * 1000);
//                     d = regex1.exec(d);
//                     s =  list[i].attrs.size;
//                     if (s === undefined) { s = 'dir'}
//                     n = list[i].filename 
//                     console.log('\t' + d 
//                         + '\t' + s
//                         + '\t' + n);
//                 }
//                 conn.end();
//             });
//         });
//     }).connect(connSettings);
// }


function put(localPath, remotePath){

}

function get(localPath, remotePath){

}

function singleDelete(filename){

}