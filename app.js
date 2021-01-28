const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
require("dotenv").config();
const bodyParser = require("body-parser");
const restrictOrigin = require("./middlewares/restrictOrigin");

const app = express();

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connection Success!");
  })
  .catch((err) => {
    console.error("Mongo Connection Error", err);
  });

const PORT = process.env.PORT || 5000;

app.use(restrictOrigin);

app.use(express.json());
app.use(morgan("dev"));

app.post("/ping", (req, res) => {
  return res.send({
    status: "Server is up and running",
  });
});

app.listen(PORT, () => {
  console.log("Server started listening on port : ", PORT);
});
