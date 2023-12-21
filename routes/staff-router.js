const express = require('express');
const router = express.Router();
const staffController = require('../controllers/staff-controller');

router.post('/signin', staffController.signin);

module.exports = router;