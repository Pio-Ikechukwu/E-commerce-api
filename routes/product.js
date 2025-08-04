const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  createProduct,
} = require("../controllers/product");

const { protect } = require("../middleware/auth");
router.route("/").get(getAllProducts).post(protect, createProduct);

router
  .route("/:id")
  .get(getSingleProduct)
  .put(protect, updateProduct)
  .delete(protect, deleteProduct);

module.exports = router;
