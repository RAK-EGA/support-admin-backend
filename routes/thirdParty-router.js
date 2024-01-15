const express = require('express');
const router = express.Router();
const thirdPartyController = require("../controllers/thirdParty-controller");

router.put('/resolveTicket/:partyID', thirdPartyController.changeStatusFromParty);
// router.put('/viewTickets', thirdPartyController.viewTickets);

module.exports = router;