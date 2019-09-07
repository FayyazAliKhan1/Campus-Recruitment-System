const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("config");
const StudentSchema = new mongoose.Schema({
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
  age: { type: Number, min: 18, max: 27 },
  mobile: {
    type: String,
    required: true
  },
  address: {
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
  isAdmin: Boolean,
  date: {
    type: Date,
    default: Date.now
  }
});
// const payload = {
//   student: {
//     id: this._id,
//     isAdmin: this.isAdmin
//   }
// };
// StudentSchema.methods.generateAuthToken = function() {
//   jwt.sign(
//     payload,
//     config.get("jwtSecret"),
//     { expiresIn: 360000 },
//     (err, token) => {
//       if (err) throw err;
//       return token;
//     }
//   );
// };
module.exports = Student = mongoose.model("students", StudentSchema);
