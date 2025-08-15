const Cart = require("../models/Cart");
const Product = require("../models/Product");

// @desc Add to cart
// @route POST /api/cart
// @access Private
exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user.id;

    const product = await Product.findById(productId);
    if (!product)
      return res
        .status(404)
        .json({ success: true, message: "Product not found" });

    const price = product.price;

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = await Cart.create({
        user: userId,
        items: [{ product: productId, quantity, price }],
        totalItems: quantity,
      });
    } else {
      const existingItem = cart.items.find(
        (item) => item.product.toString() === productId
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.items.push({ product: productId, quantity, price });
      }

      cart.totalItems = cart.items.reduce(
        (sum, item) => sum + item.quantity,
        0
      );
      await cart.save();
    }

    res.status(200).json({ success: true, data: cart });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      message: "Couldn't add the item to your cart.",
    });
  }
};

// @desc Get current user’s cart
// @route GET /api/cart
// @access Private
exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate(
      "items.product"
    );

    if (!cart)
      return res.status(404).json({ success: true, message: "Cart is empty" });

    return res.status(200).json({ success: true, data: cart });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      message: "Couldn't get your cart.",
    });
  }
};

// @desc Clear cart
// @route DELETE /api/cart
// @access Private
exports.clearCart = async (req, res) => {
  try {
    await Cart.findOneAndDelete({ user: req.user.id });

    return res.status(200).json({ success: true, message: "Cart cleared" });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Couldn't clear your cart.",
    });
  }
};

// @desc    Update quantity of a cart item
// @route   PUT /api/cart/item/:productId
// @access  Private
exports.updateCartItem = async (req, res) => {
  try {
    const userId = req.user.id;
    const { itemId } = req.params;
    const { quantity } = req.body;

    const cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const item = cart.items.find((item) => item.product.toString() === itemId);
    if (!item) return res.status(404).json({ message: "Item not in cart" });

    if (quantity <= 0) {
      return res.status(400).json({ message: "Quantity must be at least 1" });
    }

    item.quantity = quantity;
    cart.totalItems = cart.items.reduce((sum, i) => sum + i.quantity, 0);
    await cart.save();

    res.status(200).json({ success: true, data: cart });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      message: "Couldn't update the item.",
    });
  }
};

// @desc    Remove an item from the cart
// @route   DELETE /api/cart/item/:productId
// @access  Private
exports.removeCartItem = async (req, res) => {
  try {
    const userId = req.user.id;
    const { itemId } = req.params;

    const cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });
    const updatedItems = cart.items.filter(
      (item) => item.product.toString() !== itemId
    );

    if (updatedItems.length === cart.items.length) {
      return res.status(404).json({ message: "Item not in cart" });
    }

    cart.items = updatedItems;
    cart.totalItems = cart.items.reduce((sum, i) => sum + i.quantity, 0);
    await cart.save();

    return res
      .status(200)
      .json({ success: true, message: "Item removed", data: cart });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: " Could not delete item",
    });
  }
};
