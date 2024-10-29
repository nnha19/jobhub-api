const Job = require("../models/Job");

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

    const jobs = await Job.find(searchCriteria).sort({ postedDate: -1 });
    return res.status(200).json(jobs);
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

module.exports = {
  createNewJob,
  listJobs,
};
