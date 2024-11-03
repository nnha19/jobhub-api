const { Schema, model } = require("mongoose");

const savedJobSchema = new Schema({
  job: {
    type: Schema.Types.ObjectId,
    ref: "Job",
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const SavedJob = model("SavedJob", savedJobSchema);

module.exports = SavedJob;
