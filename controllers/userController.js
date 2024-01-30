const User = require("../models/User");

module.exports = {
  deleteUser: async (res, req) => {
    try {
      await User.findByIdAndDelete(req.params.id);
      return res.status(200).json("User successfully Deleted");
    } catch (error) {
      return res.status(500).json({
        error: error.message,
        message: "Failed to delete user",
      });
    }
  },
  getUser: async (res, req) => {},
};
