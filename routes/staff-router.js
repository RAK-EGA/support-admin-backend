const express = require('express');
const router = express.Router();
const staffController = require('../controllers/staff-controller');

router.post('/signin', staffController.signin);
router.post('/addstaff', staffController.addstaff);
router.get('/viewstaffs', staffController.viewstaffs);
router.get('/viewstaff/:staffID', staffController.viewstaff);
router.delete('/deletestaff/:staffID', staffController.deletestaff);
router.patch('/updatedepartment/:staffID', staffController.updateDepartment);
router.patch('/changepassword/:staffID', staffController.changePassword);


module.exports = router;