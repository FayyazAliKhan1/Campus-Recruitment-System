const express = require("express");
const router = express.Router();
const Student = require("../../models/Student");
const Company = require("../../models/Company");
const Applied = require("../../models/Applied");
const Job = require("../../models/Jobs");
const auth = require("../../middleware/auth");
const admin = require("../../middleware/admin");

// route GET api/admin/students
// desc GET all registered students data
// access private
router.get("/students", [auth, admin], async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students.filter(student => student.isAdmin !== true));
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});
// route GET api/admin/companies
// desc get all companies
// access private
router.get("/companies", [auth, admin], async (req, res) => {
  try {
    const company = await Company.find();
    res.json(company);
  } catch (error) {
    res.status(500).send("Server Error");
  }
});
// route GET api/admin/applieds
// desc get all applieds
// access private
router.get("/applieds", [auth, admin], async (req, res) => {
  try {
    const std_app = await Applied.find().populate("student", [
      "name",
      "avatar"
    ]);
    res.json(std_app);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

// route Delete api/admin/std/:std_id
// desc delete student
// access private
router.delete("/std/:std_id", [auth, admin], async (req, res) => {
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
router.delete("/cmp/:cmp_id", [auth, admin], async (req, res) => {
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
router.delete("/jobs/:job_id", [auth, admin], async (req, res) => {
  try {
    await Job.findOneAndRemove({ _id: req.params.job_id });

    res.json({ msg: "Job Deleted" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});
// route Delete api/admin/:app_std
// desc delete job
// access private
// router.delete("/:app_std", [auth, admin], async (req, res) => {
//   try {
//     await Applied.findOneAndRemove({ _id: req.params.app_std });

//     res.json({ msg: "Apply Student Deleted" });
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).send("Server error");
//   }
// });
module.exports = router;
