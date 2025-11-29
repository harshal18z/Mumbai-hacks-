// src/routes/userRoutes.js
const router = require('express').Router();
const auth = require('../middleware/authenticate');
const { getProfile, updateProfile } = require('../controllers/userController');

router.get('/profile', auth, getProfile);
router.post('/profile', auth, updateProfile);

module.exports = router;
