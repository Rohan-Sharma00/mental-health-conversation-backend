# System Design

This document explains the backend design of the Mental Health Conversation System.

The system manages a question-based conversation flow where users answer questions and move through modules.

The backend stores user progress and conversation history and decides the next question.

---

# Database Collections

The system uses the following collections:

1. users
2. state
3. questions
4. history

---

# 1. Users Collection

This collection stores basic user information.

Example Object:

```
{
  _id: 1,
  name: "Rohan"
}
```

Fields:

* _id → Unique user id
* name → User name

Purpose:

* Identify user
* Link user with state and history

---

# 2. State Collection

This collection stores the current conversation state of the user.

Example Object:

```
{
  userId: 1,

  currentModuleId: "stress",

  currentQuestionId: "q5",

  previousQuestionId: "q4",

  moduleLatest: {
    stress: "q5",
    anxiety: "q2"
  },

  checkpoint: {
    stress: "q4"
  }
}
```

Fields:

* userId → User id
* currentModuleId → Current module
* currentQuestionId → Current question
* previousQuestionId → Previous question
* moduleLatest → Latest question per module
* checkpoint → Last checkpoint per module

Purpose:

* Track user position
* Support deep links
* Support go back feature
* Support module switching
* Support checkpoints

---

# 3. Questions Collection

This collection stores all questions.

Example Object:

```
{
  _id: "q1",

  moduleId: "stress",

  text: "How are you feeling today?",

  isCheckpoint: false,

  options: [

    {
      text: "Happy",
      nextQuestionId: "q2",
      nextModuleId: "stress"
    },

    {
      text: "Sad",
      nextQuestionId: "q1",
      nextModuleId: "anxiety"
    }

  ]
}
```

Fields:

* _id → Question id
* moduleId → Module name
* text → Question text
* isCheckpoint → Checkpoint flag
* options → Answer options

Options Fields:

* text → Option text
* nextQuestionId → Next question
* nextModuleId → Next module

Purpose:

* Store modules
* Store questions
* Control conversation flow

---

# 4. History Collection

This collection stores conversation history.

Example Object:

```
{
 userId: 1,

 moduleId: "stress",

 questionId: "q5",

 selectedOption: "Sad",

 createdAt: Date
}
```

Fields:

* userId → User id
* moduleId → Module id
* questionId → Question id
* selectedOption → Selected option
* createdAt → Time of answer

Purpose:

* Store full conversation history
* Never delete history

---

# API List

The system provides the following APIs.

1. Create User
2. Start Module
3. Answer Question
4. Get Current State
5. Get Question
6. Get History
7. Go Back

---

# 1. Create User

Endpoint:

```
POST /users
```

Input Example:

```
{
 name: "Rohan"
}
```

Output Example:

```
{
 userId: 1,
 name: "Rohan"
}
```

Purpose:

Create a new user.

---

# 2. Start Module

Endpoint:

```
POST /start-module
```

Input Example:

```
{
 userId: 1,
 moduleId: "stress"
}
```

Output Example:

```
{
 questionId: "q1",
 text: "How are you feeling?",
 options: [...]
}
```

Purpose:

Start module and return first question.

---

# 3. Answer Question

Endpoint:

```
POST /answer
```

Input Example:

```
{
 userId: 1,
 questionId: "q1",
 optionIndex: 1
}
```

Output Example:

```
{
 questionId: "q2",
 text: "Do you feel stressed?",
 options: [...]
}
```

Purpose:

Submit answer and return next question.

---

# 4. Get Current State

Endpoint:

```
GET /state/:userId
```

Output Example:

```
{
 currentModuleId: "stress",
 currentQuestionId: "q5"
}
```

Purpose:

Return user current state.

---

# 5. Get Question

Endpoint:

```
GET /question/:questionId?userId=1
```

Output Example:

```
{
 questionId: "q5",
 text: "How do you feel today?",
 options: [...]
}
```

Purpose:

Return latest valid question.

---

# 6. Get History

Endpoint:

```
GET /history/:userId
```

Output Example:

```
[
 {
   questionId: "q1",
   selectedOption: "Happy"
 },
 {
   questionId: "q2",
   selectedOption: "Yes"
 }
]
```

Purpose:

Return user conversation history.

---

# 7. Go Back

Endpoint:

```
POST /go-back
```

Input Example:

```
{
 userId: 1
}
```

Output Example:

```
{
 questionId: "q4",
 text: "Previous question",
 options: [...]
}
```

Purpose:

Move user to previous question.
