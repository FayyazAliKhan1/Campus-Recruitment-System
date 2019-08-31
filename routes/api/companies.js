const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const Company = require("../../models/Company");
const auth = require("../../middleware/auth");
const Student = require("../../models/Student");
const Job = require("../../models/Jobs");
const gravatar = require("gravatar");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");
// route POST api/companies
// desc Register Company
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
    check("website", "Website is Required")
      .not()
      .isEmpty(),
    check("address", "Address is Required")
      .not()
      .isEmpty(),
    check("country", "country is Required")
      .not()
      .isEmpty(),
    check("city", "city is Required")
      .not()
      .isEmpty(),
    check("number", "number is Required")
      .not()
      .isEmpty(),
    check("description", "Description is Required")
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
      website,
      address,
      country,
      city,
      number,
      description
    } = req.body;
    try {
      // See if company exists
      let company = await Company.findOne({ email });
      if (company) {
        res.status(400).json({ errors: [{ msg: "Company already Exists" }] });
      }
      // Get company gravtar
      const avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm"
      });
      company = new Company({
        name,
        email,
        password,
        website,
        avatar,
        address,
        country,
        city,
        number,
        description
      });
      // Encrypt password
      const salt = await bcrypt.genSalt(10);
      company.password = await bcrypt.hash(password, salt);

      await company.save();

      // Return jsonwebtoken
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
// route POST api/companies/post_job
// desc Create/Post Job
// access private
router.post(
  "/post_job",
  [
    auth,
    [
      check("job_name", "Job Name is Required")
        .not()
        .isEmpty(),
      check("eligible_c", "Eligibility is Required")
        .not()
        .isEmpty(),
      check("salary", "Salary is Required")
        .not()
        .isEmpty(),
      check("description", "Description is Required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { job_name, eligible_c, salary, description } = req.body;
    try {
      let job = await Job.findOne({ company: req.company.id, job_name });

      if (job) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Job already Exists" }] });
      }
      job = new Job({
        job_name,
        eligible_c,
        salary,
        description,
        company: req.company.id
      }).populate("companies", ["name"]);
      await job.save();
      res.json(job);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

// route GET api/companies/students
// desc GET all registered students data
// access private
router.get("/students", auth, async (req, res) => {
  try {
    const student = await Student.find();
    res.json(student);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});
// route GET api/companies/app_students/:job_id
// desc View applied students
// access private

// router.get('/app_students/:job_id', auth, (req, res) => {
//   try {
//     const job = await Job.findById(req.student.id)
//     const student = await Student.find()
//   } catch (error) {
//     console.error(error.message)
//     res.status(500).send('Server error')
//   }
// })
module.exports = router;
