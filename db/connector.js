const mongodb = require("mongodb");
//this is for local MongoDb const mongoURI = "mongodb://0.0.0.0:27017/" + "bookMovie";
//atlas MongoDb::: cloud Database
const mongoURI ="mongodb+srv://bms:bms@bmsdeploye.1lhux3l.mongodb.net/?retryWrites=true&w=majority"

let mongoose = require("mongoose");
const { bookMovieSchema } = require("../models/bookMovie");
const { UserSchema } = require('../models/user')

mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("connection established with mongodb server online");
  })
  .catch((err) => {
    console.log("error while connection", err);
  });
let collection_connection = mongoose.model("bookmovietickets", bookMovieSchema);
let user_connection = mongoose.model("User", UserSchema);

exports.connection = collection_connection;
exports.Userconnection = user_connection;


