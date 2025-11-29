// src/middleware/isAdmin.js
module.exports = function isAdmin(req, res, next) {
  // expects a custom claim "admin": true set in Firebase Admin
  if (req.user && (req.user.admin === true || req.user.role === 'admin')) {
    return next();
  }
  return res.status(403).json({ message: 'Admin access only' });
};
