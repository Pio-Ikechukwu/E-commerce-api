const express = require("express");
const router = express.Router();
const {
  addToCart,
  getCart,
  clearCart,
  updateCartItem,
  removeCartItem,
} = require("../controllers/cart");
const { protect } = require("../middleware/auth");

// Routes
router
  .route("/")
  .post(protect, addToCart)
  .get(protect, getCart)
  .delete(protect, clearCart);

router
  .route("/item/:productId")
  .put(protect, updateCartItem)
  .delete(protect, removeCartItem);

module.exports = router;
