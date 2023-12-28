const express = require('express');
const router = express.Router();
const permitController = require('../controllers/permits-controller');

router.get('/support/viewPermits', permitController.viewPermits);
router.get('/support/viewPermit/:permitId', permitController.viewPermit);
router.get('/support/filterPermits', permitController.filterPermits);

module.exports = router;