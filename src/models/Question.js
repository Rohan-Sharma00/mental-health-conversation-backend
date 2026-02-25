const mongoose = require("mongoose");

const optionSchema = new mongoose.Schema({

  text: {
    type: String,
    required: true
  },

  nextQuestionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Question",
    default: null
  },

  nextModuleId: {
    type: String,
    default: null
  }

},{ _id:false });


const questionSchema = new mongoose.Schema({

  moduleId: {
    type: String,
    required: true
  },

  text: {
    type: String,
    required: true
  },

  isCheckpoint: {
    type: Boolean,
    default: false
  },

  options: [optionSchema]

});


module.exports = mongoose.model("Question", questionSchema);