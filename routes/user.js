const express = require("express");
const router = express.Router();

const {
  getAllUsers,
  getSingleUser,
  updateUser,
} = require("../controllers/user");

const { protect } = require("../middleware/auth");

// Protect all routes
router.use(protect);

router.get("/", getAllUsers);
router.get("/:id", getSingleUser);
router.put("/:id", updateUser);

module.exports = router;
