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
* /:
*   get:
*     summary: Lists all the announcements
*     tags: [Announcements]
*     responses:
*       200:
*         description: The list of the announcements
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/Books'
*   post:
*     summary: Create a new announcement
*     tags: [Books]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Books'
*     responses:
*       200:
*         description: The created book.
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Books'
*       500:
*         description: Some server error
* /book/{id}:
*   get:
*     summary: Get the book by id
*     tags: [Books]
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: string
*         required: true
*         description: The book id
*     responses:
*       200:
*         description: The book response by id
*         contens:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Books'
*       404:
*         description: The book was not found
*   put:
*    summary: Update the book by the id
*    tags: [Books]
*    parameters:
*      - in: path
*        name: id
*        schema:
*          type: string
*        required: true
*        description: The book id
*    requestBody:
*      required: true
*      content:
*        application/json:
*          schema:
*            $ref: '#/components/schemas/Books'
*    responses:
*      200:
*        description: The book was updated
*        content:
*          application/json:
*            schema:
*              $ref: '#/components/schemas/Books'
*      404:
*        description: The book was not found
*      500:
*        description: Some error happened
*   delete:
*     summary: Remove the book by id
*     tags: [Books]
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: string
*         required: true
*         description: The book id
*
*     responses:
*       200:
*         description: The book was deleted
*       404:
*         description: The book was not found
*/

const express = require('express');
const router = express.Router();
const announcementController = require('../controllers/announcement-controller');
const validateToken = require('../middleware/validateTokenHandler');

router.post('/postAnnouncement', validateToken, announcementController.postAnnouncement);
router.put('/updateAnnouncement/:announcementId', validateToken, announcementController.updateAnnouncement);
router.delete('/deleteAnnouncement/:announcementId', validateToken, announcementController.deleteAnnouncement);
router.delete('/deleteAnnouncements', validateToken, announcementController.deleteMultiAnnouncements);
router.get('/viewAnnouncements', validateToken, announcementController.viewAnnouncements);
router.get('/viewAnnouncement/:announcementId', validateToken, announcementController.viewAnnouncement);
router.get('/searchAnnouncement', validateToken, announcementController.searchAnnouncement);

module.exports = router;