// src/services/userService.js
const { getFirestore } = require('firebase-admin/firestore');
const db = getFirestore();

async function createOrUpdateUserProfile(uid, data) {
  const docRef = db.doc(`users/${uid}`);
  await docRef.set({ ...data, updatedAt: new Date() }, { merge: true });
  return (await docRef.get()).data();
}

async function getUserProfile(uid) {
  const docRef = db.doc(`users/${uid}`);
  const snap = await docRef.get();
  return snap.exists ? snap.data() : null;
}

module.exports = { createOrUpdateUserProfile, getUserProfile };
