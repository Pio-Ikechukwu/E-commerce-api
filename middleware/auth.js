const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  let token;

  // Check if auth header is there and starts with 'Bearer'
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;

      next();
    } catch (err) {
      console.error("JWT validation failed:", err);
      return res.status(401).json({ message: "Token is invalid" });
    }
  } else {
    res.status(401).json({ message: "Token required" });
  }
};

module.exports = { protect };
