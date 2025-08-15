const Category = require("../models/Category");

// @desc      Create new category
// @route     POST/api/v1/categories
// @access    Admin
exports.createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    const category = await Category.create({ name });

    return res.status(201).json({ success: true, data: category });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to create category. Try again.",
    });
  }
};

// @desc      Get all categories
// @route     GET/api/v1/categories
// @access    Public
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    return res.status(200).json({ success: true, data: categories });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch all categories. Try again",
    });
  }
};

// @desc      Get single category
// @route     GET/api/v1/categories/:id
// @access    Public
exports.getSingleCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }
    return res.status(200).json({ success: true, data: category });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch the category. Try again",
    });
  }
};

// @desc      Update category
// @route     PUT/api/v1/categories/:id
// @access    Admin
exports.updateCategory = async (req, res) => {
  try {
    const { name } = req.body;

    const category = await Category.findByIdAndUpdate(
      req.params.id,
      { name },
      { new: true, runValidators: true }
    );

    if (!category) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }
    return res.status(200).json({ success: true, data: category });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to update the category. Try again",
    });
  }
};

// @desc      Delete category
// @route     DELETE/api/v1/categories/:id
// @access    Admin
exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);

    if (!category) {
      return res.status(404).json({ success: false, message: "Category not found" });
    }
    return res.status(200).json({ success: true, message: "Successfully deleted" });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to delete the category. Try again",
    });
  }
};
