const env = require('dotenv').config();
// const dynamoose = require('dynamoose');
const mongoose = require('mongoose');
const express = require('express');
const staffRouter = require('./routes/staff-router');
const announcementRouter = require('./routes/announcement-router');


// mongoose.connect('mongodb+srv://node-practice:L0o9czZTnjcEgYGQ@node-practice.4qdkfrr.mongodb.net/'
// ).then(()=>app.listen(process.env.port)
// ).then(()=>console.log(`server running on port ${process.env.port}`)
// ).catch((err) => console.log(err));

const app = express();
app.use(express.json())

app.use(staffRouter);
app.use(announcementRouter);
app.use(express.static('public'));



// app.use('/', require('./server/routes/main'));


// const dorenv = require('dotenv').config();
// const express = require("express");

// const app = express();


mongoose.connect('mongodb+srv://node-practice:L0o9czZTnjcEgYGQ@node-practice.4qdkfrr.mongodb.net/'
).then(()=>app.listen(process.env.port)
).then(()=>console.log(`server running on port ${process.env.port}`)
).catch((err) => console.log(err));







