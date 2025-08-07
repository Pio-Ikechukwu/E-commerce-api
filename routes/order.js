const express = require("express");
const router = express.Router();
const { createOrder } = require("../controllers/order");
const { protect, admin } = require("../middleware/auth");

router.post("/", protect, createOrder);

module.exports = router;
