const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    admin: Boolean,
  });
  
  let User = mongoose.model("User", userSchema, "users");
  
  module.exports = User;
  
  