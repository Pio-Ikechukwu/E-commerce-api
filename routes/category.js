const express = require("express");
const router = express.Router();
const {
  getAllCategories,
  getSingleCategory,
  updateCategory,
  deleteCategory,
  createCategory,
} = require("../controllers/category");

const { protect } = require("../middleware/auth");

router.route("/").get(getAllCategories).post(protect, createCategory);

router
  .route("/:id")
  .get(getSingleCategory)
  .put(protect, updateCategory)
  .delete(protect, deleteCategory);

module.exports = router;
