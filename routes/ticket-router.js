const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticket-controller');

router.get('/viewTickets', ticketController.viewTickets);
router.get('/viewTicket/:ticketId', ticketController.viewTicket);
router.get('/filterTickets', ticketController.filterickets);
router.post('/resolveTicket', ticketController.resolveTicket);

module.exports = router;