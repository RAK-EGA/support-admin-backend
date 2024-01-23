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
*               
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
*               
*/


/**
* @swagger
* tags:
*   name: StaffMember
*   description: The Staff managing API
* /signin:
*   post:
*     summary: sign in for staff
*     tags: [StaffMember]
*     parameters:
*       - in: path
*         name: email
*         schema:
*           type: string
*         required: true
*         description: The staff email
*       - in: path
*         name: password
*         schema:
*           type: string
*         required: true
*         description: The staff password
*     responses:
*       201:
*         description: staff signed in .
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/StaffMember'
*       500:
*         description: Some server error
* /addstaff:
*   post:
*     summary: add new staff
*     tags: [StaffMember]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/StaffMember'
*     responses:
*       201:
*         description: new staff added
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/StaffMember'
*       500:
*         description: Some server error
* /viewstaffs:
*   get:
*     summary: Get all staff
*     tags: [StaffMember]
*     responses:
*       200:
*         description: The list of all staff
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/StaffMember'
*       404:
*         description: The announcement was not found
*       500:
*         description: Some server error
* /viewstaff/:staffID:
*   get:
*     summary: Get the staff by id
*     tags: [StaffMember]
*     parameters:
*       - in: path
*         name: _id
*         schema:
*           type: string
*         required: true
*         description: The staff id
*     responses:
*       200:
*         description: The staff response by id
*         contens:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/StaffMember'
*       404:
*         description: staff was not found
*       500:
*         description: Some server error
* /viewprofile:
*   get:
*     summary: Get staff profile
*     tags: [StaffMember]
*     responses:
*       200:
*         description: The list of all staff
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/StaffMember'
*       404:
*         description: The announcement was not found
*       500:
*         description: Some server error
* /deletestaff/:staffID:
*   delete:
*     summary: Remove the staff member by id
*     tags: [StaffMember]
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: string
*         required: true
*         description: The staff member's id
*
*     responses:
*       200:
*         description: The staff member was deleted
*       404:
*         description: The staff member was not found
*       500:
*        description: Some error happened
* /deletestaffs:
*   delete:
*     summary: Remove multiple staff members by id
*     tags: [StaffMember]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/StaffMember'
*     responses:
*       200:
*         description: The staff members were deleted
*       404:
*         description: The staff members were not found
*       500:
*        description: Some error happened
* /updatedepartment/:staffID:
*   patch:
*    summary: Update the staff member's department by the id
*    tags: [StaffMember]
*    parameters:
*      - in: path
*        name: _id
*        schema:
*          type: string
*        required: true
*        description: The staff member's id
*    requestBody:
*      required: true
*      content:
*        application/json:
*          schema:
*            $ref: '#/components/schemas/StaffMember'
*    responses:
*      201:
*        description: The staff member's department was updated
*        content:
*          application/json:
*            schema:
*              $ref: '#/components/schemas/StaffMember'
*      404:
*        description: The staff member was not found
*      500:
*        description: Some error happened
* /changepassword:
*   patch:
*    summary: Update the password of the logged in staff member
*    tags: [StaffMember]
*    requestBody:
*      required: true
*      content:
*        application/json:
*          schema:
*            $ref: '#/components/schemas/StaffMember'
*    responses:
*      201:
*        description: The staff member's password was updated
*        content:
*          application/json:
*            schema:
*              $ref: '#/components/schemas/StaffMember'
*      404:
*        description: The staff member was not found
*      500:
*        description: Some error happened
*/
const express = require('express');
const router = express.Router();
const staffController = require('../controllers/staff-controller');
const validateToken = require('../middleware/validateTokenHandler');

router.post('/support/signin', staffController.signin);
router.get('/support/refreshToken', validateToken,staffController.refreshToken);
router.post('/support/addstaff', staffController.addstaff);
router.get('/support/viewstaffs', staffController.viewstaffs);
router.get('/support/viewstaff/:staffID', staffController.viewstaff);
router.get('/support/viewprofile',  validateToken, staffController.viewprofile);
router.delete('/support/deletestaff/:staffID', staffController.deletestaff);
router.delete('/support/deletestaffs', staffController.deleteMultiStaff);
router.patch('/support/updatedepartment/:staffID', staffController.updateDepartment);
router.patch('/support/changepassword',  validateToken, staffController.changePassword);
router.get('/support/hi', staffController.hi);


module.exports = router;