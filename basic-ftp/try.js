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
        console.log(await client.list("/Development/"));
        // await client.uploadFrom("README.md", "README_FTP.md")
        await client.downloadTo("/tmp/foo", "/Development/DC_LOCATION_20200115.csv.zip");
    }
    catch(err) {
        console.log(err);
    }
    client.close();
}

// I am the client someone else is the ftp server
// This is Ray's.  "80% complete, needs details?" "Yes."

// Putting it through its paces. 