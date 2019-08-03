const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const config = require("config");
const bcrypt = require("bcrypt");
const auth = require("../../middleware/auth");
const Company = require("../../models/Company");
// route GET api/authc
// desc get current Company
// access Private
router.get("/", auth, async (req, res) => {
  try {
    const company = await Company.findById(req.company.id).select("-password");
    res.json(company);
  } catch (error) {
    res.status(500).send("Server Error");
  }
});
// route POST api/authc
// desc Authenticate Company and Get token
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
      // See if company exists
      let company = await Company.findOne({ email });
      if (!company) {
        res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
      }
      // match password
      const isMatch = await bcrypt.compare(password, company.password);
      if (!isMatch) {
        res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
      }
      // jsonwebtoken
      const payload = {
        company: {
          id: company.id
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
