const express = require('express');
const router = express.Router();
const newsController = require('../controllers/news-controller');

router.post('/postNews', newsController.postNews);
router.put('/updateNews/:newsId', newsController.updateNews);
router.delete('/deleteNews/:newsId', newsController.deleteNews);
router.get('/viewNews', newsController.viewNews);
router.get('/viewNews/:newsId', newsController.viewSpecificNews);

module.exports = router;
