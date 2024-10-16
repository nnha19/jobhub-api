const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const registerUser = async (req, res) => {
  const { email, password, username, userType } = req.body;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.status(400).json({ error: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    password: hashedPassword,
    email,
    username,
    userType,
  });

  const token = await jwt.sign({ user }, "MY_SECRET", {
    expiresIn: "1h",
  });

  res.status(201).json({ ...user.toJSON(), token });
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(401)
        .json({ error: "User with the provided email doesn't exist." });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(401).json({ error: "Incorrect password" });
    }

    const token = await jwt.sign({ user }, "MY_SECRET", {
      expiresIn: "1h",
    });

    delete user.password;

    return res.status(200).json({ ...user.toJSON(), token });
  } catch (err) {
    console.log(err);
    return res.status(500).send("An error occured");
  }
};

const getCurrentUser = async (req, res) => {
  try {
    const user = req.user;
    delete user.password;
    return res.status(200).json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).send("An error occured");
  }
};

module.exports = { registerUser, loginUser, getCurrentUser };
