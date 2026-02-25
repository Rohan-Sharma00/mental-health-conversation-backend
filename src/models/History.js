const mongoose = require("mongoose");

const historySchema = new mongoose.Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    index: true   
  },

  moduleId: {
    type: String,
    required: true
  },

  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Question",
    required: true
  },

  selectedOption: {
    type: String,
    required: true
  },

  createdAt: {
    type: Date,
    default: Date.now
  }

});

module.exports = mongoose.model("History", historySchema);