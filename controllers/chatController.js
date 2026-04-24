const askAI = require("../services/aiEngine");
const projects = require("../data/projectsData");

exports.handleChat = (req, res) => {
  const { message } = req.body;

  const lowerMsg = message.toLowerCase();

  // 🎯 Detect intent (projects)
  if (
    lowerMsg.includes("project") ||
    lowerMsg.includes("work") ||
    lowerMsg.includes("portfolio")
  ) {
    return res.json({
      reply: {
        type: "projects",
        data: projects,
      },
    });
  }

  // 🤖 Default AI text response
  const aiReply = askAI(message);

  res.json({
    reply: aiReply,
  });
};