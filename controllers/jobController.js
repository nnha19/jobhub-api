const Job = require("../models/Job");

const listJobs = async (req, res) => {
  try {
    const { query } = req.query;
    const jobs = await Job.find();
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
