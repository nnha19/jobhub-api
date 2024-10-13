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

const locationValidation = [
  body("location")
    .exists()
    .withMessage("Location is required")
    .isObject()
    .withMessage("Location must be an object"),

  body("location.city")
    .exists()
    .withMessage("City is required")
    .isString()
    .withMessage("City must be a string"),

  body("location.country")
    .exists()
    .withMessage("Country is required")
    .isString()
    .withMessage("Country must be a string"),

  body("location.address")
    .optional() // Makes address optional
    .isString()
    .withMessage("Address must be a string"),
];

const jobValidator = [
  [
    body("title", "Invalid title").exists().isString(),
    body("description", "Invalid description").exists().isString(),
    body("jobType", "Invalid jobType")
      .exists()
      .isString()
      .isIn(["remote", "on-site", "hybrid"]),
    ...locationValidation,
    salaryValidation,
  ],
  validate,
];

module.exports = jobValidator;
