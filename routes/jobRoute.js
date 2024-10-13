const express = require("express");
const jobController = require("../controllers/jobController");
const jobValidator = require("../validators/jobValidator");
const isAuthenticated = require("../middleware/isAuthenticated");

const router = express.Router();
router.use(isAuthenticated);

router.get("", jobController.listJobs);
router.post("", jobValidator, jobController.createNewJob);

module.exports = router;
