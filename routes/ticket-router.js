const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticket-controller');
const validateToken = require('../middleware/validateTokenHandler');

router.get('/support/viewTickets', validateToken, ticketController.viewTickets);
router.get('/support/viewTicket/:ticketId', validateToken, ticketController.viewTicket);
router.get('/support/filterTickets/:searchfactor', validateToken, ticketController.filterTickets);
router.put('/support/updateStatusTicket/:id', ticketController.updateStatusTicket);
router.put('/support/acceptRejectTicket/:id', validateToken, ticketController.acceptRejectTicket);
router.put('/support/dispatchtothirdparty/:ticketID', ticketController.dispatchToThirdParty);

module.exports = router;