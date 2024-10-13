const isRecruiter = (req, res, next) => {
  if (!req.user.isRecruiter) {
    return res
      .status(403)
      .json({ error: "Only recruiters can perform this action" });
  }
  next();
};

module.exports = isRecruiter;
