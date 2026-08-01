module.exports = (req, res, next) => {
  const password = req.headers["question-password"];

  if (!password) {
    return res.status(401).json({
      success: false,
      message: "Password required.",
    });
  }

  if (password !== process.env.QUESTION_MANAGER_PASSWORD) {
    return res.status(403).json({
      success: false,
      message: "Invalid password.",
    });
  }

  next();
};