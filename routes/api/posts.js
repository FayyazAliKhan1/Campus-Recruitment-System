const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
const Job = require("../../models/Jobs");
const Company = require("../../models/Company");

module.exports = router;
