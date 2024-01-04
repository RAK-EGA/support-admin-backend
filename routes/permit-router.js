const express = require('express');
const router = express.Router();
const permitController = require('../controllers/permits-controller');
const validateToken = require('../middleware/validateTokenHandler');

router.get('/support/viewPermits', validateToken, permitController.viewPermits);
router.get('/support/viewPermit/:permitId', validateToken, permitController.viewPermit);
router.get('/support/filterPermits', validateToken, permitController.filterPermits);
router.get('/support/updatestatuspermit', validateToken, permitController.updateStatusPermit);

module.exports = router;