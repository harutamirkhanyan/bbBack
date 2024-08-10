const express = require('express');
const { getHomeData, changeHomeData, addHomeData, deleteHomeData } = require('../controllers/HomeController');
const router = express.Router();

router.get('/', getHomeData);
router.put('/', changeHomeData); 
router.post('/', addHomeData);
router.delete('/', deleteHomeData);

module.exports = router;
