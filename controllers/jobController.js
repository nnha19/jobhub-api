const Job = require("../models/Job");
const JobApplication = require("../models/JobApplication");

const listJobs = async (req, res) => {
  try {
    const jobFilters = {
      jobType: req.query.jobType,
      employmentType: req.query.employmentType,
      postedDate: req.query.datePosted,
      query: req.query.query,
    };

    const searchCriteria = {};

    if (jobFilters.jobType) searchCriteria.jobType = jobFilters.jobType;
    if (jobFilters.employmentType)
      searchCriteria.employmentType = jobFilters.employmentType;
    if (jobFilters.postedDate)
      searchCriteria.postedDate = { $gte: new Date(jobFilters.postedDate) };
    if (jobFilters.query)
      searchCriteria.title = { $regex: jobFilters.query, $options: "i" };

    const page = parseInt(req.query.page) || 1;
    const limit = 10;

    const startIndex = (page - 1) * limit;
    const count = await Job.countDocuments(searchCriteria);

    const filteredJobs = await Job.find(searchCriteria)
      .sort({ postedDate: -1 })
      .skip(startIndex)
      .limit(limit);

    return res.status(200).json({
      page,
      limit,
      count,
      totalPages: Math.ceil(count / limit),
      results: filteredJobs,
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
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send("An error occured");
  }
};

module.exports = {
  createNewJob,
  listJobs,
  retrieveJob,
};
