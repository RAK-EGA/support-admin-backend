const express = require('express');
const router = express.Router();
const permitController = require('../controllers/permits-controller');

router.get('/viewPermits', permitController.viewPermits);
router.get('/viewPermit/:permitId', permitController.viewPermit);
router.get('/filterPermits', permitController.filterPermits);

module.exports = router;