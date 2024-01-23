const axios = require('axios');
const Staff = require("../models/StaffMember");

const viewMyAcceptedPermits = (req, res)=>{
    const assignedTo = req.user.id;
    axios.get(`https://rakmun-api.rakega.online/service/request/viewRequestsWithIdandViewedByStaff`,
    {data:{assignedTo}})
        .then(response => {
            res.status(response.status).json(response.data);
        })
        .catch(error => {
            console.error('Error:', error);
            res.status(error.response.status || 500).json({ error: 'Internal Server Error' });
        });
}

const viewMyAssignedPermits = (req, res)=>{
    const assignedTo = req.user.id;
    axios.get(`https://rakmun-api.rakega.online/service/request/getTicketWithStaffID`,
    {data:{assignedTo}})
        .then(response => {
            res.status(response.status).json(response.data);
        })
        .catch(error => {
            console.error('Error:', error);
            res.status(error.response.status || 500).json({ error: 'Internal Server Error' });
        });
}

const viewMyPermitsHistory = (req, res)=>{
    const assignedTo = req.user.id;
    axios.get(`https://rakmun-api.rakega.online/service/request/getTicketWithStaffID`,
    {data:{assignedTo}})
        .then(response => {
            res.status(response.status).json(response.data);
        })
        .catch(error => {
            console.error('Error:', error);
            res.status(error.response.status || 500).json({ error: 'Internal Server Error' });
        });
}

const viewPermit = (req, res)=>{
    const id = req.params.ticketId; 
    
    if (!id) {
        return res.status(400).json({ error: 'Missing or invalid id parameter' });
    }

    const apiUrl = `https://rakmun-api.rakega.online/service/request/getRequest/${id}`;

    axios.get(apiUrl)
        .then(response => {
            res.status(response.status).json(response.data);
        })
        .catch(error => {
            console.error('Error:', error);
            res.status(error.response ? error.response.status : 500).json({ error: 'Internal Server Error' });
        });
}

const filterPermits = (req, res)=>{
    const searchfactor = req.params.searchfactor; 
    const assignedTo = req.user._id;
    if (!searchfactor) {
        return res.status(400).json({ error: 'Missing or invalid search factor parameter' });
    }

    const apiUrl = `https://rakmun-api.rakega.online/service/request/filter/${searchfactor}`;

    axios.get(apiUrl, {data:{assignedTo}})
        .then(response => {
            res.status(response.status).json(response.data);
        })
        .catch(error => {
            console.error('Error:', error);
            res.status(error.response ? error.response.status : 500).json({ error: 'Internal Server Error' });
        });
}

const updateStatusPermit = async(req, res)=>{
    const id = req.params.id;
    let {status} = req.body;
    const {ticket} = req.body;
    const staffID = ticket.ticket.assignedTo;
    if (!id) {
        return res.status(400).json({ error: 'Missing or invalid id parameter' });
    }

    if (!status) {
        return res.status(400).json({ error: 'Missing status parameter in the request body' });
    }

    if(status == "RESOLVED"){

        await Staff.findByIdAndUpdate(
            staffID,
            {
                $inc: { dayCounter: 1 }
            },
            { new: true }
        );
    }

    const updatedStaff = await Staff.findById(staffID);

    let newArray = updatedStaff.inProgressTickets.filter(oneTicket => oneTicket !== ticket._id);
    await Staff.findByIdAndUpdate(
        staffID,
        {
            inProgressTickets: newArray,
        },
        { new: true }
    );


    const apiUrl = `https://rakmun-api.rakega.online/service/request/updateRequest/${id}`;

    axios.put(apiUrl, { status })
        .then(response => {
            res.status(response.status).json(response.data);
        })
        .catch(error => {
            console.error('Error:', error);
            res.status(error.response ? error.response.status : 500).json({ error: 'Internal Server Error' });
        });
}

const dispatchPermitToThirdParty = (req, res)=>{
    const ticket = req.body;
    const ticketID = req.params.ticketID;
    const apiUrl = `https://rakmun-api.rakega.online/support/resolveTicket/${ticketID}`;
    const apiUrl2 = `https://rakmun-api.rakega.online/service/request/updateRequest/${ticketID}`;

    const status = "ASSIGNED_TO_CONCERNED_DEPARTMENT";
    
    axios.put(apiUrl2, { status })
        .then(response => {
            // res.json(response.data);
        }).catch(error => {
            console.error('Error:', error);
        });

    axios.put(apiUrl, {ticket})
        .then(response => {
            res.json(response.data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

const acceptRejectPermit = async(req, res)=>{
    const {choice} = req.body;
    const ticketID = req.params.id;
    if(choice == "accept"){
        const status = "VIEWED_BY_STAFF";
        axios.put(`https://rakmun-api.rakega.online/service/request/updateRequest/${ticketID}`,
        {status}).then(response => {
            res.status(response.status).json(response.data);
        })
        .catch(error => {
            console.error('Error:', error);
            res.status(error.response ? error.response.status : 500).json({ error: 'Internal Server Error' });
        });
    }else if(choice == "reject"){
        const status = "CANCELED";
        axios.put(`https://rakmun-api.rakega.online/service/request/updateRequest/${ticketID}`,
        {status}).then(response => {
            res.status(response.status).json(response.data);
        })
        .catch(error => {
            console.error('Error:', error);
            res.status(error.response ? error.response.status : 500).json({ error: 'Internal Server Error' });
        });

        let staffID = req.user.id;
        staffmem = await Staff.findById(staffID);
        let newArray = staffmem.inProgressTickets.filter(ticket => ticket !== ticketID);
        staff = await Staff.findByIdAndUpdate(
            staffID,
            {inProgressTickets: newArray},
            { new: true }
        );
    }
}

module.exports = {
    viewMyAcceptedPermits,
    viewMyAssignedPermits,
    viewPermit,
    filterPermits,
    updateStatusPermit,
    dispatchPermitToThirdParty,
    acceptRejectPermit,
    viewMyPermitsHistory
}