const express = require("express");
const jobController = require("../controllers/jobController");
const jobValidator = require("../validators/jobValidator");
const isAuthenticated = require("../middleware/isAuthenticated");
const isRecruiter = require("../middleware/isRecruiter");

const router = express.Router();
router.use(isAuthenticated);

router.get("", jobController.listJobs);
router.get("/:jobId", jobController.retrieveJob);
router.post("", isRecruiter, jobValidator, jobController.createNewJob);

// Toggle Saved job status
router.post("/saved", jobController.toggleSavedJob);

module.exports = router;
