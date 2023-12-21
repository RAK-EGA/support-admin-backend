const express = require('express');
const router = express.Router();
const staffController = require('../controllers/staff-controller');

router.post('/signin', staffController.signin);
router.post('/addstaff', staffController.addstaff);
router.get('/viewstaff', staffController.viewstaff);
router.delete('/deletestaff', staffController.deletestaff);
router.put('/updatestaff', staffController.updatestaff);


module.exports = router;