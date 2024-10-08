const port = 8000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

app.use(express.json());
app.use(cors());

//mongodb connection
uyiu
mongoose.connect(
  "mongodb+srv://omari999moaad:mpViyKETcOkK9kLB@cluster0.4aue3.mongodb.net/e-commerce"
);
//API creation

app.get("/", (req, res) => {
  res.send("Backend server is running");
});



app.listen(port, (error) => {
  if (error) {
    console.log("Error:" + error);
  } else {
    console.log("Backend server is running on port " + port);
  }
});
