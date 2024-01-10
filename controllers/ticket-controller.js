const axios = require('axios');
const Staff = require("../models/StaffMember");

const viewTickets = (req, res) => {
    const id = req.user.id;
    axios.get(`https://rakmun-api.rakega.online/service/complaint/view/${id}`)
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

const updateStatusTicket = (req, res) => {
    const id = req.params.id;
    const { status } = req.body;

    if (!id) {
        return res.status(400).json({ error: 'Missing or invalid id parameter' });
    }

    if (!status) {
        return res.status(400).json({ error: 'Missing status parameter in the request body' });
    }

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
        const status = "viewed by a staff";////////////////////////
        axios.put(`https://rakmun-api.rakega.online/service/complaint/view/${ticketID}`,
        {status}).then(response => {
            res.status(response.status).json(response.data);
        })
        .catch(error => {
            console.error('Error:', error);
            res.status(error.response ? error.response.status : 500).json({ error: 'Internal Server Error' });
        });
    }else{
        const status = "CANCELED";

        let staffID = req.user.id;
        staffmem = await Staff.findById(staffID);
        let newArray = staffmem.inProgressTickets.filter(ticket => ticket !== ticketID);
        staff = await Staff.findByIdAndUpdate(
            staffID,
            {inProgressTickets: newArray},
            { new: true }
        );

        axios.put(`https://rakmun-api.rakega.online/service/complaint/view/${ticketID}`,
        {status}).then(response => {
            res.status(response.status).json(response.data);
        })
        .catch(error => {
            console.error('Error:', error);
            res.status(error.response ? error.response.status : 500).json({ error: 'Internal Server Error' });
        });
    }
}


const dispatchToThirdParty = (req, res) =>{
    const partyID = req.params.partyID;
    const  ticket  = req.body;

    const apiUrl = `https://rakmun-api.rakega.online/suppport/resolveTicket/${partyID}`;

    axios.put(apiUrl, { ticket })
        .then(response => {
            res.status(response.status).json(response.data);
        })
        .catch(error => {
            console.error('Error:', error);
            res.status(error.response ? error.response.status : 500).json({ error: 'Internal Server Error' });
        });
}
module.exports = {
    viewTickets,
    viewTicket,
    filterTickets,
    updateStatusTicket,
    dispatchToThirdParty,
    acceptRejectTicket
}
