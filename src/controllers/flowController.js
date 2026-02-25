const State = require("../models/State");
const Question = require("../models/Question");
const mongoose = require("mongoose");
const History = require("../models/History");



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

exports.addQuestion = async (req, res) => {

  try {

    const questionData = req.body;

    const question = new Question(questionData);

    const savedQuestion = await question.save();

    res.status(201).json({
      message: "Question added",
      data: savedQuestion
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

 try {

    const userId = req.params.userId;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        message: "Invalid userId"
      });
    }

    const history = await History.find({
      userId: new mongoose.Types.ObjectId(userId)
    });

    if (history.length === 0) {
      return res.json({
        message: "No history found",
        data: []
      });
    }

    res.json({
      message: "History found",
      data: history
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Something went wrong"
    });

  }


};



exports.answerQuestion = async (req, res) => {

 console.log("answerQuestion working");

  try {

    const { userId, selectedOption } = req.body;

    if (!userId || !selectedOption) {
      return res.status(400).json({
        message: "userId and selectedOption required"
      });
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        message: "Invalid userId"
      });
    }

    // Get state
    const state = await State.findOne({
      userId: new mongoose.Types.ObjectId(userId)
    });

    if (!state) {
      return res.status(404).json({
        message: "State not found"
      });
    }

    // Get current question
    const question = await Question.findById(state.currentQuestionId);

    if (!question) {
      return res.status(404).json({
        message: "Question not found"
      });
    }

    // Find selected option
    const option = question.options.find(
      op => op.text === selectedOption
    );

    if (!option) {
      return res.status(400).json({
        message: "Invalid option"
      });
    }

    // Save history
    const history = new History({
      userId: userId,
      moduleId: question.moduleId,
      questionId: question._id,
      selectedOption: selectedOption
    });

    await history.save();

    let nextQuestion;

    // Switch module
    if (option.nextModuleId) {

      nextQuestion = await Question.findOne({
        moduleId: option.nextModuleId
      });

      state.currentModuleId = option.nextModuleId;

    }
    else {

      // Move inside module
      nextQuestion = await Question.findOne({
        moduleId: question.moduleId,
        _id: { $ne: question._id }
      });

    }

    if (!nextQuestion) {
      return res.json({
        message: "Flow ended"
      });
    }

    // Update state
    state.previousQuestionId = question._id;
    state.currentQuestionId = nextQuestion._id;

    await state.save();

    res.json({
      message: "Next question",
      question: nextQuestion
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Something went wrong"
    });

  }


};


exports.goBack = async (req, res) => {

 console.log("goBack working");
 try {

    const { userId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        message: "Invalid userId"
      });
    }

    const state = await State.findOne({
      userId: new mongoose.Types.ObjectId(userId)
    });

    if (!state) {
      return res.status(404).json({
        message: "State not found"
      });
    }

    if (!state.previousQuestionId) {
      return res.status(400).json({
        message: "No previous question"
      });
    }

    state.currentQuestionId = state.previousQuestionId;
    state.previousQuestionId = null;

    await state.save();

    const question = await Question.findById(state.currentQuestionId);

    res.json({
      message: "Moved back",
      question: question
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Something went wrong"
    });

  }

};