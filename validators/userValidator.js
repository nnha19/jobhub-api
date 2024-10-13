const validate = require("../middleware/validator");
const body = require("express-validator").body;

const loginUserValidation = [
  [
    body("email", "Invalid email").exists().isEmail(),
    body("password", "password doesn't exists").exists(),
  ],
  validate,
];

const registerUserValidation = [
  [
    ...loginUserValidation,
    body("password", "password doesn't exists").exists(),
  ],
  validate,
];

module.exports = {
  registerUserValidation,
  loginUserValidation,
};
