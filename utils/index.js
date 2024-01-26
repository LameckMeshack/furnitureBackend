const jwt = require("jsonwebtoken");

const signToken = (user, secretKey, expiresIn = "1h") => {
  const payload = {
    id: user._id, // User ID from MongoDB
    email: user.email, // User email
  };

  return jwt.sign(payload, secretKey, { expiresIn });
};

module.exports = {
  signToken,
};
