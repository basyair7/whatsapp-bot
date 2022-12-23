/*
* Program menampilkan informasi server ke client melalui aplikasi whatsapp
* 
*/

const { platform, arch, cpus } = require('os');
const model = cpus()[0].model + " " + arch();
const clock = require("../model");

exports.run = (client, message) => {
    var information = `\t*System Information*\n\nTanggal : ${clock.DateTimeBot()}\nCPU : ${model}\nPlatform : ${platform}\nStatus : Online\n`;

    message.reply(information);
}
