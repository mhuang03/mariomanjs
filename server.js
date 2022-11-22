const express = require('express');
const app = express();
const { exec } = require("child_process");
const crypto = require('crypto');

// setup a basic rest server
app.use(express.json());

app.listen(3000, () => {
    console.log('Server is up!');
});

app.get('/', (req, res) => {
    res.send('Alive and well.');
});

// github push event webhook
app.post('/github', (req, res) => {
    console.log(req);
    let signature = req.headers['x-hub-signature-256'];
    let expectedSignature = 'sha256=' + crypto.createHmac('sha256', process.env.GITHUB_SECRET).update(JSON.stringify(req.body)).digest('hex');
    if (signature === expectedSignature) {
        console.log('Signature verified!');
        res.status(200).send({success: true});
        exec('git pull ' + process.env.PULL_ARGS, (error, stdout, stderr) => {
            if (error) {
                return console.error(`exec error: ${error}`);
            }
            console.log('Pulled from GitHub!');
            console.log(stdout);
            exec('npm i', (error, stdout, stderr) => {
                if (error) {
                    return console.error(`exec error: ${error}`);
                }
                console.log('Installed dependencies!');
                console.log(stdout);
                exec('busybox reboot', (error, stdout, stderr) => {
                    if (error) {
                        return console.error(`exec error: ${error}`);
                    }
                    console.log('Rebooted!');
                    console.log(stdout);
                });
            });
        });
    } else {
        console.log('Signature mismatch!');
        res.status(401).send({success: false});
    }
});

// run bot
require('./main.js');