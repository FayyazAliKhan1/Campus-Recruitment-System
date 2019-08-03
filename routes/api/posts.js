const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
const Job = require("../../models/Jobs");
const Company = require("../../models/Company");
// route POST api/posts
// desc Post job
// access private
router.post(
  "/",
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
      check("vacancy", "Vacancy is Required")
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
      let job = await Job.findOne({ name });
      if (job) {
        res.status(400).json({ errors: [{ msg: "Job already Exists" }] });
      }
      job = new Job({
        job_name,
        eligible_c,
        salary,
        description
      });
      await job.save();
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);
module.exports = router;
