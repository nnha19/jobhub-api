const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  joinedDate: {
    type: Date,
    default: Date.now,
  },
  isRecruiter: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("User", userSchema);
