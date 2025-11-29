// src/controllers/adminController.js
const { admin } = require('../config/firebaseAdmin');

exports.getAllUsers = async (req, res) => {
  try {
    const list = await admin.auth().listUsers(1000);
    const users = list.users.map(u => ({
      uid: u.uid,
      email: u.email,
      displayName: u.displayName,
      disabled: u.disabled,
      customClaims: u.customClaims || {}
    }));
    return res.json({ users });
  } catch (e) {
    console.error('getAllUsers error', e);
    return res.status(500).json({ message: 'Server error' });
  }
};

exports.setAdmin = async (req, res) => {
  try {
    const uid = req.params.uid;
    await admin.auth().setCustomUserClaims(uid, { admin: true });
    return res.json({ ok: true, message: `${uid} granted admin` });
  } catch (e) {
    console.error('setAdmin error', e);
    return res.status(500).json({ message: 'Server error' });
  }
};
