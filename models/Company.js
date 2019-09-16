const mongoose = require("mongoose");
const companySchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  website: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  address: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  number: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});
module.exports = Company = mongoose.model("companies", companySchema);
