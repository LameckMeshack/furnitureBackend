const User = require("../models/User");

module.exports = {
  deleteUser: async (req, res) => {
    try {
      await User.findByIdAndDelete(req.params.id);
      return res.status(200).json("User successfully Deleted");
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        error: error.message,
        message: "Failed to delete user",
      });
    }
  },
  getUser: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);

      if (!user) {
        return res.status(401).json("User does not exist");
      }

      const { password, __v, createdArt, updatedAt, ...userData } = user._doc;
      return res.status(200).json(userData);
    } catch (error) {
      console.log("error", error);
      return res.status(500).json({
        error: error.message,
        message: "Failed to get user",
      });
    }
  },

  // getUser: async (req, res) => {
  //   try {
  //     const user = await User.findById(req.params.id);

  //     if (!user) {
  //       return res.status(401).json("User does not exist");
  //     }
  //     const { password, __v, createdArt, updatedAt, ...userData } = user._doc;
  //     return res.status(200).json(userData);
  //   } catch (error) {
  //     return res
  //       .status(500)
  //       .json({ error: error.message, message: "Failed to get user" });
  //   }
  // },
};
