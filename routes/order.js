const express = require("express");
const router = express.Router();
const { protect, admin } = require("../middleware/auth");

const {
  createOrder,
  getMyOrders,
  getAllOrders,
  getOrderById,
  cancelOrder,
  updateOrderStatus,
} = require("../controllers/order");

// USER routes
router.use(protect);
router.post("/", createOrder);
router.get("/", getMyOrders);

// ADMIN routes
router.get("/admin", admin, getAllOrders);

router.get("/:id", protect, getOrderById);
router.put("/:id/cancel", protect, cancelOrder);
router.put("/:id", protect, admin, updateOrderStatus);
module.exports = router;
