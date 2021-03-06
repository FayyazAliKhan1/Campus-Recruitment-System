const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const Student = require("../../models/Student");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const config = require("config");
const bcrypt = require("bcrypt");
// route GET api/auth
// desc Test route
// access public
router.get("/", auth, async (req, res) => {
  const token = req.header("x-auth-token");
  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    if (decoded.student) {
      const student = await Student.findById(req.student.id).select(
        "-password"
      );
      res.json(student);
    } else if (decoded.company) {
      const company = await Company.findById(req.company.id).select(
        "-password"
      );
      res.json(company);
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error");
  }
});

// route POST api/auth
// desc Authenticate Student and Get token
// access public
router.post(
  "/",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    let isAdmin = true;
    try {
      let student = await Student.findOne({ email });
      let company = await Company.findOne({ email });
      if (!student && !company) {
        res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
      } else {
        if (student) {
          // match password
          const isMatch = await bcrypt.compare(password, student.password);
          if (!isMatch) {
            res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
          }
          // jsonwebtoken
          const payload = {
            student: {
              id: student.id,
              isAdmin: student.isAdmin
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
        } else if (company) {
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
        }
      }
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);
module.exports = router;
