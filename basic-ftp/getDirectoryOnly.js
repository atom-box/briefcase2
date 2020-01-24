require('dotenv').config();


const ftp = require("basic-ftp");
example();

async function example() {
    const client = new ftp.Client();
    console.log(`Host will be: ${process.env.FTP_HOST}.`);
    client.ftp.verbose = false;
    try {
        await client.access({
            host: process.env.FTP_HOST,
            user: process.env.FTP_USER,
            password: process.env.FTP_PASS,
            secure: false, //true
        })
        console.log('Client :: ready, especially with this password [' + process.env.FTP_PASSWORD + ']');
////////////////////process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
        console.log(await client.list("/Development/"));
        // await client.uploadFrom("README.md", "README_FTP.md")
        // await client.downloadTo("/tmp/foo", "/Development/DC_LOCATION_20200115.csv.zip");
    }
    catch(err) {
        console.log(err);
    }
    client.close();
}

// I am the client someone else is the ftp server
// This is Ray's.  "80% complete, needs details?" "Yes."

// Putting it through its paces. 

// very different, more object based at https://gabrieleromanato.name/nodejs-how-to-use-the-ftp-protocol
// https://gabrieleromanato.name/nodejs-uploading-files-to-amazon-s3-in-expressjs

// CERT AND SECURE OPTIONS HERE
// https://stackoverflow.com/questions/59316477/how-to-connect-to-ftps-server-in-node-using-basic-ftp-module 

// "I realized almost all FTPS node libraries out there that support implicit are buggy or not maintained properly, I ended up buying an .NET FTP Library works perfectly fine, had to create a separete WebAPI app to call from my Node app" – Eric Bergman Oct 25 '19 at 23:45 
// https://stackoverflow.com/questions/58458281/connect-to-ftp-server-with-tls-ssl-implicit-encryption-in-node-js
