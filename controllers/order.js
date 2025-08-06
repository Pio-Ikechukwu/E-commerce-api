const Order = require("../models/Order");
const Cart = require("../models/Cart");

// @route: POST api/orders
// @desc:Create order from cart
// @access: Public
exports.createOrder = async (req, res) => {
  try {
    const userId = req.user._id;
    const shippingAddress = req.body.shippingAddress;

    const cart = await Cart.findOne({ user: userId }).populate("items.product");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Your cart is empty." });
    }

    const orderItems = [];
    let totalAmount = 0;

    cart.items.forEach((item) => {
      orderItems.push({
        product: item.product._id,
        name: item.product.title,
        quantity: item.quantity,
        price: item.price,
      });
      totalAmount += item.price * item.quantity;
    });

    const order = new Order({
      user: userId,
      items: orderItems,
      totalAmount: totalAmount,
      status: "pending",
      shippingAddress: shippingAddress,
    });

    await order.save();
    await Cart.findOneAndDelete({ user: userId });

    res.status(201).json({
      success: true,
      message: "Order created successfully.",
      data: order,
    });
  } catch (error) {
    console.error(" Order creation failed:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error while creating order",
    });
  }
};
