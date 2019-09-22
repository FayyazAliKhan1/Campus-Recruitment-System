const express = require("express");
const router = express.Router();
const Student = require("../../models/Student");
const Company = require("../../models/Company");
const Applied = require("../../models/Applied");
const Profile = require("../../models/Profile");
const auth = require("../../middleware/auth");
const admin = require("../../middleware/admin");

// route Delete api/admin/std/:std_id
// desc delete student
// access private
router.delete("/std/:std_id", [auth, admin], async (req, res) => {
  try {
    await Student.findOneAndRemove({ _id: req.params.std_id });
    await Profile.findOneAndRemove(req.params.std_id);
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
router.delete("/cmp/:cmp_id", [auth, admin], async (req, res) => {
  try {
    await Company.findOneAndRemove({ _id: req.params.cmp_id });
    await Profile.findOneAndRemove(req.params.cmp_id);
    await Profile.findByIdAndDelete(req.params.cmp_id);
    res.json({ msg: "Company Deleted" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});
// route Delete api/admin/jobs/:job_id
// desc delete job
// access private
router.delete("/jobs/:job_id", [auth, admin], async (req, res) => {
  try {
    await Job.findOneAndRemove({ _id: req.params.job_id });

    res.json({ msg: "Job Deleted" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});
// route GET api/admin/user/:user_id
// desc GET profile by user id
// access Public
router.get("/user/:user_id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.user_id).select(
      "-password"
    );
    if (student) {
      return res.json(student);
    } else if (!student) {
      const company = await Company.findById(req.params.user_id).select(
        "-password"
      );
      if (!company) {
        return res.status(400).json({ msg: "User not found" });
      }
      res.json(company);
    }
  } catch (error) {
    console.error(error.message);
    if (err.kind == "ObjectId") {
      return res.status(400).json({ msg: "User not Found" });
    }
    res.status(500).send("Server Error");
  }
});

module.exports = router;
