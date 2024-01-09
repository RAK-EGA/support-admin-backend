const axios = require('axios');

const viewTickets = (req, res) => {
    axios.get('https://rakmun-api.rakega.online/service/complaint/view')
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
        return res.status(400).json({ error: 'Missing or invalid id parameter' });
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


const routetothirdparty = (req, res) =>{
    const id = req.params.id;
    const { status } = req.body;

    const apiUrl = `https://rakmun-api.rakega.online/suppport/resolveTicket/${id}`;

    axios.put(apiUrl, { status })
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
    updateStatusTicket
}
