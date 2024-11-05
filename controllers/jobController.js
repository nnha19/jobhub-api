const Job = require("../models/Job");
const SavedJob = require("../models/SavedJob");
const JobApplication = require("../models/JobApplication");
const { getFilteredJobs } = require("../services/jobService");

const listJobs = async (req, res) => {
  try {
    const jobFilters = {
      jobType: req.query.jobType,
      employmentType: req.query.employmentType,
      postedDate: req.query.datePosted,
      query: req.query.query,
    };

    const page = parseInt(req.query.page) || 1;
    const limit = 10;

    const { jobsWithIsSavedAttr, count } = await getFilteredJobs(
      jobFilters,
      page,
      limit,
      req.user._id
    );

    return res.status(200).json({
      page,
      limit,
      count,
      totalPages: Math.ceil(count / limit),
      results: jobsWithIsSavedAttr,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send("An error occured");
  }
};

const createNewJob = async (req, res) => {
  try {
    const job = await Job.create({
      ...req.body,
      recruiter: req.user._id,
    });

    return res.status(201).json(job);
  } catch (err) {
    console.log(err);
    return res.status(500).send("An error occured");
  }
};

const retrieveJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.jobId);
    const currentUserApplication = await JobApplication.findOne({
      jobId: req.params.jobId,
      applicantId: req.user._id,
    }).select("_id");

    if (!job) {
      return res.status(404).send("Job not found");
    }

    return res.status(200).json({
      ...job.toObject(),
      currentUserApplication: currentUserApplication
        ? currentUserApplication._id
        : null,
      isSaved: Boolean(
        await SavedJob.findOne({
          job: req.params.jobId,
          user: req.user._id,
        })
      ),
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send("An error occured");
  }
};

const toggleSavedJob = async (req, res) => {
  try {
    const { jobId } = req.body;
    const userId = req.user._id;

    const alreadySaved = await SavedJob.findOne({ job: jobId, user: userId });

    if (alreadySaved) {
      await SavedJob.findByIdAndDelete(alreadySaved._id);
      return res.status(200).json({ message: "Job unsaved" });
    } else {
      await SavedJob.create({ job: jobId, user: userId });
      return res.status(200).json({ message: "Job saved" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send("An error occured");
  }
};

module.exports = {
  createNewJob,
  listJobs,
  retrieveJob,
  toggleSavedJob,
};
