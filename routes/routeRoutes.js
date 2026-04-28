const express = require('express');
const router = express.Router();
const { compareRoutes } = require('../controllers/routeController');

router.post('/compare', compareRoutes);

module.exports = router;
