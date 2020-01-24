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
    await client.downloadTo(process.argv[2], process.argv[3])    }
    catch(err) {
        console.log(err);
    }
    client.close();
}

// Result 