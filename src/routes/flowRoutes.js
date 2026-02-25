const express = require("express");

const router = express.Router();

const {
 startModule,
 answerQuestion,
 getState,
 getQuestion,
 getHistory,
 goBack,
 getAllQuestions,
 addQuestion
} = require("../controllers/flowController");

router.post("/questions", addQuestion);

router.get("/questions", getAllQuestions);

router.post("/start-module", startModule);

router.post("/answer", answerQuestion);

router.get("/state/:userId", getState);

router.get("/question/:questionId", getQuestion);

router.get("/history/:userId", getHistory);

router.post("/go-back", goBack);

module.exports = router;