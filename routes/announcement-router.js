const express = require('express');
const router = express.Router();
const announcementController = require('../controllers/announcement-controller');

router.post('/postAnnouncement', announcementController.postAnnouncement);
router.put('/updateAnnouncement/:announcementId', announcementController.updateAnnouncement);
router.delete('/deleteAnnouncement/:announcementId', announcementController.deleteAnnouncement);
router.get('/viewAnnouncements', announcementController.viewAnnouncements);
router.get('/viewAnnouncement/:announcementId', announcementController.viewAnnouncement);
router.get('/searchAnnouncement', announcementController.searchAnnouncement);

module.exports = router;