const express = require("express");
const router = express.Router();
const config = require("config");
const auth = require("../../middleware/auth");
const Profile = require("../../models/Profile");
const Student = require("../../models/Student");
const Company = require("../../models/Company");
const { check, validationResult } = require("express-validator");
// route POST api/profile/student
// desc create and update a student profile
// access private

router.post(
  "/student",
  [
    auth,
    [
      check("status", "Status is required")
        .not()
        .isEmpty(),
      check("skills", "Skills is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    const {
      company_name,
      website,
      bio,
      status,
      githubusername,
      skills,
      youtube,
      facebook,
      twitter,
      instagram,
      linkedin
    } = req.body;
    // build profile object
    const profileFields = {};
    profileFields.student = req.student.id;
    if (company_name) profileFields.company_name = company_name;
    if (website) profileFields.website = website;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;
    if (githubusername) profileFields.githubusername = githubusername;
    if (skills) {
      profileFields.skills = skills.split(",").map(skill => skill.trim());
    }
    profileFields.social = {};
    if (youtube) profileFields.social.youtube = youtube;
    if (twitter) profileFields.social.twitter = twitter;
    if (facebook) profileFields.social.facebook = facebook;
    if (instagram) profileFields.social.instagram = instagram;
    if (linkedin) profileFields.social.linkedin = linkedin;

    try {
      const student = await Student.findById(req.student.id).select(
        "-password"
      );
      profileFields.location = student.address;
      let profile = await Profile.findOne({ student: req.student.id });
      if (profile) {
        profile = await Profile.findOneAndUpdate(
          { student: req.student.id },
          { $set: profileFields },
          { new: true }
        );
        res.json(profile);
      }
      // Create Profile if not
      profile = new Profile(profileFields);
      await profile.save();
      return res.json(profile);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);
// route POST api/profile/company
// desc create and update a Company profile
// access private
router.post(
  "/company",
  [
    auth,
    [
      check("status", "Status is required")
        .not()
        .isEmpty(),
      check("skills", "Skills is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    const {
      status,
      skills,
      youtube,
      facebook,
      twitter,
      instagram,
      linkedin
    } = req.body;
    // build profile object
    const profileFields = {};
    profileFields.company = req.company.id;
    if (status) profileFields.status = status;
    if (skills) {
      profileFields.skills = skills.split(",").map(skill => skill.trim());
    }
    profileFields.social = {};
    if (youtube) profileFields.social.youtube = youtube;
    if (twitter) profileFields.social.twitter = twitter;
    if (facebook) profileFields.social.facebook = facebook;
    if (instagram) profileFields.social.instagram = instagram;
    if (linkedin) profileFields.social.linkedin = linkedin;

    try {
      const company = await Company.findById(req.company.id).select(
        "-password"
      );
      profileFields.company_name = company.name;
      profileFields.website = company.website;
      profileFields.location = company.address;
      profileFields.bio = company.description;
      let profile = await Profile.findOne({ student: req.student.id });

      if (profile) {
        profile = await Profile.findOneAndUpdate(
          { company: req.company.id },
          { $set: profileFields },
          { new: true }
        );
        res.json(profile);
      }
      // Create Profile if not
      profile = new Profile(profileFields);
      await profile.save();
      return res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);
module.exports = router;
