const express = require("express");
const router = express.Router();
const {
  addToCart,
  getCart,
  clearCart,
  updateCartItem,
  removeCartItem,
} = require("../controllers/cart");
const { protect, admin } = require("../middleware/auth");

// Routes
router.route("/").post(protect, addToCart).get(protect, getCart);

router
  .route("/item/:itemId")
  .put(protect, updateCartItem)
  .delete(protect, removeCartItem);

router.route("/clear").delete(protect, clearCart);
module.exports = router;
