const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const Student = require("../../models/Student");
// route GET api/auth
// desc Test route
// access public
router.get("/", auth, async (req, res) => {
  try {
    const student = await Student.findById(req.student.id).select("-password");
    res.json(student);
  } catch (error) {
    res.status(500).send("Server Error");
  }
});
module.exports = router;
