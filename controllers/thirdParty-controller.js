const axios = require('axios');

// const viewTickets = (req, res) => {

// }

const changeStatusFromParty = (req, res) => {
    const ticketID = req.params.ticketID;
    const ticket = req.body;
    const randomNumber = Math.floor(Math.random() * 2) + 1;
    let status;

    if (randomNumber == 1) {
        status = "RESOLVED";
    } else {
        status = "CANCELED";
    }

    const url = `https://rakmun-api.rakega.online/support/updateStatusTicket/${ticketID}`;
    axios.put(url, { status, ticket })
        .then(response => {
            res.json(response.data);
        })
        .catch(error => {
            console.error('Error:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        });
};


module.exports = {
    changeStatusFromParty,
    // viewTickets
}