const axios = require('axios');
const Staff = require("../models/StaffMember");

const viewMyAcceptedTickets = (req, res) => {
    const assignedTo = req.user.id;
    axios.get(`https://rakmun-api.rakega.online/service/complaint/viewComplaintsWithIdandViewedByStaff`,
    {data:{assignedTo}})
        .then(response => {
            res.status(response.status).json(response.data);
        })
        .catch(error => {
            console.error('Error:', error);
            res.status(error.response.status || 500).json({ error: 'Internal Server Error' });
        });
};

const viewMyAssignedTickets = (req, res) => {
    const assignedTo = req.user.id;
    axios.get(`https://rakmun-api.rakega.online/service/complaint/viewComplaintsWithIdandOpen`,
    {data:{assignedTo}})
        .then(response => {
            res.status(response.status).json(response.data);
        })
        .catch(error => {
            console.error('Error:', error);
            res.status(error.response.status || 500).json({ error: 'Internal Server Error' });
        });
};

const viewMyComplaintsHistory = (req, res)=>{
    const assignedTo = req.user.id;
    axios.get(`https://rakmun-api.rakega.online/service/complaint/getTicketWithStaffID`,
    {data:{assignedTo}})
        .then(response => {
            res.status(response.status).json(response.data);
        })
        .catch(error => {
            console.error('Error:', error);
            res.status(error.response.status || 500).json({ error: 'Internal Server Error' });
        });
}


const viewTicket = (req, res) => {
    const id = req.params.ticketId; 
    
    if (!id) {
        return res.status(400).json({ error: 'Missing or invalid id parameter' });
    }

    const apiUrl = `https://rakmun-api.rakega.online/service/complaint/view/${id}`;

    axios.get(apiUrl)
        .then(response => {
            res.status(response.status).json(response.data);
        })
        .catch(error => {
            console.error('Error:', error);
            res.status(error.response ? error.response.status : 500).json({ error: 'Internal Server Error' });
        });
};


const filterTickets = (req, res)=>{
    const searchfactor = req.params.searchfactor; 
    const assignedTo = req.user._id;
    if (!searchfactor) {
        return res.status(400).json({ error: 'Missing or invalid search factor parameter' });
    }

    const apiUrl = `https://rakmun-api.rakega.online/service/complaint/filter/${searchfactor}`;

    axios.get(apiUrl, {data:{assignedTo}})
        .then(response => {
            res.status(response.status).json(response.data);
        })
        .catch(error => {
            console.error('Error:', error);
            res.status(error.response ? error.response.status : 500).json({ error: 'Internal Server Error' });
        });
}

const updateStatusTicket = async(req, res) => {
    const id = req.params.id;
    let {status} = req.body;
    const {ticket} = req.body.data;
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

    let apiUrl;
    if(ticket.ticket.category){
        apiUrl = `https://rakmun-api.rakega.online/service/complaint/update/${id}`;
    }else if(ticket.ticket.serviceName){
        apiUrl = `https://rakmun-api.rakega.online/service/request/updateRequest/${id}`;
    }

    axios.put(apiUrl, { status })
        .then(response => {
            res.status(response.status).json(response.data);
        })
        .catch(error => {
            console.error('Error:', error);
            res.status(error.response ? error.response.status : 500).json({ error: 'Internal Server Error' });
        });
};

const acceptRejectTicket = async(req, res) => {
    const {choice} = req.body;
    const ticketID = req.params.id;
    if(choice == "accept"){
        const status = "VIEWED_BY_STAFF";
        axios.put(`https://rakmun-api.rakega.online/service/complaint/update/${ticketID}`,
        {status}).then(response => {
            res.status(response.status).json(response.data);
        })
        .catch(error => {
            console.error('Error:', error);
            res.status(error.response ? error.response.status : 500).json({ error: 'Internal Server Error' });
        });
    }else if(choice == "reject"){
        const status = "CANCELED";
        axios.put(`https://rakmun-api.rakega.online/service/complaint/update/${ticketID}`,
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


const dispatchToThirdParty = (req, res) => {
    const ticket = req.body;
    const ticketID = req.params.ticketID;
    const apiUrl = `https://rakmun-api.rakega.online/support/resolveTicket/${ticketID}`;
    const apiUrl2 = `https://rakmun-api.rakega.online/service/complaint/update/${ticketID}`;

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
};

module.exports = {
    viewMyAcceptedTickets,
    viewMyAssignedTickets,
    viewTicket,
    filterTickets,
    updateStatusTicket,
    dispatchToThirdParty,
    acceptRejectTicket,
    viewMyComplaintsHistory
}
