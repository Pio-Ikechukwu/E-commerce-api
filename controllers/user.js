const User = require("../models/User");

// @desc      Get All Users
// @route     GET api/users
// @access    Admin
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    return res.status(200).json({ success: true, count: users.length, users });
  } catch (err) {
    console.error("Get all users error:", err);
    return res
      .status(500)
      .json({ success: true, message: "Could not fetch users." });
  }
};

// @desc      Get a single user by Id
// @route     GET api/users/id
// access: Admin
exports.getSingleUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }
    return res.status(200).json({ success: true, user });
  } catch (err) {
    console.error("Get user error:", err);
    return res
      .status(500)
      .json({ success: false, message: "Error retrieving user." });
  }
};

// @desc    Get current logged in user
// @route   GET /api/users/me
// @access  Private
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ success: true, data: user });
  } catch (err) {
    console.error("Error getting current user:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
