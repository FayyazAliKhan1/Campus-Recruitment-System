module.exports = function(req, res, next) {
  if (!req.student.isAdmin) {
    return res.status(403).json({ msg: "access denied" });
  }
  next();
};
