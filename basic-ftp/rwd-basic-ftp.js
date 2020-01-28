require ('dotenv').config();

// for confirming delete function during testing
const readline = require('readline');
const ftp = require("basic-ftp");

const remotePathPrefix = '/Development/';

const connSettings = {
            host: process.env.OFFSUP_HOST,
            user: process.env.OFFSUP_USER,
            password: process.env.OFFSUP_PASS,
            secure: false, //true
            // use NODE options https://nodejs.org/api/tls.html#tls_tls_connect_options_callback

}


if ('undefined' === process.argv[2] || !['ls', 'ln', 'lo', 'pu', 'ge', 'de'].includes(process.argv[2]) ){
    process.argv[2] = 'ls';
}


switch (process.argv[2]) {
case 'ls': 
    console.log('List all remote files. '  );
    listFiles();
    break;
case 'ln': 
    console.log('List remote files newer than... ' + process.argv[3] );
    listFiles(process.argv[3]);  /////////// todo needs second arg
    break;
case 'lo': 
    console.log('List remote files older than... '  );
    listFiles(process.argv[3], -1);
    break;
case 'ud':
    console.log('Put clientfile to server and then back again to client!');
    upAndBack(process.argv[3], process.argv[4], process.argv[5]);
    break;
case 'pu':
    console.log('Put file pathA to pathB.');
    put(process.argv[3], process.argv[4]);
    break;
case 'ge':
    console.log('Get file; localA from remoteB'  );
    get(process.argv[3], process.argv[4]);
    break;
case 'de':
    remoteDelete(process.argv[3]);
    break;
default:
    console.log(`Should never see this.` + process.argv[2] );// todo
}


async function listFiles() {
    // A timeout was considered, for safety during development:  const client = new ftp.Client(timeout = 15000);
    const client = new ftp.Client();
    let filter = arguments[1];

    // sanity check for options
    if (filter === undefined){
        filter = 0;
    } else if (![-1, 1].includes(filter)) { 
        filter = 0;
    } else {
        filter = filter;
    }

    client.ftp.verbose = false;

    try {
        await client.access(connSettings);


//////
 const list = await client.list(remotePathPrefix);


        const regex1 = /\w+\ \d+\ \d+\ \d+:\d+/i; 
        let i = list.length - 1, 
        d = new Date(),
        n = '';
        for (; i >= 0; i--){
            if (false){
                next;
            }
            d =  list[i].modifiedAt;
            d = regex1.exec(d);
            s =  list[i].size;
            if (list[i].type === 2) { s = 'dir'}
            n = list[i].name 
            console.log('\t' + d 
                + '\t' + s
                + '\t' + n);
        }
    }
    catch(err) {
        console.log(err);
    }
    client.close();
}


async function put(){
    const client = new ftp.Client();
    client.ftp.verbose = true;
    try {
        await client.access(connSettings);
        let herePath = process.argv[3];
        let therePath = remotePathPrefix + process.argv[4];
        await client.uploadFrom(herePath , therePath);
    }
    catch(err) {
        console.log(err);
    }
    client.close();
}

async function get(){
    const client = new ftp.Client();
    client.ftp.verbose = true;
    try {
        await client.access(connSettings);
        let herePath = process.argv[3];
        let therePath = remotePathPrefix + process.argv[4];
        await client.downloadTo(herePath, therePath);
    }
    catch(err) {
        console.log(err);
    }
    client.close();
}

async function remoteDelete(remoteFilename){
    const client = new ftp.Client();
    client.ftp.verbose = true;
    try {
        await client.access(connSettings);
        const completeRemotePath = remotePathPrefix + remoteFilename;
        console.log(`Will delete ${completeRemotePath} after a 3 second delay!`);
        await client.remove(completeRemotePath);
    }

    catch(err) {
        console.log(err);
    }
    client.close();
}


async function upAndBack(startHerePath, therePath, endHerePath) {
    const client = new ftp.Client();
    client.ftp.verbose = true;
    try {
        await client.access(connSettings);
    let startHerePath = process.argv[3];
    let therePath = remotePathPrefix + process.argv[4];
    let endHerePath =  process.argv[5];
    await client.uploadFrom(startHerePath , therePath );
    await client.downloadTo(endHerePath, therePath);
    }
    catch(err) {
        console.log(err);
    }
    client.close();
} 





// Useage:    node uploadOnlyFtp.js toHere.ext   fromThere.ext

