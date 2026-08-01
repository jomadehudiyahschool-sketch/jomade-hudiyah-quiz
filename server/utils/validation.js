const validator = require("validator");

const validateAdmin = (data = {}) => {
  const { fullName, email, password } = data;

  if (!fullName || fullName.trim().length < 3) {
    return "Full Name must be at least 3 characters.";
  }

  if (!email || !validator.isEmail(email)) {
    return "Invalid email address.";
  }

  if (!password || password.length < 6) {
    return "Password must be at least 6 characters.";
  }

  return null;
};

module.exports = validateAdmin;