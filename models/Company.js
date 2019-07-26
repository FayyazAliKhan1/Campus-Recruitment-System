const mongoose = require("mongoose");
const companySchema = mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "students"
  },
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
  address: {
    type: String,
    required: true
  },
  fields: {
    type: [String],
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});
module.exports = Company = mongoose.model("company", companySchema);
