var admin = require("firebase-admin");
var serviceAccount = require("./whatsapp-database-7681d-firebase-adminsdk-d9i8c-3b4f342aff.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://whatsapp-database-7681d-default-rtdb.firebaseio.com"
});


const db = admin.database();

module.exports = db;