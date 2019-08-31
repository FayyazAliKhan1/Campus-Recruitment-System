const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const Company = require("../../models/Company");
const Job = require("../../models/Jobs");
const { check, validationResult } = require("express-validator");
//route GET api/jobs/vacancy
//desc GET current job posted by company
// access private
// router.get("/vacancy", auth, async (req, res) => {
//   try {
//     const job = await Job.findOne({ company: req.company.id }).populate(
//       "companies",
//       ["name", "avatar"]
//     );
//     if (!job) {
//       res.status(400).json({ msg: "There is no job posted by this company" });
//     }
//     res.json(job);
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).send("Server error");
//   }
// });

// route GET api/jobs/comp1
// desc get all Jobs by of 1 company
// access private
router.get("/comp1", auth, async (req, res) => {
  try {
    const jobs = await Job.find({ company: req.company.id }).populate(
      "companies",
      ["name", "avatar"]
    );
    if (!jobs) {
      return res
        .status(400)
        .json({ msg: "There is no Job Vacancy Posted by this company" });
    }
    res.json(jobs);
  } catch (error) {
    console.error(error.message);
    if (error.kind == "ObjectId") {
      return res.status(400).json({ msg: "Job not found" });
    }
    res.status(500).send("Server error");
  }
});
// route POST api/jobs/:job_id
// desc update Job
// access private
router.put(
  "/:job_id",
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
    // const jobFields = {};
    // jobFields.company = req.company.id;
    // if (job_name) jobFields.job_name = job_name;
    // if (eligible_c) jobFields.eligible_c = eligible_c;
    // if (salary) jobFields.salary = salary;
    // if (description) jobFields.description = description;
    const newJob = {
      job_name,
      eligible_c,
      salary,
      description
    };
    try {
      let job = await Job.findOneAndUpdate(
        {
          _id: req.params.job_id
        },
        { $set: newJob },
        { new: true }
      ); //look for a job by the company

      res.json(job);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);
// route GeT api/jobs
// desc Get all jobs posted by companies
// access public
router.get("/", async (req, res) => {
  try {
    const jobs = await Job.find();
    //.populate("companies", ["name", "avatar"]);
    res.json(jobs);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

// route GeT api/jobs/comp/:comp_id
// desc Get job posted by company using company ID
// access public
router.get("/comp/:comp_id", async (req, res) => {
  try {
    const job = await Job.findOne({ company: req.params.comp_id }).populate(
      "companies",
      ["name", "avatar"]
    );
    if (!job) {
      return res
        .status(400)
        .json({ msg: "There is no Job Vacancy Posted by this company" });
    }
    res.json(job);
  } catch (error) {
    console.error(error.message);
    if (error.kind == "ObjectId") {
      return res.status(400).json({ msg: "Job not found" });
    }
    res.status(500).send("Server error");
  }
});
// route Delete api/jobs/:job_id
// desc Route for company to delete it's job by id
// access private
router.delete("/:job_id", auth, async (req, res) => {
  try {
    await Job.findByIdAndDelete(req.params.job_id);
    res.json({ msg: "Job deleted" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});
// route Delete api/jobs/deleteall
// desc Route for company to delete it's all jobs by id
// access private
router.delete("/deleteall", auth, async (req, res) => {
  try {
    await Job.deleteMany({ company: req.company.id });

    res.json({ msg: "Deleted" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});
module.exports = router;
