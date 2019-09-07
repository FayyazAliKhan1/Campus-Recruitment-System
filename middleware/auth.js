const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function(req, res, next) {
  // Get Token from header
  const token = req.header("x-auth-token");
  //Check if there's no token
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }
  //Verify token
  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    if (decoded.student) {
      req.student = decoded.student;
    } else if (decoded.company) {
      req.company = decoded.company;
    }

    next();
  } catch (error) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
