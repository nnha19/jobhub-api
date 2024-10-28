const mongoose = require("mongoose");

const salarySchema = new mongoose.Schema({
  min: {
    type: Number,
  },
  max: {
    type: Number,
  },
});

const companySchema = new mongoose.Schema({
  logo: {
    type: String,
  },
  name: {
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
  employmentType: {
    type: String,
    enum: ["full-time", "part-time", "internship", "contract", "freelance"],
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
  company: { type: companySchema, required: true },
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
