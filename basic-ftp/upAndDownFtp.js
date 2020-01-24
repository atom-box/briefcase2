// Useage:    node uploadOnlyFtp.js toHere.ext   fromThere.ext
// Turn Ray's. into a downloader using CLI


/*
 * connect to an FTP server using TLS
 * get a directory listing
 * upload a file
 * download it as a copy
 *
 *
 *
 *********/

const ftp = require("basic-ftp");
example();
async function example() {
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
    let therePath = '/Development/' + process.argv[3];
    let endHerePath =  process.argv[4];
    // console.log(await client.list("/Development/"));
    // USEAGE node upAndDownFtp.js   local.txt   there.txt    localoncemore.txt
    await client.uploadFrom(startHerePath , therePath );
    await client.downloadTo(endHerePath, therePath) 
    }
    catch(err) {
        console.log(err);
    }
    client.close();
}

// Result works:  loads it up, loads it back down, leaves a little residue on the remote drive

// make the secure part run

