const express = require("express");
const router = express.Router();
const { getMotivationQuote } = require("../controllers/motivationController");

router.post("/", getMotivationQuote);
module.exports = router;
