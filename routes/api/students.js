const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const Student = require("../../models/Student");
const Job = require("../../models/Jobs");
const Company = require("../../models/Company");
const gravatar = require("gravatar");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../../middleware/auth");

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
// access private
// router.get("/get-companies", auth, async (req, res) => {
//   try {
//     const company = await Company.find();
//     res.json(company);
//   } catch (error) {
//     res.status(500).send("Server Error");
//   }
// });
// route POST api/students/apply-job/:job_id
// desc apply for job
// access private
router.put(
  "/apply-job/:job_id",
  [
    auth,
    [
      check("title", "Title is Required")
        .not()
        .isEmpty(),
      check("company", "Company is Required")
        .not()
        .isEmpty(),
      check("from", "From date is Required")
        .not()
        .isEmpty(),
      check("skills", "Skills is Required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      skills,
      title,
      location,
      company,
      from,
      to,
      description
    } = req.body;
    const newa = {
      skills
    };
    const newExp = {
      title,
      location,
      company,
      from,
      to,
      description
    };
    try {
      const job = await Job.findById(req.params.job_id).populate("students", [
        "name",
        "avatar"
      ]);
      if (
        job.apply.filter(app => app.student.toString() === req.student.id)
          .length > 0
      ) {
        return res
          .status(400)
          .json({ msg: "you have already applied this job" });
      }
      job.apply.unshift(newa);
      //job.apply.experience.unshift(newExp);
      await job.save();
      res.json(job.apply);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);
// route POST api/students/companies
// desc view all companies
// access private
router.get("/companies", auth, async (req, res) => {
  try {
    const comp = await Company.find();
    res.json(comp);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});
module.exports = router;
