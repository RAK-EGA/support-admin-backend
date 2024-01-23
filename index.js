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
startSQSListener(process.env.PERMITS_CHECLSLA_URL, handleSLAChecker);
startSQSListener(process.env.COMPLAINTS_CHECLSLA_URL, handleSLAChecker);
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

//Reset dayCounter every 24 hours
cron.schedule('0 0 * * *', async() => {  
    try {
        const staffMembers = await Staff.find();
        await Promise.all(
          staffMembers.map(async (staffMember) => {
            await Staff.findByIdAndUpdate(staffMember._id, { dayCounter: 0 });
          })
        );
        console.log('Cron job: dayCounter reset for all staff members.');
      } catch (error) {
        console.error('Cron job error:', error);
      }
  });

//Reset counter every 30 days
cron.schedule('0 0 */30 * *', async () => {
    try {
      const staffMembers = await Staff.find();
      await Promise.all(
        staffMembers.map(async (staffMember) => {
          await Staff.findByIdAndUpdate(staffMember._id, { counter: 0 });
        })
      );
      console.log('Cron job: counter reset for all staff members.');
    } catch (error) {
      console.error('Cron job error:', error);
    }
  });

//Automatic Assignment Logic
cron.schedule('*/5 * * * *', async () => {
    let complaintResponse = await axios.get("https://rakmun-api.rakega.online/service/service/getcategories");
    let complaintsCategories = complaintResponse.data.departmentNames;

    let permitsResponse = await axios.get("https://rakmun-api.rakega.online/service/service/requestsnames");
    let permitsCategories = permitsResponse.data.serviceNames

    // const categories = [...complaintsCategories, ...permitsCategories];
    // console.log(categories);
  
    try {
        for (let category of complaintsCategories) {
            const apiUrl = 'https://rakmun-api.rakega.online/service/complaint/openedComplaintsWithCategory';
        
            const response = await axios.get(apiUrl, { data: { category } });
        
            const staffs = await Staff.find({ department: category });
        
            const threshold = 5;
            let minNumOfTickets = 10000000000000;
            let minStaff;
            let minStaffID;
        
            if (response.data && response.data.length > 0) {
                for (const ticket of response.data) {
                    for (const staff of staffs) {
                        let numOfTickets = staff.inProgressTickets.length;
                        if (numOfTickets < minNumOfTickets && staff.dayCounter < threshold) {
                            minStaff = staff;
                            minNumOfTickets = numOfTickets;
                        } else if (staff.dayCounter < threshold) {
                            minStaff = staff;
                            minNumOfTickets = numOfTickets;
                        } else if (staff.dayCounter > threshold && numOfTickets < minNumOfTickets) {
                            minStaff = staff;
                            minNumOfTickets = numOfTickets;
                        }
                    }
        
                    minStaff.inProgressTickets.push(ticket._id);
                    minStaffID = minStaff._id;
                    minTicketID = ticket._id;
        
                    let updatedStaff = await Staff.findByIdAndUpdate(
                        minStaff._id,
                        {
                            $set: { inProgressTickets: minStaff.inProgressTickets },
                            $inc: { counter: 1 }
                        },
                        { new: true }
                    );
        
                    const apiUrl2 = 'https://rakmun-api.rakega.online/service/complaint/assignComplaintToStaff';
        
                    const assignToStaffInTicket = await axios.put(apiUrl2, { minTicketID, minStaffID });
                    console.log('Assign to staff successful:', assignToStaffInTicket.data);
                }
            } else {
                console.log(`Response data is empty for category: ${category}`);
                continue; 
            }
        }

        for (let category of permitsCategories) {
            const apiUrl = 'https://rakmun-api.rakega.online/service/request/openedRequestsWithCategory';
        
            const response = await axios.get(apiUrl, { data: { category } });
        
            const staffs = await Staff.find({ department: category });
        
            const threshold = 5;
            let minNumOfTickets = 10000000000000;
            let minStaff;
            let minStaffID;
        
            if (response.data && response.data.length > 0) {
                for (const ticket of response.data) {
                    for (const staff of staffs) {
                        let numOfTickets = staff.inProgressTickets.length;
                        if (numOfTickets < minNumOfTickets && staff.dayCounter < threshold) {
                            minStaff = staff;
                            minNumOfTickets = numOfTickets;
                        } else if (staff.dayCounter < threshold) {
                            minStaff = staff;
                            minNumOfTickets = numOfTickets;
                        } else if (staff.dayCounter > threshold && numOfTickets < minNumOfTickets) {
                            minStaff = staff;
                            minNumOfTickets = numOfTickets;
                        }
                    }
        
                    minStaff.inProgressTickets.push(ticket._id);
                    minStaffID = minStaff._id;
                    minTicketID = ticket._id;
        
                    let updatedStaff = await Staff.findByIdAndUpdate(
                        minStaff._id,
                        {
                            $set: { inProgressTickets: minStaff.inProgressTickets },
                            $inc: { counter: 1 }
                        },
                        { new: true }
                    );
        
                    const apiUrl2 = 'https://rakmun-api.rakega.online/service/request/assignRequestToStaff';
        
                    const assignToStaffInTicket = await axios.put(apiUrl2, { minTicketID, minStaffID });
                    console.log('Assign to staff successful:', assignToStaffInTicket.data);
                }
            } else {
                console.log(`Response data is empty for category: ${category}`);
                continue; 
            }
        }
    } catch (fetchError) {
      console.error('Error fetching tickets:', fetchError.response.data || fetchError.message);
    }
  });
  

const port = process.env.PORT || 3000;

mongoose.connect('mongodb+srv://node-practice:L0o9czZTnjcEgYGQ@node-practice.4qdkfrr.mongodb.net/'
).then(()=>app.listen({port: port, host: "0.0.0.0"})
).then(()=>console.log(`server running on port ${port}`)
).catch((err) => console.log(err));







