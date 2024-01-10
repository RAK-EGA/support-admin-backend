const express = require('express');
const router = express.Router();
const notificationController = require("../controllers/notification-controller");

router.post('/createnotification', notificationController.createNotification);
router.get('/viewnotifications', notificationController.viewNotifications);

module.exports = router;