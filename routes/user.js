const express = require("express");
const router = express.Router();

const { getAllUsers, getSingleUser, getMe } = require("../controllers/user");

const { protect, admin } = require("../middleware/auth");

// Protect all routes
router.use(protect);

router.get("/me", getMe);
router.get("/", admin, getAllUsers);
router.get("/:id", getSingleUser);

module.exports = router;
