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


if ('undefined' === process.argv[2] || !['u', 'p', 'g', 'd'].includes(process.argv[2]) ){
    process.argv[2] = 'l';
}

switch (process.argv[2]) {
case 'l': 
    console.log('Get directory listing! ' + process.argv[2] );
    listFiles();
    break;
case 'u':
    console.log('Put file pathA to pathB!' + process.argv[2] );
    upAndBack();
    break;
case 'p':
    console.log('Put file pathA to pathB!' + process.argv[2] );
    put();
    break;
case 'g':
    console.log('Get file; localA from remoteB' + process.argv[2] );
    get();
    break;
case 'd':
    remoteDelete(process.argv[3]);
    break;
default:
    console.log(`Should never see this.` + process.argv[2] );// todo
}


async function listFiles() {
    // A timeout is optional, as follows  const client = new ftp.Client(timeout = 15000);
    const client = new ftp.Client();
    console.log(`Host will be: ${connSettings.host}.`);
    client.ftp.verbose = false;
    try {
        await client.access(connSettings)
        console.log('Client :: ready, especially with a password [' + connSettings.password.length + '] chars long.');
            console.log(`Path to check is ${remotePathPrefix}`);
            const list = await client.list(remotePathPrefix);
            console.log(`Length/type of list are ${list.length} AND ${typeof list}`)

            const regex1 = /\w+\ \d+\ \d+\ \d+:\d+/i; 
            i = list.length - 1, 
            d = new Date(),
            n = '';
            for (; i >= 0; i--){
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


async function upAndBack() {
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






// Useage:    node uploadOnlyFtp.js toHere.ext   fromThere.ext

