const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  createProduct,
} = require("../controllers/product");

const { protect, admin } = require("../middleware/auth");
router.route("/").get(getAllProducts).post(protect, admin, createProduct);

router
  .route("/:id")
  .get(getSingleProduct)
  .put(protect, admin, updateProduct)
  .delete(protect, admin, deleteProduct);

module.exports = router;
