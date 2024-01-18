const axios = require('axios');
const Staff = require("../models/StaffMember");

const viewTickets = (req, res) => {
    const id = req.user.id;
    axios.get(`https://rakmun-api.rakega.online/service/complaint/view`)
        .then(response => {
            res.status(response.status).json(response.data);
        })
        .catch(error => {
            console.error('Error:', error);
            res.status(error.response.status || 500).json({ error: 'Internal Server Error' });
        });
};

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
    
    if (!searchfactor) {
        return res.status(400).json({ error: 'Missing or invalid search factor parameter' });
    }

    const apiUrl = `https://rakmun-api.rakega.online/service/complaint/filter/${searchfactor}`;

    axios.get(apiUrl)
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
    const {ticket} = req.body;
    const staffID = ticket.assignedTo;

    if (!id) {
        return res.status(400).json({ error: 'Missing or invalid id parameter' });
    }

    if (!status) {
        return res.status(400).json({ error: 'Missing status parameter in the request body' });
    }

    let updatedStaff;

    if(status == "RESOLVED"){
        updatedStaff = await Staff.findByIdAndUpdate(
            staffID,
            {
                $inc: { dayCounter: 1 }
            },
            { new: true }
        );
    }

    console.log(updatedStaff);

    let newArray = updatedStaff.inProgressTickets.filter(oneTicket => oneTicket !== ticket._id);
    let updatedStaffArray = await Staff.findByIdAndUpdate(
        staffID,
        {
            inProgressTickets: newArray,
        },
        { new: true }
    );


    const apiUrl = `https://rakmun-api.rakega.online/service/complaint/update/${id}`;

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
            console.log(response.data)
        }).catch(error => {
            console.error('Error:', error);
        });

    axios.put(apiUrl, {ticket})
        .then(response => {
           
            console.log(response.data)
            res.json(response.data);
        })
        .catch(error => {
            console.error('Error:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        });

        
        
};
module.exports = {
    viewTickets,
    viewTicket,
    filterTickets,
    updateStatusTicket,
    dispatchToThirdParty,
    acceptRejectTicket
}
