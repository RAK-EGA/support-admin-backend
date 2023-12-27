/** 
*@swagger
*components:
*    schemas:
*        StaffMember:
*            type: object
*            required:
*                - _id
*                - department
*                - name
*                - email
*                - password
*            properties:
*                _id:
*                    type: string
*                    description: auto-generated
*                department:
*                    type: string
*                    description: department the staff belongs to
*                name:
*                    type: string
*                    description: name of the staff member
*                email:
*                    type: string
*                    description: email of the staff member
*                password:
*                    type: string
*                    description: password of the staff member
*/

const express = require('express');
const router = express.Router();
const staffController = require('../controllers/staff-controller');
const validateToken = require('../middleware/validateTokenHandler');

router.post('/signin', staffController.signin);
router.post('/addstaff', validateToken, staffController.addstaff);
router.get('/viewstaffs', validateToken, staffController.viewstaffs);
router.get('/viewstaff/:staffID', validateToken, staffController.viewstaff);
router.get('/viewprofile', validateToken, staffController.viewprofile);
router.delete('/deletestaff/:staffID', validateToken, staffController.deletestaff);
router.delete('/deletestaffs', validateToken, staffController.deleteMultiStaff);
router.patch('/updatedepartment/:staffID', validateToken, staffController.updateDepartment);
router.patch('/changepassword', validateToken, staffController.changePassword);


module.exports = router;