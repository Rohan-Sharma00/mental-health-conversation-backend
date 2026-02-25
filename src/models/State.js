const mongoose = require("mongoose");

const stateSchema = new mongoose.Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: true
  },

  currentModuleId: {
    type: String,
    default: null
  },

  currentQuestionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Question",
    default: null
  },

  previousQuestionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Question",
    default: null
  },

  moduleLatest: {
    type: Object,
    default: {}
  },

  checkpoint: {
    type: Object,
    default: {}
  }

});

module.exports = mongoose.model("State", stateSchema);