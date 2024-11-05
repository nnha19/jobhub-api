const Job = require("../models/Job");
const SavedJob = require("../models/SavedJob");

const getFilteredJobs = async (filters, page, limit, userId) => {
  const searchCriteria = {};

  if (filters.jobType) searchCriteria.jobType = filters.jobType;
  if (filters.employmentType)
    searchCriteria.employmentType = filters.employmentType;
  if (filters.postedDate)
    searchCriteria.postedDate = { $gte: new Date(filters.postedDate) };
  if (filters.query)
    searchCriteria.title = { $regex: filters.query, $options: "i" };

  const startIndex = (page - 1) * limit;
  const count = await Job.countDocuments(searchCriteria);

  const filteredJobs = await Job.find(searchCriteria)
    .sort({ postedDate: -1 })
    .skip(startIndex)
    .limit(limit)
    .lean();

  const jobsWithIsSavedAttr = await Promise.all(
    filteredJobs.map(async (job) => ({
      ...job,
      isSaved: Boolean(
        await SavedJob.findOne({
          job: job._id,
          user: userId,
        })
      ),
    }))
  );

  return { jobsWithIsSavedAttr, count };
};

module.exports = {
  getFilteredJobs,
};
