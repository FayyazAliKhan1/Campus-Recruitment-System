const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const Student = require("../../models/Student");
const gravatar = require("gravatar");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");
// route POST api/students
// desc Register Student
// access public
router.post(
  "/",
  [
    check("name", "Name is Required")
      .not()
      .isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password of minimum 6 characters"
    ).isLength({
      min: 6
    }),
    check("qualification", "Qualification is Required")
      .not()
      .isEmpty(),
    check("address", "Address is Required")
      .not()
      .isEmpty(),
    check("skills", "skills is Required")
      .not()
      .isEmpty(),
    check("age", "Age is Required")
      .not()
      .isEmpty(),
    check("mobile", "Mobile is Required")
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      name,
      email,
      password,
      qualification,
      address,
      skills,
      age,
      mobile
    } = req.body;
    try {
      // See if student exists
      let student = await Student.findOne({ email });
      if (student) {
        res.status(400).json({ errors: [{ msg: "Student already Exists" }] });
      }
      // Get students gravtar
      const avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm"
      });
      student = new Student({
        name,
        email,
        password,
        avatar,
        qualification,
        skills,
        address,
        age,
        mobile
      });
      // Encrypt password
      const salt = await bcrypt.genSalt(10);
      student.password = await bcrypt.hash(password, salt);

      await student.save();

      // Return jsonwebtoken
      const payload = {
        student: {
          id: student.id
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
// route GET api/students/get-companies
// desc Student view companies
// access public
router.get("/get-companies", async (req, res) => {
  try {
    const company = await Company.find();
    res.json(company);
  } catch (error) {
    res.status(500).send("Server Error");
  }
});
module.exports = router;
