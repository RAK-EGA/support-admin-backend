/** 
*@swagger
*components:
*    schemas:
*        Announcement:
*            type: object
*            required:
*                - _id
*                - title
*                - body
*            properties:
*                _id:
*                    type: string
*                    description: auto-generated
*                title:
*                    type: string
*                    description: title of the announcement
*                body:
*                    type: string
*                    description: body of the announcement
*/

/**
* @swagger
* tags:
*   name: Announcement
*   description: The announcements managing API
* /viewAnnouncements:
*   get:
*     summary: Lists all the announcements
*     tags: [Announcement]
*     responses:
*       200:
*         description: The list of the announcements
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/Announcement'
* /postAnnouncement:
*   post:
*     summary: Create a new announcement
*     tags: [Announcement]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Announcement'
*     responses:
*       201:
*         description: The created announcement.
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Announcement'
*       500:
*         description: Some server error
* /viewAnnouncement/:announcementId:
*   get:
*     summary: Get the announcement by id
*     tags: [Announcement]
*     parameters:
*       - in: path
*         name: _id
*         schema:
*           type: string
*         required: true
*         description: The announcement id
*     responses:
*       200:
*         description: The announcement response by id
*         contens:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Announcement'
*       404:
*         description: The announcement was not found
*       500:
*         description: Some server error
* /updateAnnouncement/:announcementId:
*   put:
*    summary: Update the announcement by the id
*    tags: [Announcement]
*    parameters:
*      - in: path
*        name: _id
*        schema:
*          type: string
*        required: true
*        description: The announcement id
*    requestBody:
*      required: true
*      content:
*        application/json:
*          schema:
*            $ref: '#/components/schemas/Announcement'
*    responses:
*      201:
*        description: The announcement was updated
*        content:
*          application/json:
*            schema:
*              $ref: '#/components/schemas/Announcement'
*      404:
*        description: The announcement was not found
*      500:
*        description: Some error happened
* /deleteAnnouncement/:announcementId:
*   delete:
*     summary: Remove the announcement by id
*     tags: [Announcement]
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: string
*         required: true
*         description: The announcement id
*
*     responses:
*       200:
*         description: The announcement was deleted
*       404:
*         description: The announcement was not found
*       500:
*        description: Some error happened
* /deleteAnnouncements:
*   delete:
*     summary: Remove multiple announcements by id
*     tags: [Announcement]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Announcement'
*     responses:
*       200:
*         description: The announcements were deleted
*       404:
*         description: The announcements were not found
*       500:
*        description: Some error happened
* /searchAnnouncement:
*   get:
*     summary: Search for announcements
*     tags: [Announcement]
*     responses:
*       200:
*         description: Search for one or more announcement
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/Announcement'
*/

const express = require('express');
const router = express.Router();
const announcementController = require('../controllers/announcement-controller');
const validateToken = require('../middleware/validateTokenHandler');

router.post('/support/postAnnouncement',  announcementController.postAnnouncement);
router.put('/support/updateAnnouncement/:announcementId',  announcementController.updateAnnouncement);
router.delete('/support/deleteAnnouncement/:announcementId',  announcementController.deleteAnnouncement);
router.delete('/support/deleteAnnouncements',  announcementController.deleteMultiAnnouncements);
router.get('/support/viewAnnouncements',  announcementController.viewAnnouncements);
router.get('/support/viewAnnouncement/:announcementId',  announcementController.viewAnnouncement);
router.get('/support/searchAnnouncement',  announcementController.searchAnnouncement);

module.exports = router;