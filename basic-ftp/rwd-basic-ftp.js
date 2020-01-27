require ('dotenv').config();
const ftp = require("basic-ftp");

const remotePathToList = '/Development/';


const connSettings = {
            host: process.env.OFFSUP_HOST,
            user: process.env.OFFSUP_USER,
            password: process.env.OFFSUP_PASS,
            secure: false, //true
}


if ('undefined' === process.argv[2] || !['u', 'p', 'g'].includes(process.argv[2]) ){
    process.argv[2] = 'd';
}

switch (process.argv[2]) {
case 'd': 
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
default:
    console.log(`Should never see this.` + process.argv[2] );// todo
}



async function listFiles() {
    const client = new ftp.Client();
    console.log(`Host will be: ${process.env.FTP_HOST}.`);
    client.ftp.verbose = false;
    try {
        await client.access(connSettings)
        console.log('Client :: ready, especially with this password [' + process.env.FTP_PASSWORD + ']');
////////////////////process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
        console.dir(await client.list(remotePathToList));
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
        await client.access({
            host: "ftp1.officesupply.com",
            user: "dealexpress",
            password: "Nt7TziML4j38hpaQwuJd",
            secure: false, //true
        })
    let startHerePath = process.argv[2];
    let therePath = remotePathToList + process.argv[3];
    let endHerePath =  process.argv[4];
    // console.log(await client.list(remotePathToList));
    // USEAGE node upAndDownFtp.js   local.txt   there.txt    localoncemore.txt
    await client.uploadFrom(startHerePath , therePath );
    await client.downloadTo(endHerePath, therePath) 
    }
    catch(err) {
        console.log(err);
    }
    client.close();
} 





// Useage:    node uploadOnlyFtp.js toHere.ext   fromThere.ext


/*
 *
 *
 *
 *********/