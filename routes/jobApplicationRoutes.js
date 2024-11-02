const express = require("express");
const jobApplicationController = require("../controllers/jobApplicationController");
const isAuthenticated = require("../middleware/isAuthenticated");

const router = express.Router();
router.use(isAuthenticated);

router.post("/:jobId", jobApplicationController.createJobApplication);

module.exports = router;
