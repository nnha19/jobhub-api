const validate = require("../middleware/validator");
const body = require("express-validator").body;

const salaryValidation = body("salary")
  .optional()
  .isObject()
  .withMessage("Invalid salary object")
  .custom((value) => {
    // Check if min and max are present
    if (!value.min || !value.max) {
      throw new Error("Both min and max salary must be provided");
    }
    // Check if min and max are numbers
    if (typeof value.min !== "number" || typeof value.max !== "number") {
      throw new Error("Both min and max salary must be numeric");
    }
    // Optionally, check if min is less than max
    if (value.min >= value.max) {
      throw new Error("Min salary must be less than max salary");
    }
    return true;
  });

const companyValidation = [
  body("company").exists(),
  body("company.name").exists().isString(),
  body("company.address").exists().isString(),
  body("company.logo").optional().isString(),
];

const jobValidator = [
  [
    body("title", "Invalid title").exists().isString(),
    body("description", "Invalid description").exists().isString(),
    body("jobType", "Invalid jobType")
      .exists()
      .isString()
      .isIn(["remote", "on-site", "hybrid"]),
    salaryValidation,
    ...companyValidation,
  ],
  validate,
];

module.exports = jobValidator;
