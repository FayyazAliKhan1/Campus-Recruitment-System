const mongoose = require("mongoose");
const jobSchema = mongoose.Schema({
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "company"
  },
  job_name: {
    type: String,
    required: true
  },
  eligible_c: {
    type: String,
    required: true
  },
  salary: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
  // experience: [
  //   {
  //     title: {
  //       type: String,
  //       required: true
  //     },
  //     company: {
  //       type: String,
  //       required: true
  //     },
  //     location: {
  //       type: String
  //     },
  //     from: {
  //       type: Date,
  //       required: true
  //     },
  //     to: {
  //       type: Date
  //     },
  //     current: {
  //       type: Boolean,
  //       default: false
  //     },
  //     description: {
  //       type: String
  //     }
  //   }
  // ],
});
module.exports = Job = mongoose.model("jobs", jobSchema);
