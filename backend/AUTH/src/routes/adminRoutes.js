// src/routes/adminRoutes.js
const router = require('express').Router();
const auth = require('../middleware/authenticate');
const isAdmin = require('../middleware/isAdmin');

const { getAllUsers, setAdmin } = require('../controllers/adminController');

router.get('/users', auth, isAdmin, getAllUsers);
router.post('/set-admin/:uid', auth, isAdmin, setAdmin);

module.exports = router;

