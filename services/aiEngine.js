const resume = require("../data/resumeData");
const projects = require("../data/projectsData");

// -------------------- HELPERS --------------------

function randomize(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function normalize(text) {
  return text.toLowerCase().replace(/[^\w\s]/g, "").trim();
}

function matchKeyword(text, keyword) {
  const regex = new RegExp(`\\b${keyword}\\b`, "i");
  return regex.test(text);
}

// -------------------- STATE --------------------

let lastIntent = null;
let lastTopic = null;
let detailLevel = 0;
let lastUserMessage = "";

// -------------------- INTENTS --------------------

const intents = {
  greeting: ["hi", "hello", "hey", "yo"],
  howareyou: ["how are you", "hru"],
  more: ["more", "details", "explain", "elaborate"],

  name: ["name", "who are you"],
  summary: ["about", "summary", "introduce"],

  skills: ["skill", "skills", "tech", "stack", "technology"],

  projects: ["project", "projects", "portfolio", "work", "built", "developed"],

  experience: ["experience", "intern", "job", "worked"],

  education: ["education", "college", "degree"],

  contact: ["contact", "email", "github", "linkedin"],

  thanks: ["thanks", "thank you"],
  bye: ["bye", "goodbye"],
  joke: ["joke", "funny"]
};

// -------------------- INTENT DETECTION --------------------

function detectBestIntent(question) {
  const q = normalize(question);
  let bestIntent = "unknown";
  let maxScore = 0;

  for (let intent in intents) {
    let score = 0;

    intents[intent].forEach(keyword => {
      if (matchKeyword(q, keyword)) score++;
    });

    if (score > maxScore) {
      maxScore = score;
      bestIntent = intent;
    }
  }

  return bestIntent;
}

// -------------------- PROJECT DETECTION --------------------

function findProjectFromMessage(message) {
  const msg = normalize(message);

  return projects.find(project => {
    const name = project.title.toLowerCase();

    if (msg.includes(name)) return true;

    return name.split(" ").some(word => matchKeyword(msg, word));
  });
}

// -------------------- PROJECT RESPONSES --------------------

function getProjectResponse(project, level = 1) {
  if (!project) return null;

  // 🎯 LEVEL 1 → SHOW CARD
  if (level === 1) {
    return {
      type: "projects",
      message: `${project.title} 👇\n\nWant more details?`,
      data: [project],
    };
  }

  // 🧠 LEVEL 2 → DETAILS
  if (level === 2) {
    return `${project.title} uses ${project.tech.join(", ")}.

Key features:
${Object.values(project.details || {})
  .map(d => `- ${d}`)
  .join("\n")}`;
  }

  // 🚀 LEVEL 3 → FULL EXPLANATION
  return `${project.title} is a complete project:

- Tech Stack: ${project.tech.join(", ")}
- ${project.details?.deployment || "Full stack implementation"}

This project demonstrates my ability to build real-world applications.`;
}

function explainProject(level = 1) {
  const project = projects[0];

  if (level === 1) {
    return `${project.title} is a full stack application. ${project.description}`;
  }

  if (level === 2) {
    return `${project.title} uses ${project.tech.join(", ")}.

It includes:
- ${project.details?.frontend || ""}
- ${project.details?.backend || ""}
- ${project.details?.database || ""}`;
  }

  return `${project.title} is a real-world full stack project with:

- Tech stack: ${project.tech.join(", ")}
- Deployment: ${project.details?.deployment || "Handled deployment"}

This showcases my end-to-end development skills.`;
}

// -------------------- RESPONSE GENERATOR --------------------

function generateResponse(intent) {
  switch (intent) {
    case "greeting":
      return randomize([
        "Hi, I'm Priyanka. You can ask me about my skills, projects, or experience.",
        "Hello! I'm Priyanka, a full stack developer. What would you like to know?",
        "Hey! Feel free to explore my work and projects."
      ]);

    case "howareyou":
      return randomize([
        "I'm doing well. What about you?",
        "All good here! Want to talk about my projects?",
        "Doing great! Ask me anything about my work."
      ]);

    case "name":
      return `I'm ${resume.name}, a ${resume.role}.`;

    case "summary":
      return resume.summary;

    case "skills":
      lastTopic = "skills";
      detailLevel = 1;

      return `I work across frontend and backend.

Frontend: ${resume.skills.frontend.join(", ")}
Backend: ${resume.skills.backend.join(", ")}
Database: ${resume.skills.database.join(", ")}
Tools: ${resume.skills.tools.join(", ")}`;

    case "projects":
      lastTopic = "projects";
      detailLevel = 1;

      return {
        type: "projects",
        message:
          "Here are some of my projects 👇\n\nDo you want me to explain any specific project?",
        data: projects,
      };

    case "experience":
      return `I worked as a ${resume.experience[0].role} at ${resume.experience[0].company} (${resume.experience[0].duration}), where I gained practical development experience.`;

    case "education":
      return `I'm pursuing ${resume.education.degree}.

12th: ${resume.education.hsc}
10th: ${resume.education.ssc}`;

    case "contact":
      return `You can reach me here:

Email: ${resume.contact.email}
GitHub: ${resume.contact.github}
LinkedIn: ${resume.contact.linkedin}`;

    case "thanks":
      return randomize([
        "You're welcome!",
        "Happy to help!",
        "Glad I could help 😊"
      ]);

    case "bye":
      return randomize([
        "Goodbye! Have a great day!",
        "See you later!",
        "Bye! Feel free to come back anytime."
      ]);

    case "joke":
      return "Why do developers hate bugs? Because they prefer features 😄";

    case "more":
      if (!lastTopic) {
        return "What would you like more details about?";
      }

      detailLevel++;

      if (lastTopic === "projects") {
        return explainProject(detailLevel);
      }

      if (lastTopic === "project-specific") {
        const project = findProjectFromMessage(lastUserMessage);
        return getProjectResponse(project, detailLevel);
      }

      if (lastTopic === "skills") {
        return "I use these skills to build scalable and efficient applications across frontend and backend.";
      }

      return "Tell me what you'd like to explore further.";

    default:
      return null;
  }
}

// -------------------- MAIN FUNCTION --------------------

function askAI(question) {
  lastUserMessage = question;

  // 🎯 Project-specific detection FIRST
  const matchedProject = findProjectFromMessage(question);
  if (matchedProject) {
    lastTopic = "project-specific";
    detailLevel = 1;
    lastIntent = "projects";
    return getProjectResponse(matchedProject, detailLevel);
  }

  const intent = detectBestIntent(question);
  let response = generateResponse(intent);

  if (!response) {
    response = randomize([
      "I didn't fully understand that. You can ask about my projects, skills, or experience.",
      "Try asking something like 'Tell me about your projects'.",
      "I'm here to help! Ask me about my work or skills."
    ]);
  }

  lastIntent = intent;
  return response;
}

module.exports = askAI;