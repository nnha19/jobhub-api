const mongoose = require("mongoose");

const jobApplicationCustomDetailsSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },

  lastName: {
    type: String,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  coverLetter: {
    type: String,
    required: true,
  },
  resume: {
    type: String,
    required: true,
  },
});

const jobApplicationSchema = new mongoose.Schema({
  appliedAt: { type: Date, default: Date.now },
  applicantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
  },
  customDetails: {
    type: jobApplicationCustomDetailsSchema,
    required: true,
  },
});

const JobApplication = mongoose.model("JobApplication", jobApplicationSchema);

module.exports = JobApplication;
