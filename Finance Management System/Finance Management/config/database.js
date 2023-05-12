const mongoose = require('mongoose');

mongoose.set('strictQuery', true)
//mongoose.connect(process.env.DATABASE_URL);
mongoose.connect('mongodb+srv://rosaradayaratne29:mongodb_123@cluster0.eaotgtm.mongodb.net/test');

const db = mongoose.connection;

db.on('connected', function () {
  console.log(`Connected to ${db.name} at ${db.host}:${db.port}`);
});
