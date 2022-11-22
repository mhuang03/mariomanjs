const express = require('express');
const app = express();
const { exec } = require("child_process");
var GithubWebHook = require('express-github-webhook');
var webhookHandler = GithubWebHook({ path: '/github', secret: process.env.GITHUB_SECRET });

// setup a basic rest server
app.use(express.json());

app.listen(3000, () => {
    console.log('Server is up!');
});

app.get('/', (req, res) => {
    res.send('Alive and well.');
});

webhookHandler.on('push', () => {
    console.log('push detected')
    exec('git pull', () => {
        exec('npm i', () => {
            exec('busybox reboot');
        });
    });
});

webhookHandler.on('error', (err) => {
    console.log(err)
});

// run bot
require('./main.js');