const isRecruiter = (req, res, next) => {
  console.log(req.user);
  if (req.user.userType !== "recruiter") {
    return res
      .status(403)
      .json({ error: "Only recruiters can perform this action" });
  }
  next();
};

module.exports = isRecruiter;
