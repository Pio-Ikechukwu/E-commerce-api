const Product = require("../models/Product");

// @desc    Create new product
// @route   POST /api/products
// @access  Admin
exports.createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    return res.status(201).json({ success: true, data: product });
  } catch (err) {
    console.log("Create product error:", err);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server error" });
  }
};

// @desc    Get all products
// @route   GET /api/products
// @access  Public
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("categoryId", "name");
    return res.status(200).json({ success: true, data: products });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Failed to fetch products" });
  }
};

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
exports.getSingleProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate(
      "categoryId",
      "name"
    );
    if (!product)
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    return res.status(200).json({ success: true, data: product });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong. Check ur input and try again",
    });
  }
};

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private (admin)
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!product)
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    return res.status(200).json({ success: true, data: product });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong." });
  }
};

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private (admin)
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product)
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    return res.status(200).json({ success: true, message: "Product deleted" });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Product failed to delete" });
  }
};
