const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  phone: {
    type: String,
    default: null
  },

  address: {
    type: String,
    default: null
  },

  mentalState: {
    type: String,
    default: "Unknown"
  },

  firstTreatmentDate: {
    type: Date,
    default: null
  },

  createdAt: {
    type: Date,
    default: Date.now
  }

});

module.exports = mongoose.model("User", userSchema);