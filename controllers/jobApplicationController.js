const Job = require("../models/Job");
const jobEmail = require("../services/emailServices/jobEmails");

const JobApplication = require("../models/JobApplication");

const createJobApplication = async (req, res) => {
  try {
    const { jobId } = req.params;
    const jobApplication = await JobApplication.create({
      ...req.body,
      jobId,
      applicantId: req.user._id,
    });

    const job = await Job.findOne({
      _id: jobId,
    });

    // Send email to recruiter about new job application
    jobEmail.sendNewJobApplicationEmailToRecruiter(jobId, jobApplication);

    return res.status(201).json(jobApplication);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

module.exports = {
  createJobApplication,
};
