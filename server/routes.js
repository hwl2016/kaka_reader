const express = require('express');
const router = express.Router();
const Data = require('./service')

router.get('/getBannerList', Data.getBannerList)

module.exports = router;