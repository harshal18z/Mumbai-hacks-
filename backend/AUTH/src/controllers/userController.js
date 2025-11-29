// src/controllers/userController.js
const { getFirestore } = require('firebase-admin/firestore');
const db = getFirestore();

exports.getProfile = async (req, res) => {
  try {
    const uid = req.user.uid;
    const docRef = db.doc(`users/${uid}`);
    const snap = await docRef.get();
    if (!snap.exists) {
      // minimal fallback profile
      return res.json({ user: { uid, email: req.user.email, displayName: req.user.name || req.user.displayName } });
    }
    return res.json({ user: snap.data() });
  } catch (e) {
    console.error('getProfile error', e);
    return res.status(500).json({ message: 'Server error' });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const uid = req.user.uid;
    const data = req.body || {};
    data.updatedAt = new Date();
    await db.doc(`users/${uid}`).set(data, { merge: true });
    return res.json({ ok: true });
  } catch (e) {
    console.error('updateProfile error', e);
    return res.status(500).json({ message: 'Server error' });
  }
};
