const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const colors = require("colors");
// Load env vars
dotenv.config({ path: "./config/config.env" });

// Connect to MongoDB
connectDB();

// Route files
const auth = require("./routes/auth");
const user = require("./routes/user");
const product = require("./routes/product");
const category = require("./routes/category");
const cart = require("./routes/cart");
const order = require("./routes/order");

const app = express();
app.use(express.json());

// Mount routes
app.use("/api/auth", auth);
app.use("/api/users", user);
app.use("/api/products", product);
app.use("/api/categories", category);
app.use("/api/cart", cart);
app.use("/api/orders", order);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(
    ` Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
      .bold
  )
);
