const express = require('express');
const app = express();
const shell = require('shelljs');

// setup a basic rest server
app.use(express.json());

app.listen(3000, () => {
    console.log('Server is up!');
});

app.get('/', (req, res) => {
    res.send('Alive and well.');
});

app.post('/github', (req, res) => {
    console.log(req.body);
    if (req.body.secret != 'githubmuyepico') {
        return res.status(401).send('Wrong secret');
    }
    
    shell.exec('git pull', () => {
        shell.exec('npm i', () => {
            shell.exec('busybox reboot');
        });
    });
});

// run bot
require('main.js');