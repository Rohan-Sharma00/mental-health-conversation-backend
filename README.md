# Mental Health Conversation Backend

This project is a backend system for a mental health conversation flow.

A user answers questions step by step and moves between different modules like neutral, happy and sad.

The system keeps track of:

- Current question
- Current module
- Previous question (Go Back feature)
- Complete conversation history

The backend is built using Node.js, Express and MongoDB.


------------------------------------

TECH STACK

- Node.js
- Express.js
- MongoDB
- Mongoose


------------------------------------

PROJECT SETUP

Follow these steps to run the project locally.


Step 1 — Clone Repository

git clone https://github.com/Rohan-Sharma00/mental-health-conversation-backend.git


Step 2 — Open Project Folder

cd mental-health-conversation-backend


Step 3 — Install Dependencies

npm install


Step 4 — Create Environment File

Create a file named .env in the root folder.

Add the following:

MONGO_URL=your_mongodb_connection_string
PORT=3333


Example:

MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/mental_health_db
PORT=3333


Step 5 — Start Server

npm run dev

Step 6 — Verify Server

Open browser:

http://localhost:3333

You should see:

Mental Health Conversation API Running


------------------------------------

DATABASE COLLECTIONS


Users Collection

Stores user basic information.

Example:

{
 name: "Rohan Sharma",
 email: "rohan@gmail.com",
 phone: "9876543210",
 address: "Pune",
 mentalState: "Moderate Stress"
}



------------------------------------

State Collection

Stores the current position of the user in the conversation.

Example:

{
 userId: "USER_ID",
 currentModuleId: "neutral",
 currentQuestionId: "QUESTION_ID",
 previousQuestionId: null
}



------------------------------------

Questions Collection

Stores all questions and options.

Example:

{
 moduleId: "neutral",
 text: "How are you feeling today?",
 isCheckpoint: false,
 options: [
   { text: "Happy", nextModuleId: "happy" },
   { text: "Sad", nextModuleId: "sad" }
 ]
}



------------------------------------

History Collection

Stores complete conversation history.

Example:

{
 userId: "USER_ID",
 moduleId: "neutral",
 questionId: "QUESTION_ID",
 selectedOption: "Happy"
}



------------------------------------

API LIST


1 Create User

POST /api/users

Example Body:

{
 "name":"Rohan",
 "email":"rohan@gmail.com"
}



------------------------------------

2 Start Module

POST /api/start-module

Example Body:

{
 "userId":"USER_ID",
 "moduleId":"neutral"
}

Returns first question.



------------------------------------

3 Answer Question

POST /api/answer

Example Body:

{
 "userId":"USER_ID",
 "selectedOption":"Happy"
}

Returns next question.



------------------------------------

4 Get State

GET /api/state/:userId

Returns current module and question.



------------------------------------

5 Get Question

GET /api/question/:questionId

Returns question details.



------------------------------------

6 Get History

GET /api/history/:userId

Returns conversation history.



------------------------------------

7 Go Back

POST /api/go-back

Example Body:

{
 "userId":"USER_ID"
}

Moves user to previous question.



------------------------------------

FEATURES

- Conversation flow system
- Module switching
- Question navigation
- Conversation history tracking
- Go back to previous question
- Error handling


------------------------------------

NOTES

- MongoDB automatically generates question ids.
- State stores the current position of the user.
- History stores all answers.


------------------------------------

Author

Rohan Sharma