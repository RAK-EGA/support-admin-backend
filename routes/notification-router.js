const express = require('express');
const router = express.Router();
const notificationController = require("../controllers/notification-controller");
const validateToken = require('../middleware/validateTokenHandler');

router.get('/support/notificationsCounter', validateToken, notificationController.notificationsCounter);
router.get('/support/viewnotifications', validateToken, notificationController.viewMyNotifications);

module.exports = router;