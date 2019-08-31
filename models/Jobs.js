const mongoose = require("mongoose");
const jobSchema = mongoose.Schema({
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "companies"
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
});
module.exports = Job = mongoose.model("jobs", jobSchema);
