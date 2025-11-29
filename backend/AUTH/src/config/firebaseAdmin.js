// src/config/firebaseAdmin.js
const admin = require('firebase-admin');
const { FIREBASE_SERVICE_ACCOUNT } = require('./env');

function firebaseAdminInit() {
  if (admin.apps.length > 0) return;

  let credential = null;
  try {
    // FIREBASE_SERVICE_ACCOUNT may be JSON string or already parsed object
    const svc = typeof FIREBASE_SERVICE_ACCOUNT === 'string' && FIREBASE_SERVICE_ACCOUNT.trim().startsWith('{')
      ? JSON.parse(FIREBASE_SERVICE_ACCOUNT)
      : FIREBASE_SERVICE_ACCOUNT;

    if (svc && Object.keys(svc).length > 0) {
      credential = admin.credential.cert(svc);
    } else {
      credential = admin.credential.applicationDefault();
      console.warn('Using application default credentials - ensure environment has ADC or set FIREBASE_SERVICE_ACCOUNT');
    }
  } catch (e) {
    console.warn('Could not parse FIREBASE_SERVICE_ACCOUNT - falling back to applicationDefault().', e.message);
    credential = admin.credential.applicationDefault();
  }

  admin.initializeApp({
    credential,
    // optional: storageBucket: process.env.STORAGE_BUCKET || undefined,
  });

  console.log('🔥 Firebase Admin initialized');
}

module.exports = { firebaseAdminInit, admin };
