# Requirements Understanding

## Project Goal

The goal of this project is to build a backend system that manages a **question-based conversation flow for mental health assessment**.

The system will guide users through a series of questions. Each question has multiple options, and each option decides which question or module comes next.

The system behaves like a structured conversation where users answer **one question at a time**.

---

## Overall Flow

Simple flow of the system:

```
User → Start Module → Question → Select Option → Next Question → Continue
```

Example:

```
Start Stress Module
        ↓
Q1: How are you feeling?
        ↓
User selects "Sad"
        ↓
Move to Anxiety Module
        ↓
Q1: Are you feeling worried?
```

---

## Core Concepts

### 1. Modules

A module is a group of related questions.

Example modules:

* Stress module
* Sleep module
* Anxiety module

Each module has a starting question.

Users can:

* Move within the same module
* Switch to a different module

Example:

```
Stress Module → Anxiety Module → Sleep Module
```

---

### 2. Questions

Each module contains multiple questions.

Each question:

* Belongs to one module
* Has multiple options
* Each option decides the next question or module

Example:

Question:

```
How are you feeling today?
```

Options:

```
Happy → Next question in Stress module
Sad → Move to Anxiety module
Angry → Move to Anger module
```

The system shows **one question at a time**.

---

## Question Structure Example

```
Question
 ├─ Module: Stress
 ├─ Text: How are you feeling?
 └─ Options:
      ├─ Happy → Q2 (Stress)
      ├─ Sad → Q1 (Anxiety)
      └─ Angry → Q1 (Anger)
```

---

## Conversation Flow Example

Example user journey:

```
Start Module
   ↓
Q1
   ↓
Q2
   ↓
Switch Module
   ↓
Q1
   ↓
Q2
```

The backend decides the next question based on the selected option.

---

## Conversation History

The system must store the **complete conversation history** of the user.

History includes:

* User ID
* Module ID
* Question ID
* Selected option
* Time of answer

Example:

```
User History

Q1 → Happy
Q2 → Yes
Q3 → No
Q4 → Sometimes
```

History is never deleted.

---

## Active User State

The system must store the **current position of the user in the conversation.**

Active state means:

* Current module
* Current question

Example:

```
Current State

User = 123

Module = Stress
Question = Q5
```

This allows the system to continue from where the user stopped.

---

## State vs History Diagram

```
User

├── Current State
│     ├── Module = Stress
│     └── Question = Q5
│
└── Conversation History
      ├── Q1 → Happy
      ├── Q2 → Yes
      ├── Q3 → No
      └── Q4 → Sometimes
```

State tells **where the user is now**.

History tells **everything the user answered before.**

---

## Checkpoint Questions

Some questions act as **checkpoint questions.**

After a checkpoint question:

* Previous answers in that module should not affect future flow
* Conversation history is still stored

Example:

```
Q1 → Q2 → Q3
        ↓
Checkpoint Question (Q4)
        ↓
Q5
```

After Q4:

Flow behaves like a fresh start inside the module.

But history remains:

```
Q1 Q2 Q3 Q4 Q5
```

---

## Deep Link Handling

Users may open an old link or notification pointing to a question.

Example:

```
User opens:

/question/Q2
```

But user current state is:

```
Q5
```

System should return:

```
Q5
```

Instead of Q2.

This prevents invalid conversation flows.

---

## Deep Link Diagram

```
User Current State → Q5

User Opens Old Link → Q2

System Response → Q5
```

---

## Defensive Handling

The system must handle invalid requests safely.

Examples:

### Invalid Option

```
User selects option 10

But question has only options 1-3

System Response:

Invalid option
```

---

### Question Not Found

```
User requests:

/question/Q100

System Response:

Question not found
```

---

### Broken Flow

```
Option points to:

Next Question = Q50

But Q50 does not exist

System Response:

Invalid flow configuration
```

---

### Module Switching

System must support:

```
Stress → Anxiety → Stress → Sleep
```

Without errors.

---

## Bonus Feature (Optional)

User can go back to previous question.

Example:

```
Q1 → Q2 → Q3

User presses Back

System returns Q2
```

---

## Summary

This system will:

* Manage modules and questions
* Control conversation flow
* Store conversation history
* Maintain active state
* Support module switching
* Support checkpoint questions
* Handle deep links safely
* Handle invalid inputs
* Support going back to previous question
