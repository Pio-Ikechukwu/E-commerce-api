const express = require("express");
const router = express.Router();
const {
  getAllCategories,
  getSingleCategory,
  updateCategory,
  deleteCategory,
  createCategory,
} = require("../controllers/category");

const { protect, admin } = require("../middleware/auth");

router.route("/").get(getAllCategories).post(protect, admin, createCategory);

router
  .route("/:id")
  .get(getSingleCategory)
  .put(protect, admin, updateCategory)
  .delete(protect, admin, deleteCategory);

module.exports = router;
