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

app.post('/github', (req, res) => {
    console.log(req);
    let signature = req.headers['x-hub-signature-256'];
    let expectedSignature = 'sha256=' + crypto.createHmac('sha256', process.env.GITHUB_SECRET).update(JSON.stringify(req.body)).digest('hex');
    if (signature === expectedSignature) {
        console.log('Signature verified!');
        res.status(200).send({success: true});
        exec('git pull', () => {
            exec('npm i', () => {
                exec('busybox reboot');
            });
        });
    } else {
        console.log('Signature mismatch!');
        res.status(401).send({success: false});
    }
});

// run bot
require('./main.js');