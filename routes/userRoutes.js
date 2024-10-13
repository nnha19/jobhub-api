const express = require("express");

const userController = require("../controllers/userController");
const {
  registerUserValidation,
  loginUserValidation,
} = require("../validators/userValidator");

const router = express.Router();

router.post("/register", registerUserValidation, userController.registerUser);

router.post("/login", loginUserValidation, userController.loginUser);

module.exports = router;
