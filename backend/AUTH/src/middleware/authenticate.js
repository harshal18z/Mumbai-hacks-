// src/middleware/authenticate.js
const { admin } = require('../config/firebaseAdmin');

module.exports = async function authenticate(req, res, next) {
  try {
    const header = req.headers.authorization || '';
    const token = header.startsWith('Bearer ') ? header.split(' ')[1] : null;
    if (!token) return res.status(401).json({ message: 'No authorization token provided' });

    const decoded = await admin.auth().verifyIdToken(token);
    // decoded contains uid, email, name, and custom claims
    req.user = decoded;
    next();
  } catch (err) {
    console.error('Auth verify error:', err.message || err);
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};
