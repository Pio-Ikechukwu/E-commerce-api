const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  label: { type: String, maxlength: 50 },
  street: { type: String, required: true },
  city: { type: String },
  state: { type: String, required: true },
  country: { type: String, required: true },
  zipCode: { type: String, required: true },
  isDefault: { type: Boolean, default: false },
});

const Address = mongoose.model("Address", addressSchema);

module.exports = Address;
