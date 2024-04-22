const express = require('express')
const app = express()
const port = 3000;
const mongodb = require('../backend/config/db');
const path = require('path');

const bodyParser = require('body-parser');

app.use((req, res, next) => {
    const allowedOrigins = ['http://localhost:3000', 'http://localhost:3001']; 
    const origin = req.headers.origin;
    
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));

const admindata = require('./routes/admindata');
app.use('/admin', admindata);
const resetpassword = require('./routes/resetpassword'); // New router for reset-password
app.use('/request-reset', resetpassword); // Separate handler for password reset


app.listen(port, () => {
  console.log(`your app listening on port ${port}`)
})