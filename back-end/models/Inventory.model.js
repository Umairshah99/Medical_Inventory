const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema({
    name: String,
    quantity: Number,
    price: Number,
    exp_date: Date
  });
  
  let Inventory = mongoose.model("inventory", inventorySchema, "inventory");
  
  module.exports = Inventory;
  
  