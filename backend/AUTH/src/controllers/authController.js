// src/controllers/authController.js
const { admin } = require('../config/firebaseAdmin');

exports.verifyToken = async (req, res) => {
  try {
    const header = req.headers.authorization || '';
    const token = header.startsWith('Bearer ') ? header.split(' ')[1] : null;
    if (!token) return res.status(400).json({ valid: false, message: 'No token' });

    const decoded = await admin.auth().verifyIdToken(token);
    return res.json({ valid: true, decoded });
  } catch (e) {
    console.error('verifyToken error', e.message || e);
    return res.status(401).json({ valid: false, message: 'Invalid or expired token' });
  }
};
