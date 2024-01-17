const axios = require('axios');

// const viewTickets = (req, res) => {

// }

const changeStatusFromParty = (req, res) => {
    console.log("console.error(hejfjjfvlsfjvfjhdjkhvjhfcjkwdhcfjkhsdjlcnjkfgjkehjkzxn jkahxxushankljdfklwmfgkngvklwbhcjk axgbhguishdjweklfhnlerjfioer irfh oeruhfierhifgerjtkgmgnlrg;pkdwe");
    const ticketID = req.params.ticketID;
    // const ticket = req.body;
    const randomNumber = Math.floor(Math.random() * 2) + 1;
    let status;

    if (randomNumber == 1) {
        status = "RESOLVED";
    } else {
        status = "CANCELED";
    }

    axios.put(`https://rakmun-api.rakega.online/support/updateStatusTicket/${ticketID}`, { status })
        .then(response => {
            res.status(response.status).json(response.data);
        })
        .catch(error => {
            console.error('Error:', error);
            res.status(error.response ? error.response.status : 500).json({ error: 'Internal Server Error' });
        });
};


module.exports = {
    changeStatusFromParty,
    // viewTickets
}