const express = require("express");
const router = express.Router();
const request = require("request");
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
        return res.json(profile);
      }
      // Create Profile if not
      profile = new Profile(profileFields);
      await profile.save();
      res.json(profile);
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
      profileFields.website = company.website;
      profileFields.location = company.address;
      profileFields.bio = company.description;
      let profile = await Profile.findOne({ company: req.company.id });

      if (profile) {
        profile = await Profile.findOneAndUpdate(
          { company: req.company.id },
          { $set: profileFields },
          { new: true }
        );
        return res.json(profile);
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
// route GET api/profile/me
// desc Get Current Student profile
// access private
// using token
router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ student: req.student.id }).populate(
      "student",
      ["name", "avatar", "qualification"]
    );
    if (!profile) {
      return res.status(400).json({ msg: "There is no Profile for the User" });
    }
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error...");
  }
});
// route GET api/profile/mec
// desc Get Current Company profile
// access private
router.get("/mec", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ company: req.company.id }).populate(
      "company",
      ["name", "country", "avatar", "city"]
    );
    if (!profile) {
      return res.status(400).json({ msg: "There is no Profile for the User" });
    }
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error...");
  }
});

// route GET api/profile/stds
// desc GET all profiles
// access Public
router.get("/stds", async (req, res) => {
  try {
    let profiles = await Profile.find().populate("student", [
      "name",
      "avatar",
      "qualification"
    ]);
    res.json(profiles);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});
// route GET api/profile/cmps
// desc GET all profiles
// access Public
router.get("/cmps", async (req, res) => {
  try {
    const profiles = await Profile.find().populate("company", [
      "name",
      "country",
      "avatar",
      "city"
    ]);
    res.json(profiles);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});
// route GET api/profile/user/:user_id
// desc GET profile by user id
// access Public
router.get("/user/:user_id", async (req, res) => {
  try {
    let profile, profile1;
    profile = await Profile.findOne({
      student: req.params.user_id
    }).populate("students", ["name", "avatar"]);
    if (profile) {
      res.json(profile);
    } else if (!profile) {
      profile1 = await Profile.findOne({
        company: req.params.user_id
      }).populate("companies", ["name", "avatar"]);
      if (!profile1) {
        return res.status(400).json({ msg: "Profile not found" });
      }
      res.json(profile1);
    }
  } catch (error) {
    console.error(error.message);
    if (err.kind == "ObjectId") {
      return res.status(400).json({ msg: "Profile not Found" });
    }
    res.status(500).send("Server Error");
  }
});
// route delete api/profile
// desc Delete profile user
// access Private
router.delete("/", auth, async (req, res) => {
  try {
    //Remove Profile
    await Profile.findOneAndRemove({ student: req.student.id });
    // remove Student
    await Student.findOneAndRemove({ _id: req.student.id });
    res.json({ msg: "Student Profile Deleted" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});
// route delete api/profile/cmp
// desc Delete profile user
// access Private
router.delete("/cmp", auth, async (req, res) => {
  try {
    //Remove Profile
    await Profile.findOneAndRemove({ company: req.company.id });
    // remove Company
    await Company.findOneAndRemove({ _id: req.company.id });
    res.json({ msg: "Company Profile Deleted" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});
// route PUT api/profile/experience
// desc ADD Profile experience
// access Private
router.put(
  "/experience",
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
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      title,
      company,
      location,
      from,
      to,
      current,
      description
    } = req.body;
    const newExp = {
      title,
      company,
      location,
      from,
      to,
      current,
      description
    };
    try {
      const profile = await Profile.findOne({ student: req.student.id });
      if (!profile) {
        return res.status(400).send("No Profile Found");
      }
      profile.experience.unshift(newExp);
      await profile.save();
      res.json(profile);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

// route delete api/profile/experience/exp_id
// desc Delete experience from profile
// access Private
router.delete("/experience/:exp_id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ student: req.student.id });
    if (!profile) {
      return res.status(400).send("No Profile Found");
    }
    const removeIndex = profile.experience
      .map(item => item.id)
      .indexOf(req.params.exp_id);
    profile.experience.splice(removeIndex, 1);
    await profile.save();
    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});
// route PUT api/profile/education
// desc ADD Profile education
// access Private
router.put(
  "/education",
  [
    auth,
    [
      check("school", "School is Required")
        .not()
        .isEmpty(),
      check("degree", "Degree is Required")
        .not()
        .isEmpty(),
      check("fieldofstudy", "Field of study is required")
        .not()
        .isEmpty(),
      check("from", "From date is Required")
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
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description
    } = req.body;
    const newEdu = {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description
    };
    try {
      const profile = await Profile.findOne({ student: req.student.id });
      if (!profile) {
        return res.status(400).send("No Profile Found");
      }
      profile.education.unshift(newEdu);
      await profile.save();
      res.json(profile);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

// route delete api/profile/education/edu_id
// desc Delete education from profile
// access Private
router.delete("/education/:edu_id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ student: req.student.id });
    if (!profile) {
      return res.status(400).send("No Profile Found");
    }
    const removeIndex = profile.education
      .map(item => item.id)
      .indexOf(req.params.edu_id);
    if (removeIndex === -1) {
      return res.status(400).json({ msg: "No such entity" });
    }
    profile.education.splice(removeIndex, 1);
    await profile.save();
    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});
// route Get api/profile/github/:username
// desc Get User Repo from GitHub
// access Public
router.get("/github/:username", async (req, res) => {
  try {
    const options = {
      uri: `https://api.github.com/users/${
        req.params.username
      }/repos?per_page=5&
      sort=created:asc&client_id=${config.get(
        "githubClientId"
      )}&client_secret=${config.get("githubSecret")}`,
      method: "GET",
      headers: { "user-agent": "node.js" }
    };

    request(options, (error, response, body) => {
      if (error) console.error(error);
      if (response.statusCode !== 200) {
        return res.status(400).json({ msg: "No github Profile Found" });
      }
      res.json(JSON.parse(body));
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});
module.exports = router;
