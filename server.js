const express = require("express");
const cors = require("cors");

const askAI = require("./services/aiEngine"); // correct path

const app = express();

app.use(cors());
app.use(express.json());

// API route
app.post("/ask", (req, res) => {
  const { message } = req.body; // ✅ FIXED

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  const reply = askAI(message); // ✅ consistent naming

  res.json({ reply }); // ✅ frontend expects 'reply'
});

// health check
app.get("/", (req, res) => {
  res.send("AI Avatar Backend Running 🚀");
});

// start server
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});