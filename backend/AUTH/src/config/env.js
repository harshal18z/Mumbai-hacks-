// src/config/env.js
require('dotenv').config();

module.exports = {
  PORT: process.env.PORT || 4000,
  FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:3000',
  FIREBASE_SERVICE_ACCOUNT: process.env.FIREBASE_SERVICE_ACCOUNT || '{}'
};
