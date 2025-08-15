const Order = require("../models/Order");
const Cart = require("../models/Cart");

// @route: POST api/orders
// @desc:Create order from cart
// @access: Private
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

    return res.status(201).json({
      success: true,
      message: "Order created successfully.",
      data: order,
    });
  } catch (error) {
    console.error(" Order creation failed:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error while creating order",
    });
  }
};

// @desc Get all orders (admin only)
// @route GET /api/admin/orders
// @access Private/Admin
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("user", "name email");
    return res.status(200).json({
      success: true,
      count: orders.length,
      data: orders,
    });
  } catch (err) {
    console.error("Error fetching all orders:", err);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// @desc Get current user's orders
// @route GET /api/orders
// @access Private
exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id });
    return res
      .status(200)
      .json({ success: true, count: orders.length, data: orders });
  } catch (err) {
    console.error("Get my orders error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// @desc      Get order details
// @route     GET /api/v1/orders/:id
// @access    Private
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("user", "name email")
      .populate("items.product", "title price");

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    return res.status(200).json({ success: true, data: order });
  } catch (err) {
    console.error("Error fetching order:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch the order. Try again.",
    });
  }
};

// @desc      Cancel order
// @route     PUT api/orders/:id/cancel
// @access    Public
exports.cancelOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (order.status === "cancelled") {
      return res.status(400).json({
        success: false,
        message: "Order already cancelled",
      });
    }

    order.status = "cancelled";
    await order.save();

    return res.json({ message: "Order cancelled successfully" });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to cancel the order. Pls try again. ",
    });
  }
};

// @desc      Update order status
// @route     PUT /api/orders/id
// @access    Admin
exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    order.status = status;
    await order.save();

    return res.json({
      success: true,
      message: "Status updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update status",
    });
  }
};
