const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const flowRoutes = require("./routes/flowRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Mental Health Conversation API Running");
});

app.use("/api", userRoutes);
app.use("/api", flowRoutes);

module.exports ={ app };