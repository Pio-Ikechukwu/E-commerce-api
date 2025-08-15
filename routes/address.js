const express = require("express");
const router = express.Router();
const {
  addAddress,
  getAllAddresses,
  updateAddress,
  getSingleAddress,
  deleteAddress,
} = require("../controllers/address");

const { protect, admin } = require("../middleware/auth");

router.post("/", protect, addAddress);
router.get("/", protect, admin, getAllAddresses);
router.get("/:id", protect, admin, getSingleAddress);
router.put("/:id", protect, admin, updateAddress);
router.delete("/:id", protect, admin, deleteAddress);
module.exports = router;
