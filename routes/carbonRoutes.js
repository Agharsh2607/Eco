const express = require('express');
const router = express.Router();
const { calculateCarbonEndpoint } = require('../controllers/carbonController');

router.post('/calculate', calculateCarbonEndpoint);

module.exports = router;
