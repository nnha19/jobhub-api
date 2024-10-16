require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const jobRoutes = require("./routes/jobRoute");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/users", userRoutes);
app.use("/jobs", jobRoutes);

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.tz76r.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(3000, (result) => {
  console.log("Server is running on port 3000");
});
