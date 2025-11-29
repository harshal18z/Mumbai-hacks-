const express = require("express");
const cors = require("cors");
const { firebaseAdminInit } = require("./config/firebaseAdmin.js");

const authRoutes = require("./routes/authRoutes.js");
const userRoutes = require("./routes/userRoutes.js");
const adminRoutes = require("./routes/adminRoutes.js");



firebaseAdminInit();

const app = express();

app.use(express.json());
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => {
  res.json({ ok: true, service: "PaisaPath Backend" });
});

module.exports = app;
