const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const validate = (method) => {
  switch (method) {
    case "createUser": {
      return [
        body("username", "userName doesn't exists").exists(),
        body("email", "Invalid email").exists().isEmail(),
      ];
    }
  }
};

const registerUser = async (req, res) => {
  const { email, password, username, isRecruiter } = req.body;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.status(400).json({ error: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    ...rest,
    password: hashedPassword,
    email,
    username,
    isRecruiter,
  });

  const token = await jwt.sign({ user }, "MY_SECRET", {
    expiresIn: "1h",
  });

  res.status(201).json({ user, token });
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

    return res.status(200).json({ user, token });
  } catch (err) {
    console.log(err);
    return res.status(500).send("An error occured");
  }
};

module.exports = { registerUser, loginUser, validate };
