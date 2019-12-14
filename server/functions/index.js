const functions = require("firebase-functions");
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const config = require("./config/default.json");

const app = express();

//Bodyparser middleware
app.use(express.json());

//DB
const db = config.mongoURI;
//Connect to mongoose
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true
  }) //Let us remove that nasty deprecation warrning :)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

//ROUTES
app.use("/api/items", require("./routes/api/items"));
app.use("/api/users", require("./routes/api/users"));
app.use("/api/posts", require("./routes/api/posts"));
app.use("/api/auth", require("./routes/api/auth"));

exports.app = functions.region("europe-west2").https.onRequest(app);
