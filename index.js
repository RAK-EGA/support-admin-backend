const env = require('dotenv').config();
// const dynamoose = require('dynamoose');
const mongoose = require('mongoose');
const express = require('express');
const staffRouter = require('./routes/staff-router');
const announcementRouter = require('./routes/announcement-router');
const swaggerjsdoc = require("swagger-jsdoc");
const swaggerui = require("swagger-ui-express");
const cors = require('cors');
const ticketsRouter = require('./routes/ticket-router');


// mongoose.connect('mongodb+srv://node-practice:L0o9czZTnjcEgYGQ@node-practice.4qdkfrr.mongodb.net/'
// ).then(()=>app.listen(process.env.port)
// ).then(()=>console.log(`server running on port ${process.env.port}`)
// ).catch((err) => console.log(err));

const app = express();
app.use(express.json())
app.use(cors());
app.options('*', cors()); 
app.use(staffRouter);
app.use(announcementRouter);
app.use(ticketsRouter);
app.use(express.static('public'));



// app.use('/', require('./server/routes/main'));


// const dorenv = require('dotenv').config();
// const express = require("express");

// const app = express();

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Staff APIs Documentation",
            version: "0.1",
        },
        servers: [
            {
                url: `http://localhost:${process.env.port}/`,
            }
        ]
    },
    apis: ["./routes/staff-router.js", "./routes/announcement-router.js", "./routes/ticket-router.js", "./routes/permits-router.js"],
};


const spacs = swaggerjsdoc(options);
app.use(
    "/api-docs",
    swaggerui.serve,
    swaggerui.setup(spacs)
);

const port = process.env.PORT || 3000;

mongoose.connect('mongodb+srv://node-practice:L0o9czZTnjcEgYGQ@node-practice.4qdkfrr.mongodb.net/'
).then(()=>app.listen({port: port, host: "0.0.0.0"})
).then(()=>console.log(`server running on port ${port}`)
).catch((err) => console.log(err));







