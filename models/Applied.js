const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Applied = new Schema({
  job: {
    type: Schema.Types.ObjectId,
    ref: "jobs"
  },
  job_name: {
    type: String,
    required: true
  },
  student: {
    type: Schema.Types.ObjectId,
    ref: "students"
  },
  skills: {
    type: [String],
    required: true
  },
  student_name: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    required: true
  },
  qualification: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});
module.exports = Applied = mongoose.model("applieds", Applied);
