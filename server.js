const express = require("express");
const cors = require("cors");

const askAI = require("./services/aiEngine");

const app = express();

app.use(cors());
app.use(express.json());

// API route
app.post("/ask", (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  const reply = askAI(message);

  res.json({ reply });
});

// health check
app.get("/", (req, res) => {
  res.send("AI Avatar Backend Running 🚀");
});

// ✅ FIXED PORT (IMPORTANT)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});