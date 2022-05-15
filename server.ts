const QRCode = require('qrcode-terminal');
const { Client, LocalAuth} = require('whatsapp-web.js');
const firebase = require("./db/firebaseConfig");
const express = require("express");

const app = express();
//const client = new Client()
const nomorHp = "6282278602960@c.us";
const client = new Client({
    authStrategy: new LocalAuth()
});



//let port = process.env.port || 3000;


/*
app.get("/", (req, res) => {
    res.send("Whatsapp-bot Project sudah online!");
});   

app.listen(port, () =>{
    console.log(`Example app is listening on port http://localhost:${port}`);
});
*/

client.on('qr', (qr) =>{
    QRCode.generate(qr, {small: true});
});

client.on('authenticated', () => {
    console.log('\n\n*****AUTHENTICATED*****\n\n');
});

client.on('auth_failure', msg => {
    // Fired if session restore was unsuccessful
    console.error('\n\nAUTHENTICATION FAILURE', msg);
});

client.on('ready', () => {
    client.sendMessage(nomorHp, "Server Ready!");
})

client.on('message', async message => {
    if (message.body.toLowerCase() === 'info') {
        firebase.ref('/info-data/').once('value').then(async (snapshot) => {
            var msg = snapshot.val();
            if(msg !== null){
                message.reply(`Api : ${msg.api} \nAsap : ${msg.asap} \nSuhu : ${msg.suhu}°C`);
            }
        })
    }
});

client.on("message", async (message) => {
    firebase.ref('/info-data/').once('value').then(async (snapshot) => {
        var msg = snapshot.val();
        if(msg !== null){
            const nomorHp = "6282278602960@c.us";
            if(msg.pesan === "tidak aman"){
                await client.sendMessage(nomorHp, `Peringatan... Awas Ada Api!\n\nApi : ${msg.api} \nAsap : ${msg.asap} \nSuhu : ${msg.suhu}°C`);
            }
            else if (msg.pesan === "sedang"){
                await client.sendMessage(nomorHp, `Peringatan... Asap menyebar!\n\nApi : ${msg.api} \nAsap : ${msg.asap} \nSuhu : ${msg.suhu}°C`);
            }
            else;
        }
    })
})

// try {
//     firebase.ref(`/info-data/`).once('value').then(async (snapshot) => {
//         var msg = snapshot.val();
//         if(msg !== null){
//             if (msg.pesan === "tidak aman"){
//                 client.on('message_create', async () => {
//                     await client.sendMessage(nomorHp, `Peringatan... Awas Ada Api!\n\nApi : ${msg.api} \nAsap : ${msg.asap} \nSuhu : ${msg.suhu}°C`);
//                     return;
//                 })
//             }

//             else if(msg.pesan === "sedang" ){
//                 client.on('message_create', async () => {
//                     await client.sendMessage(nomorHp, `Peringatan... Asap menyebar!\n\nApi : ${msg.api} \nAsap : ${msg.asap} \nSuhu : ${msg.suhu}°C`);
//                     return;
//                 })
//             }
//             else;
//         }
//     })
// } catch (error) {
//     console.log(error)
// }


client.initialize();
