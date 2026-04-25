const projects = [
  {
    id: 1,
    title: "Banis Bakery",
    tech: ["HTML", "Tailwind CSS", "JavaScript", "Node.js", "Express.js", "MySQL"],
    description:
      "Full stack web application built for an international business with responsive UI and backend API integration.",
    link: "https://banisbakery-project-nwhi2igeq-priyankas-projects-a6a1fab7.vercel.app/",
    github: "https://github.com/9940-pg/Banisbakery-project",
    image: "/images/banisbakery.png", // ✅ FIXED
    details: {
      frontend: "Responsive UI with clean design and smooth UX",
      backend: "REST APIs using Node.js and Express",
      database: "MySQL integration with structured data handling",
      deployment: "Deployed on Vercel using Git workflow",
    },
  },

  {
    id: 2,
    title: "Filter Generator",
    tech: ["HTML", "Tailwind CSS", "JavaScript", "GSAP"],
    description:
      "Interactive UI tool with animation-based effects and real-time visual feedback.",
    link: "https://9940-pg.github.io/Filter-generator/",
    github: "https://github.com/9940-pg/Filter-generator",
    image: "/images/filtergenerator.png", // ✅ FIXED
    details: {
      frontend: "Responsive UI with smooth animations",
      animations: "GSAP-based transitions and interactivity",
    },
  },

  {
    id: 3,
    title: "Magnolia Bakery",
    tech: ["HTML", "CSS", "Bootstrap", "JavaScript"],
    description:
      "Responsive website with clean UI and cross-browser compatibility.",
    link: "https://9940-pg.github.io/Magnolia-Bakery-Site/",
    github: "https://github.com/9940-pg/Magnolia-Bakery-Site",
    image: "/images/magnoliabakery.png", // ✅ FIXED
    details: {
      frontend: "Bootstrap-based layout",
      ui: "Clean and visually appealing design",
      compatibility: "Cross-browser support",
    },
  },

  {
    id: 4,
    title: "Portfolio Website",
    tech: ["HTML", "CSS", "JavaScript"],
    description:
      "Personal portfolio showcasing projects, skills, and responsive design.",
    link: "https://9940-pg.github.io/Priyanka-PORTFOLIO/",
    github: "https://github.com/9940-pg/Priyanka-PORTFOLIO",
    image: "/images/portfolio.png", // ✅ FIXED
    details: {
      frontend: "Responsive layout with interactive UI",
      purpose: "Showcases projects and skills",
    },
  },
];

module.exports = projects;