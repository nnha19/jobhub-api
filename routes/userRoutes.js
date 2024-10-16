const express = require("express");

const userController = require("../controllers/userController");
const {
  registerUserValidation,
  loginUserValidation,
} = require("../validators/userValidator");
const isAuthenticated = require("../middleware/isAuthenticated");

const router = express.Router();

router.post("/register", registerUserValidation, userController.registerUser);
router.post("/login", loginUserValidation, userController.loginUser);

router.use(isAuthenticated);
router.get("/current", userController.getCurrentUser);
module.exports = router;
