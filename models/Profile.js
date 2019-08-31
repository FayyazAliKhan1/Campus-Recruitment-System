const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "students"
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "companies"
  },
  company_name: {
    type: String
  },
  website: {
    type: String
  },
  higherfor: {
    type: String
  },
  status: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  skills: {
    type: [String],
    required: true
  },
  bio: {
    type: String
  },
  githubusername: {
    type: String
  },
  experience: [
    {
      title: {
        type: String,
        required: true
      },
      company: {
        type: String,
        required: true
      },
      location: {
        type: String
      },
      from: {
        type: Date,
        required: true
      },
      to: {
        type: Date
      },
      current: {
        type: Boolean,
        default: false
      },
      description: {
        type: String
      }
    }
  ],
  // image: {
  //   data: Buffer,
  //   ContentType: String
  // },
  // criteria: {
  //   type: String
  // },
  // lastDate: {
  //   type: Date
  // },
  // interviewDate: {
  //   type: Date
  // },
  // bond: Number
  education: [
    {
      school: {
        type: String,

        required: true
      },

      degree: {
        type: String,

        required: true
      },

      fieldofstudy: {
        type: String,

        required: true
      },

      from: {
        type: Date,

        required: true
      },

      to: {
        type: Date
      },

      current: {
        type: Boolean,

        default: false
      },

      description: {
        type: String
      }
    }
  ],
  social: {
    youtube: {
      type: String
    },

    twitter: {
      type: String
    },

    facebook: {
      type: String
    },

    linkedin: {
      type: String
    },

    instagram: {
      type: String
    }
  },

  date: {
    type: Date,

    default: Date.now
  }
});
module.exports = Profile = mongoose.model("profile", profileSchema);
