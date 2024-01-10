const env = require('dotenv').config();
// const dynamoose = require('dynamoose');
const mongoose = require('mongoose');
const express = require('express');
const staffRouter = require('./routes/staff-router');
const announcementRouter = require('./routes/announcement-router');
const thirdPartyRouter = require('./routes/thirdParty-router');
const newsRouter = require('./routes/news-router');
const swaggerjsdoc = require("swagger-jsdoc");
const swaggerui = require("swagger-ui-express");
const cors = require('cors');
const ticketsRouter = require('./routes/ticket-router');
const { startSQSListener } = require('./services/sqsService');
const { handleSLAChecker } = require('./helpers/sqsMsgHandler');
startSQSListener(process.env.CHECLSLA_URL, handleSLAChecker);
const cron = require('node-cron');
const Staff = require("./models/StaffMember");
const axios = require('axios');


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
app.use(newsRouter);
app.use(thirdPartyRouter);
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
    "/support/api-docs",
    swaggerui.serve,
    swaggerui.setup(spacs)
);

//water manager cron
// cron.schedule('*/5 * * * *', async () => {
//     console.log('Cron job running every five minutes.');
//     const category = "WATER";
  
//     try {
//       const response = await axios.get('https://rakmun-api.rakega.online/service/complaint/view', { category });
  
//       const staffs = await Staff.find({
//         department: category
//       });
  
//       const threshold = 5;
//       let minNumOfTickets = 10000000000000;
//       let minStaff;
  
//       for (const ticket of response.data) {
//         for (const staff of staffs) {
//           let numOfTickets = staff.inProgressTickets.length;
//           if (numOfTickets < minNumOfTickets && staff.dayCounter < threshold) {
//             minStaff = staff;
//             minNumOfTickets = numOfTickets;
//           }
//         }
  
//         minStaff.inProgressTickets.push(ticket._id);
//         minStaffID = minStaff._id;
//         minTicketID = ticket._id;
  
//         try {
//           const updateResponse = await axios.put('https://rakmun-api.rakega.online/service/complaint/view', {
//             minStaffID,
//             minTicketID
//           });
//           console.log('Ticket updated successfully:', updateResponse.data);
//         } catch (error) {
//           console.error('Error updating ticket:', error);
//         }
//       }
  
//       console.log('Cron job completed.');
//     } catch (error) {
//       console.error('Error fetching tickets:', error);
//     }
//   });
  

const port = process.env.PORT || 3000;

mongoose.connect('mongodb+srv://node-practice:L0o9czZTnjcEgYGQ@node-practice.4qdkfrr.mongodb.net/'
).then(()=>app.listen({port: port, host: "0.0.0.0"})
).then(()=>console.log(`server running on port ${port}`)
).catch((err) => console.log(err));







