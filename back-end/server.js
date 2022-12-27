#!/usr/bin/env node
const cookieParser = require("cookie-parser");
const server = require("./app.js"); // load up the web server
const axios = require("axios"); // middleware for making requests to APIs
const express = require("express"); // CommonJS import style!
const url = require("url"); // process queries in url strings
const mongoose = require("mongoose"); // module for database communication

require("dotenv").config({ silent: true }); // .env

// use cors to bypass chrome error
const cors = require("cors");
const { privateDecrypt } = require("crypto");
var bcrypt = require("bcryptjs");
server.use(cors());

const jwt = require("jsonwebtoken");
const passport = require("passport");
server.use(passport.initialize()); // tell express to use passport middleware
// use this JWT strategy within passport for authentication handling
const { jwtOptions, jwtStrategy } = require("./jwt-config.js"); // import setup options for using JWT in passport
passport.use(jwtStrategy);
// use express's builtin body-parser middleware to parse any data included in a request
server.use(express.json()); // decode JSON-formatted incoming POST data
server.use(express.urlencoded({ extended: true })); // decode url-encoded incoming POST data
server.use(cookieParser()); // useful middleware for dealing with cookies

var path = require("path");
const multer = require("multer");

// the port to listen to for incoming requests
const port = 3001;

const front_path = process.env.FRONT_PATH;

// call express's listen function to start listening to the port
const listener = server.listen(port, function () {
  console.log(`Server running on port: ${port}`);
});

// mongoose setup
const db_url = process.env.DB_DOMAIN;
mongoose.connect(db_url, () => {
  console.log("Db connection state: " + mongoose.connection.readyState);
});

// import model
const User = require("./models/User.model");
const Inventory = require("./models/Inventory.model");
const Threshold = require("./models/Threshold.model");

// route handling
server.get("/", function (req, res) {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});

//  sign in
server.post("/signin-submit", function (req, res) {
  if (req.body.email && req.body.password) {
    User.findOne({ email: req.body.email }, (err, user) => {
      console.log(user);
      if (!user || err) {
        console.log("User not found");
        res.status(400);
        return res.json({
          success: false,
          message: "No username or password supplied",
        });
      } else {
        console.log("User exists: ", user.email);
        console.log("Db password: ", user.password);
        console.log("entered password: ", req.body.password);
        // bcrypt.compare(req.body.password, user.password, (err, ret) => {
        if (req.body.password == user.password) {
          console.log(req.body.password);
          console.log(user.password);
          // console.log(ret);
          res.status(200);
          const payload = { id: user.id }; // some data we'll encode into the token
          const token = jwt.sign(payload, jwtOptions.secretOrKey); // create a signed token
          return res.json({ success: true, email: user.email, token: token }); // send the token to the client to store
        } else {
          console.log("Incorrect password");
          res.status(400);
          return res.json({
            success: false,
            message: "No username or password supplied",
          });
          // }
        }
      }
    });
  } else {
    console.log("No username or password supplied");
    res.status(400);
    return res.json({
      success: false,
      message: "No username or password supplied",
    });
  }
});

// get all inventory
server.get(
  "/getInventory",
  // passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Inventory.find({}, (err, docs) => {
      if (err || docs.length == 0) {
        console.log("User not found");
        res.status(404);
        res.redirect(`${front_path}/Inventory`);
      } else {
        if (err || docs.length == 0) {
          console.log("No order history");
          res.json(docs);
        } else {
          res.json(docs);
        }
      }
    });
  }
);

// get thresholds
server.get(
  "/getThreshold",
  // passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Threshold.find({}, (err, docs) => {
      if (err || docs.length == 0) {
        res.status(404);
        res.redirect(`${front_path}/Inventory`);
      } else {
        res.json(docs);
      }
    });
  }
);

// a function to stop listening to the port
const close = () => {
  listener.close();
};

module.exports = server;
