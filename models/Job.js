const mongoose = require("mongoose");

const salarySchema = new mongoose.Schema({
  min: {
    type: Number,
    required: true,
  },
  max: {
    type: Number,
    required: true,
  },
});

const locationSchema = new mongoose.Schema({
  city: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  address: {
    type: String,
  },
});

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  jobType: {
    type: String,
    enum: ["remote", "on-site", "hybrid"],
    required: true,
  },
  recruiter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  salary: {
    type: salarySchema,
  },
  location: locationSchema,
  postedDate: {
    type: Date,
    default: Date.now,
  },
  applicants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  requiredSkills: {
    type: [String],
  },
  queries: {
    type: [String],
  },
});

module.exports = mongoose.model("Job", jobSchema);

const DUMMY_JOB = {
  title: "Software Engineer",
  jobType: "remote",
  recruiter: "60a3f5f4e5b2b3f5b8b3f5b8",
  description: "Develop software applications",
  salary: {
    min: 3000,
    max: 5000,
  },
  location: {
    city: "Singapore",
    country: "Singapore",
  },
  skillsRequired: ["Node.js", "React"],
  queries: [
    "What is your experience with Node.js?",
    "What is your experience with React?",
  ],
  requiredSkills: ["Node.js", "React", "Express.js"],
};
