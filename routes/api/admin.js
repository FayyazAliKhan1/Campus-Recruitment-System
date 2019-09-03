const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const jwt = require("jsonwebtoken");
const Student = require("../../models/Student");
const Company = require("../../models/Company");
const Applied = require("../../models/Applied");
const Job = require("../../models/Jobs");
const auth = require("../../middleware/auth");
const config = require("config");
// route POST api/admin
// desc Test route
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
      isAdmin = true;
      let admin = await Student.findOne({ email, isAdmin });
      if (admin) {
        res.status(400).json({ errors: [{ msg: "There is already admin" }] });
      }
      // Get Admin gravtar
      const avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm"
      });
      admin = new Student({
        name,
        email,
        password,
        avatar,
        qualification,
        skills,
        address,
        age,
        mobile,
        isAdmin
      });
      const salt = await bcrypt.genSalt(10);
      admin.password = await bcrypt.hash(password, salt);
      await admin.save();
      //return token
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
      res.status(500).send("Server error");
    }
  }
);
// route GET api/admin/students
// desc GET all registered students data
// access private
router.get("/students", auth, async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students.filter(student => student.isAdmin != true));
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});
// route GET api/admin/companies
// desc get all companies
// access private
router.get("/companies", auth, async (req, res) => {
  try {
    const company = await Company.find();
    res.json(company);
  } catch (error) {
    res.status(500).send("Server Error");
  }
});
// route Delete api/admin/std/:std_id
// desc delete student
// access private
router.delete("/std/:std_id", auth, async (req, res) => {
  try {
    await Student.findOneAndRemove({ _id: req.params.std_id });
    await Applied.findByIdAndDelete(req.params.id);
    res.json({ msg: "Student Deleted" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});
// route Delete api/admin/cmp/:cmp_id
// desc delete company
// access private
router.delete("/cmp/:cmp_id", auth, async (req, res) => {
  try {
    await Company.findOneAndRemove({ _id: req.params.cmp_id });
    await Job.findByIdAndDelete(req.params.cmp_id);
    res.json({ msg: "Company Deleted" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});
// route Delete api/admin/jobs/:job_id
// desc delete job
// access private
router.delete("/jobs/:job_id", auth, async (req, res) => {
  try {
    await Job.findOneAndRemove({ _id: req.params.job_id });

    res.json({ msg: "Job Deleted" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});
module.exports = router;
