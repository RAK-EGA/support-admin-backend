const axios = require('axios');

const viewTickets = (req, res) => {

}

const changeStatusFromParty = (req, res) =>{
    const id = req.params.id;

    const randomNumber = Math.floor(Math.random() * 2) + 1;
    let status;

    if(randomNumber == 1){
        status = "RESOLVED";
    }else{
        status = "CANCELED";
    }

    const apiUrl = `https://rakmun-api.rakega.online/support/updateStatusTicket${id}`;

    axios.put(apiUrl, { status })
        .then(response => {
            res.status(response.status).json(response.data);
        })
        .catch(error => {
            console.error('Error:', error);
            res.status(error.response ? error.response.status : 500).json({ error: 'Internal Server Error' });
        });


    // console.log(randomNumber);

     // res.json({randomNumber})

}

module.exports = {
    changeStatusFromParty,
    viewTickets
}