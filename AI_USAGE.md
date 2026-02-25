# AI Usage

I used ChatGPT to help understand the assignment and design the backend APIs and database structure.

------------------------------------

## 1. AI Tools Used

- ChatGPT

Used for:
- Understanding requirements
- Designing database schemas
- Planning APIs
- Debugging errors


------------------------------------

## 2. Prompts I Gave

Some examples of prompts I used:

- "I wrote this API. How can we make the code cleaner and better?"
- "Check if this MongoDB schema design is correct"
- "I implemented this logic. Is there a better approach?"
- "Why is this MongoDB ObjectId query not working?"
- "Suggest improvements for this controller code"


------------------------------------

## 3. What I Modified From AI Output

I did not copy the code directly. I modified it to keep it simple and readable.

Changes I made:

- Simplified controller logic
- Changed variable names
- Removed unnecessary code
- Adjusted API responses
- Improved error handling


------------------------------------

## 4. What AI Got Wrong

AI made some mistakes and I corrected them.

Example 1 — ObjectId Problem

AI initially used:

State.findOne({ userId })

This did not work because MongoDB stored userId as ObjectId.

I fixed it using:

new mongoose.Types.ObjectId(userId)



Example 2 — Start Module Logic

AI suggested starting neutral module inside getState API.

But assignment required using start-module API.

I corrected the logic.



Example 3 — Multiple Question Collections

Initially AI suggested separate collections per module.

I decided to use one questions collection instead because it is easier to manage and scale.



------------------------------------

## 5. How I Verified Correctness

I tested all APIs using Postman.

Tests included:

- Valid inputs
- Invalid inputs
- Invalid ObjectId
- Module switching
- Go back feature
- History tracking

I also verified data directly in MongoDB Compass.


------------------------------------

All APIs were tested and working correctly.