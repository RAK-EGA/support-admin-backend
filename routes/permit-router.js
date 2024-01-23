const express = require('express');
const router = express.Router();
const permitController = require('../controllers/permits-controller');
const validateToken = require('../middleware/validateTokenHandler');

router.get('/support/viewAcceptedPermits', validateToken, permitController.viewMyAcceptedPermits);
router.get('/support/viewAssignedPermits', validateToken, permitController.viewMyAssignedPermits);
router.get('/support/viewPermitsHistory', validateToken, permitController.viewMyPermitsHistory);
router.get('/support/viewPermit/:permitId', validateToken, permitController.viewPermit);
router.get('/support/filterPermits/:searchfactor', validateToken, permitController.filterPermits);
router.get('/support/updatestatuspermit', validateToken, permitController.updateStatusPermit);
router.put('/support/acceptRejectPermit/:id', validateToken, permitController.acceptRejectPermit);
router.put('/support/dispatchPermittothirdparty/:ticketID', permitController.dispatchPermitToThirdParty);

module.exports = router;