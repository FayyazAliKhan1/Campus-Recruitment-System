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
  // post_job: [
  //   {
  //     job_name: {
  //       type: String,
  //       required: true
  //     },
  //     eligible_c: {
  //       type: String,
  //       required: true
  //     },
  //     salary: {
  //       type: Number,
  //       required: true
  //     },
  //     description: {
  //       type: String,
  //       required: true
  //     },
  //     date: {
  //       type: Date,
  //       default: Date.now
  //     }
  //   }
  // ],
  date: {
    type: Date,
    default: Date.now
  }
});
module.exports = Company = mongoose.model("company", companySchema);
