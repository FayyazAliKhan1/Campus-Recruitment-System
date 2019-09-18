const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const Applied = require("../../models/Applied");
const Job = require("../../models/Jobs");
const { check, validationResult } = require("express-validator");

// route GET api/jobs/comp1
// desc get all Jobs by of 1 company
// access private
router.get("/comp1", auth, async (req, res) => {
  try {
    const jobs = await Job.find({ company: req.company.id }).populate(
      "company",
      ["name", "website"]
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
// route GeT api/jobs
// desc Get all jobs posted by companies
// access public
router.get("/", async (req, res) => {
  try {
    const jobs = await Job.find().populate("company", ["name", "website"]);
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
      "company",
      ["name", "website"]
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
// desc delete job by id
// access private
router.delete("/:job_id", auth, async (req, res) => {
  try {
    await Job.findByIdAndDelete(req.params.job_id);
    await Applied.findByIdAndDelete(req.params.job_id);
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
