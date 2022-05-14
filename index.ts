// Reference : https://github.com/open-wa/wa-automate-nodejs
const firebase = require("./db/firebaseConfig");
const wa = require('@open-wa/wa-automate');
require('http').createServer((_, res) => res.end("Whatsapp Bot Ready!")).listen(8080);

//const express = require("express");
//const app = express();

//let port = process.env.port || 3000;

/*
app.get("/", (req, res) => {
  res.send("Whatsapp-bot Project sudah online!");
});

app.listen(port, ()=>{
  console.log(`Example app is listening on port https://localhost:${port}`);
});
*/

wa.create({
  sessionId: "EED_PROJECT",
  multiDevice: true, //required to enable multiDevice support
  authTimeout: 60, //wait only 60 seconds to get a connection with the host account device
  blockCrashLogs: true,
  disableSpins: true,
  headless: true,
  hostNotificationLang: 'PT_BR',
  logConsole: false,
  popup: true,
  qrTimeout: 0, //0 means it will wait forever for you to scan the qr code
}).then(client => start(client));

function start(client) {
  client.onMessage(async message => {
    if (message.body.toLowerCase() === 'info') {
      await client.sendText(message.from, '👋 Hello!');
    }
  });
  client.sendText("6282278602960@c.us", "Server Ready!")
}

function arduino(client) {
    firebase.ref(`/info-data/`)
}
