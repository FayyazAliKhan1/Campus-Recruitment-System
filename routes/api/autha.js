const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const Admin = require("../../models/Admin");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const config = require("config");
// route GET api/authc
// desc admin
// access Private
router.get("/", auth, async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin.id).select("-password");
    res.json(admin);
  } catch (error) {
    res.status(500).send("Server Error");
  }
});
// route POST api/autha
// desc Authenticate Admin and Get token
// access public
router.post(
  "/",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is not valid").exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      // See if admin exists
      let admin = await Admin.findOne({ email });
      if (!admin) {
        res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
      }
      // match password
      const isMatch = await bcrypt.compare(password, admin.password);
      if (!isMatch) {
        res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
      }
      // jsonwebtoken
      const payload = {
        admin: {
          id: admin.id
        }
      };
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);
module.exports = router;
