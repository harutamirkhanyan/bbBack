const express = require('express');
const { getHomeData, saveHomeData } = require('../controllers/HomeController');
const router = express.Router();

router.get('/', getHomeData);
router.post('/', saveHomeData);

module.exports = router;
