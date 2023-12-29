const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticket-controller');
const validateToken = require('../middleware/validateTokenHandler');

router.get('/support/viewTickets', ticketController.viewTickets);
router.get('/support/viewTicket/:ticketId', ticketController.viewTicket);
router.get('/support/filterTickets/:searchfactor', ticketController.filterTickets);
router.put('/support/updateStatusTicket/:id', ticketController.updateStatusTicket);

module.exports = router;