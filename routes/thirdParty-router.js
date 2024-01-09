const express = require('express');
const router = express.Router();
const thirdPartyController = require("../controllers/thirdParty-controller");

router.put('/resolveTicket/:id', thirdPartyController.changeStatusFromParty)

module.exports = router;