# System Design

This document explains the backend design of the Mental Health Conversation System.

The system manages a question-based conversation flow where users answer questions and move through different modules.

The backend stores user progress and conversation history and decides the next question.


--------------------------------------------------

# Database Collections

The system uses the following collections:

1. users
2. state
3. questions
4. history


--------------------------------------------------

# 1. Users Collection

This collection stores basic user information.

Example Object:

{
  _id: "USER_ID",

  name: "Rohan",

  email: "rohan@gmail.com",

  phone: "9876543210",

  address: "Pune",

  mentalState: "Moderate Stress"
}

Fields:

- _id → Unique user id
- name → User name
- email → User email
- phone → Phone number
- address → Address
- mentalState → Current mental condition

Purpose:

- Identify user
- Link user with state and history


--------------------------------------------------

# 2. State Collection

This collection stores the current conversation state of the user.

Example Object:

{
 userId: "USER_ID",

 currentModuleId: "neutral",

 currentQuestionId: "QUESTION_ID",

 previousQuestionId: null
}

Fields:

- userId → User id
- currentModuleId → Current module
- currentQuestionId → Current question
- previousQuestionId → Previous question

Purpose:

- Track user position
- Support go back feature
- Support module switching


--------------------------------------------------

# 3. Questions Collection

This collection stores all questions.

Example Object:

{
 _id: "QUESTION_ID",

 moduleId: "neutral",

 text: "How are you feeling today?",

 isCheckpoint: false,

 options: [

   {
     text: "Happy",
     nextModuleId: "happy"
   },

   {
     text: "Sad",
     nextModuleId: "sad"
   }

 ]
}

Fields:

- _id → Question id (MongoDB ObjectId)
- moduleId → Module name
- text → Question text
- isCheckpoint → Checkpoint flag
- options → Answer options

Options Fields:

- text → Option text
- nextQuestionId → Next question id (optional)
- nextModuleId → Next module id (optional)

Purpose:

- Store modules
- Store questions
- Control conversation flow


--------------------------------------------------

# 4. History Collection

This collection stores conversation history.

Example Object:

{
 userId: "USER_ID",

 moduleId: "neutral",

 questionId: "QUESTION_ID",

 selectedOption: "Happy",

 createdAt: Date
}

Fields:

- userId → User id
- moduleId → Module id
- questionId → Question id
- selectedOption → Selected option
- createdAt → Time of answer

Purpose:

- Store full conversation history
- Never delete history


--------------------------------------------------

# API List

The system provides the following APIs.

1. Create User
2. Start Module
3. Answer Question
4. Get Current State
5. Get Question
6. Get History
7. Go Back
8. Add Question
9. Get All Questions


--------------------------------------------------

# 1. Create User

Endpoint:

POST /api/users

Input Example:

{
 name: "Rohan",
 email: "rohan@gmail.com"
}

Output Example:

{
 message: "User created successfully",
 data: {
   _id: "USER_ID",
   name: "Rohan"
 }
}

Purpose:

Create a new user.


--------------------------------------------------

# 2. Start Module

Endpoint:

POST /api/start-module

Input Example:

{
 userId: "USER_ID",
 moduleId: "neutral"
}

Output Example:

{
 message: "Module started",
 question: {...}
}

Purpose:

Start module and return first question.


--------------------------------------------------

# 3. Answer Question

Endpoint:

POST /api/answer

Input Example:

{
 userId: "USER_ID",
 selectedOption: "Happy"
}

Output Example:

{
 message: "Next question",
 question: {...}
}

Purpose:

Submit answer and return next question.


--------------------------------------------------

# 4. Get Current State

Endpoint:

GET /api/state/:userId

Output Example:

{
 message: "State found",
 data: {
   currentModuleId: "neutral",
   currentQuestionId: "QUESTION_ID"
 }
}

Purpose:

Return user current state.


--------------------------------------------------

# 5. Get Question

Endpoint:

GET /api/question/:questionId

Output Example:

{
 message: "Question found",
 data: {...}
}

Purpose:

Return question details.


--------------------------------------------------

# 6. Get History

Endpoint:

GET /api/history/:userId

Output Example:

{
 message: "History found",
 data: [...]
}

Purpose:

Return user conversation history.


--------------------------------------------------

# 7. Go Back

Endpoint:

POST /api/go-back

Input Example:

{
 userId: "USER_ID"
}

Output Example:

{
 message: "Moved back",
 question: {...}
}

Purpose:

Move user to previous question.


--------------------------------------------------

# 8. Add Question

Endpoint:

POST /api/questions

Input Example:

{
 moduleId: "neutral",
 text: "How do you feel today?",
 options: [
   { text: "Happy", nextModuleId: "happy" },
   { text: "Sad", nextModuleId: "sad" }
 ]
}

Output Example:

{
 message: "Question added",
 data: {...}
}

Purpose:

Add a new question to the system.


--------------------------------------------------

# 9. Get All Questions

Endpoint:

GET /api/questions

Output Example:

[
 {...},
 {...}
]

Purpose:

Return all questions.

Useful for testing and debugging.