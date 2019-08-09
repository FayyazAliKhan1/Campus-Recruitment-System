const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const jwt = require("jsonwebtoken");
const Admin = require("../../models/Admin");
const Student = require("../../models/Student");
const Company = require("../../models/Company");
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
      min: 8
    })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;
    try {
      let admin = await Admin.findOne({ email });
      if (admin) {
        res.status(400).json({ errors: [{ msg: "There is already admin" }] });
      }
      // Get Admin gravtar
      const avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm"
      });
      admin = new Admin({
        name,
        email,
        password,
        avatar
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
// route GET api/admin
// desc GET all registered students data
// access private
router.get("/", auth, async (req, res) => {
  try {
    const student = await Student.find();
    res.json(student);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});
// route Delete api/admin/std/:std_id
// desc delete student
// access private
router.delete("/std/:std_id", auth, async (req, res) => {
  try {
    await Student.findOneAndRemove({ _id: req.params.std_id });

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
