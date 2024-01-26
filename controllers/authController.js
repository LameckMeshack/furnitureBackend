const User = require("../models/User");

const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const { signToken } = require("../utils");

module.exports = {
  createUser: async (req, res) => {
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      location: req.body.location,
      password: CryptoJS.AES.encrypt(
        req.body.password,
        process.env.SECRET_KEY
      ).toString(),
    });

    try {
      const savedUser = await newUser.save();
      return res.status(201).json("User created successfully");
    } catch (err) {
      return res.status(500).json({
        error: err.message,
        message: "Failed to create user",
      });
    }
  },

  loginUser: async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.status(401).json("Wrong email or password!");
      }

      const decryptedPassword = CryptoJS.AES.decrypt(
        user.password,
        process.env.SECRET_KEY
      );
      const originalPassword = decryptedPassword.toString(CryptoJS.enc.Utf8);

      if (originalPassword !== req.body.password) {
        return res.status(401).json("Wrong email or password!");
      }

      const userToken = signToken(user, process.env.SECRET_KEY, "7d");

      return res.status(200).json({
        token: userToken,
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          location: user.location,
        },
      });
    } catch (err) {
      return res.status(500).json({
        error: err.message,
        message: "Failed to login",
      });
    }
  },
};
