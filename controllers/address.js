const Address = require("../models/Address");

// @desc      Add address
// @route     POST api/addresses
// @access    Public
exports.addAddress = async (req, res) => {
  try {
    const { label, street, city, state, country, isDefault, zipCode } =
      req.body;

    const userId = req.user.id;
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    const address = await Address.create({
      userId,
      label,
      street,
      city,
      state,
      country,
      isDefault,
      zipCode,
    });

    return res.status(201).json({ success: true, data: address });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ success: false, message: "Unable to add address." });
  }
};

// @desc      Get All Addresses
// @route     GET api/addresses
// @access    Admin
exports.getAllAddresses = async (req, res) => {
  try {
    const addresses = await Address.find();
    return res.json({ success: true, data: addresses });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Unable to get all addresses" });
  }
};

// @desc      Update address
// @route     PUT api/addresses/:id
// @access    Admin
exports.updateAddress = async (req, res) => {
  try {
    const address = await Address.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!address) {
      return res
        .status(404)
        .json({ success: false, message: "Address not found" });
    }
    return res.status(200).json({ success: true, data: address });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ success: false, message: "Unable to update the address" });
  }
};

// @desc      Get single address by id
// @route     GET api/addresses/:id
// @access    Admin
exports.getSingleAddress = async (req, res) => {
  try {
    const address = await Address.findById(req.params.id);
    if (!address) {
      return res
        .status(404)
        .json({ success: false, message: "Address not found" });
    }

    return res.status(200).json({ success: true, data: address });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Unable to find the specific address.",
    });
  }
};

// @desc      Delete address
// @route     DELETE api/address/:id
// @access    Admin
exports.deleteAddress = async (req, res) => {
  try {
    const address = await Address.findByIdAndDelete(req.params.id);

    if (!address) {
      return res
        .status(404)
        .json({ success: false, message: "Address not found" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Unable to delete address",
    });
  }
};
