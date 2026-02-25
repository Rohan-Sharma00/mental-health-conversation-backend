const State = require("../models/State");
const Question = require("../models/Question");
const mongoose = require("mongoose");


exports.getAllQuestions = async (req, res) => {

  try {

    const questions = await Question.find();

    res.json(questions);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Something went wrong"
    });

  }

};

exports.startModule = async (req, res) => {

 console.log("startModule working");

  try {

    const { userId, moduleId } = req.body;

    if (!userId || !moduleId) {
      return res.status(400).json({
        message: "userId and moduleId are required"
      });
    }

    // Find first question of module
    const firstQuestion = await Question.findOne({ moduleId });

    if (!firstQuestion) {
      return res.status(404).json({
        message: "Module not found"
      });
    }

    // Check if state exists
    let state = await State.findOne({ userId });

    if (!state) {

      state = new State({
        userId,
        currentModuleId: moduleId,
        currentQuestionId: firstQuestion._id,
        previousQuestionId: null
      });

    } else {

      state.currentModuleId = moduleId;
      state.currentQuestionId = firstQuestion._id;
      state.previousQuestionId = null;

    }

    await state.save();

    res.json({
      message: "Module started",
      question: firstQuestion
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Something went wrong"
    });

  }

};

exports.getState = async (req, res) => {

  console.log("getState working");

  try {

    const userId = req.params.userId;

    const state = await State.findOne({
      userId: new mongoose.Types.ObjectId(userId)
    });

    if (!state) {
      return res.status(404).json({
        message: "No active module. Please start a module first."
      });
    }

    res.json({
      message: "State found",
      data: state
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Something went wrong"
    });

  }


};

exports.getQuestion = async (req, res) => {

 console.log("getQuestion working");

  try {

    const questionId = req.params.questionId;

    if (!mongoose.Types.ObjectId.isValid(questionId)) {
      return res.status(400).json({
        message: "Invalid questionId"
      });
    }

    const question = await Question.findById(questionId);

    if (!question) {
      return res.status(404).json({
        message: "Question not found"
      });
    }

    res.json({
      message: "Question found",
      data: question
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Something went wrong"
    });

  }


};

exports.getHistory = async (req, res) => {

 console.log("getHistory working");

 res.send("getHistory working");

};



exports.answerQuestion = async (req, res) => {

 console.log("answerQuestion working");

 res.send("answerQuestion working");

};


exports.goBack = async (req, res) => {

 console.log("goBack working");

 res.send("goBack working");

};