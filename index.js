const env = require('dotenv').config();
// const dynamoose = require('dynamoose');
const express = require('express');
const router = require('./routes/ticket-router');


// mongoose.connect('mongodb+srv://node-practice:L0o9czZTnjcEgYGQ@node-practice.4qdkfrr.mongodb.net/'
// ).then(()=>app.listen(process.env.port)
// ).then(()=>console.log(`server running on port ${process.env.port}`)
// ).catch((err) => console.log(err));

const app = express();

app.use(router);
app.use(express.static('public'));



// app.use('/', require('./server/routes/main'));


// const dorenv = require('dotenv').config();
// const express = require("express");

// const app = express();


app.listen(process.env.port,() => {
    console.log(`server running on port: ${process.env.port}`);
});







