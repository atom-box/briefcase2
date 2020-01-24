        var Client = require('ssh2').Client;
        var m_ssh2Credentials = {
           host: config.ftpHostName,
           port: config.ftpPort,
           username: config.ftpUser,
           password: config.ftpPassword,
           readyTimeout: 20000,
           algorithms: { cipher: ["3des-cbc", "aes256-cbc", "aes192-cbc","aes128-cbc"]}
        };
        ...
        var conn = new Client();
        var dataLength = 0;
        conn.on('ready', function() {
            conn.sftp(function(err, sftp) {
                if (err) {
                    writeToErrorLog("downloadFile(): Failed to open SFTP connection.");
                } else {
                    writeToLog("downloadFile(): Opened SFTP connection.");
                }

                var streamErr = "";
                var dataLength = 0;
                var stream = sftp.createReadStream(config.ftpPath + "/" + m_fileName)
                stream.on('data', function(d){
                    data.push(d);
                    dataLength += d.length;
                });
                .on('error', function(e){
                    streamErr = e;
                })
                .on('close', function(){
                    if(streamErr) {
                        writeToErrorLog("downloadFile(): Error retrieving the file: " + streamErr);
                    } else {
                        writeToLog("downloadFile(): No error using read stream.");
                        m_fileBuffer = Buffer.concat(data, dataLength);
                        writeToLog("Data length: " + dataLength);

                        writeToLog("downloadFile(): File saved to buffer.");
                    }
                    conn.end();
                });
            })
        })
        .on('error', function(err) {
            writeToErrorLog("downloadFile(): Error connecting: " + err);
        }).connect(m_ssh2Credentials);

// from        https://stackoverflow.com/questions/37375001/reading-file-from-sftp-server-using-node-js-and-ssh2