const jwt = require("jsonwebtoken");

const isAuthenticated = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];

  if (!token) return res.status(401).json({ error: "Access denied" });

  try {
    const decoded = jwt.verify(token, "MY_SECRET");
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};

module.exports = isAuthenticated;
