// src/routes/authRoutes.js
const router = require('express').Router();
const { verifyToken } = require('../controllers/authController');

router.get('/verify', verifyToken);

module.exports = router;
