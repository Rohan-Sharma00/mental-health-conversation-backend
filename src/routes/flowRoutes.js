const express = require("express");

const router = express.Router();

const {
 startModule,
 answerQuestion,
 getState,
 getQuestion,
 getHistory,
 goBack
} = require("../controllers/flowController");


router.post("/start-module", startModule);

router.post("/answer", answerQuestion);

router.get("/state/:userId", getState);

router.get("/question/:questionId", getQuestion);

router.get("/history/:userId", getHistory);

router.post("/go-back", goBack);

module.exports = router;