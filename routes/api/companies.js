const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const Company = require("../../models/Company");
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

// route GET api/companies/
// desc get current Company
// access Private
// router.get("/", async (req, res) => {
//   try {
//     const company = await Company.findById(req.company.id).select("-password");
//     res.json(company);
//   } catch (error) {
//     res.status(500).send("Server Error");
//   }
// });
// // route POST api/companies
// // desc Authenticate Company and Get token
// // access public
// router.post(
//   "/",
//   [
//     check("email", "Please include a valid email").isEmail(),
//     check("password", "Password is required").exists()
//   ],
//   async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }
//     const { email, password } = req.body;
//     try {
//       // See if company exists
//       let company = await Company.findOne({ email });
//       if (!company) {
//         res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
//       }
//       // match password
//       const isMatch = await bcrypt.compare(password, company.password);
//       if (!isMatch) {
//         res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
//       }
//       // jsonwebtoken
//       const payload = {
//         company: {
//           id: company.id
//         }
//       };
//       jwt.sign(
//         payload,
//         config.get("jwtSecret"),
//         { expiresIn: 360000 },
//         (err, token) => {
//           if (err) throw err;
//           res.json({ token });
//         }
//       );
//     } catch (error) {
//       console.error(error.message);
//       res.status(500).send("Server Error");
//     }
//   }
// );
module.exports = router;
