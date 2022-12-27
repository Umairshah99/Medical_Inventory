const mongoose = require("mongoose");

const thresholdSchema = new mongoose.Schema({
    email: String,
    password: String,
    admin: Boolean,
  });
  
  let Threshold = mongoose.model("Threshold", thresholdSchema, "thresholds");
  
  module.exports = Threshold;
  
  