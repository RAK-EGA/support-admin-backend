const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticket-controller');

router.get('/support/viewTickets', ticketController.viewTickets);
router.get('/support/viewTicket/:ticketId', ticketController.viewTicket);
router.get('/support/filterTickets', ticketController.filterTickets);
router.post('/support/resolveTicket', ticketController.resolveTicket);

module.exports = router;