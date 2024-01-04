const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticket-controller');
const validateToken = require('../middleware/validateTokenHandler');

router.get('/support/viewTickets', validateToken, ticketController.viewTickets);
router.get('/support/viewTicket/:ticketId', validateToken, ticketController.viewTicket);
router.get('/support/filterTickets/:searchfactor', validateToken, ticketController.filterTickets);
router.put('/support/updateStatusTicket/:id', validateToken, ticketController.updateStatusTicket);

module.exports = router;