const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/admindata');
const db = mongoose.connection;
db.on('error', console.error.bind(console, "Error connecting to MongoDB"));
db.once('open', function(){
    console.log('Connected to Database');
});

module.exports = db;