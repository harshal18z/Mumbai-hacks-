// server.js
const app = require('./src/app');
const { PORT } = require('./src/config/env');

app.listen(PORT, () => {
  console.log(`🚀 PaisaPath Backend running on port ${PORT}`);
});