/* ============================================
   Portfolio Data — Soham Kolhe
   Centralized content for the portfolio
   ============================================ */

export const personalInfo = {
  name: "Soham Kolhe",
  firstName: "Soham",
  lastName: "Kolhe",
  tagline: "Full-Stack Developer & Cloud Engineer",
  subtitle: "Building scalable systems with MERN, Azure & Docker",
  heroQuote: "Welcome to the Grid. I build the future.",
  location: "Vadodara, Gujarat, India",
  email: "sohamkolhe20@gmail.com",
  resumeLink: "/resume.pdf",
  bio: [
    "I'm a Computer Science student passionate about building systems that scale. With a strong foundation in MERN stack development and cloud engineering, I bring ideas from concept to deployment.",
    "Currently pursuing my B.Tech at Parul University while actively exploring DevOps, AI, and Cloud-Native technologies. I believe in building things that matter — and making them work flawlessly."
  ],
  education: {
    degree: "B.Tech in Computer Science & Engineering",
    university: "Parul University, Vadodara",
    year: "2023 — 2027 (Expected)",
    cgpa: "8.58 / 10"
  }
};

export const socialLinks = [
  {
    name: "GitHub",
    url: "https://github.com/soham-kolhe",
    icon: "github"
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/soham-kolhe3318",
    icon: "linkedin"
  },
  {
    name: "LeetCode",
    url: "https://leetcode.com/u/Soham_Kolhe/",
    icon: "code"
  },
  {
    name: "Twitter / X",
    url: "https://x.com/SohamKolhe10489",
    icon: "twitter"
  },
  {
    name: "Email",
    url: "mailto:sohamkolhe20@gmail.com",
    icon: "mail"
  }
];

export const skills = {
  languages: {
    label: "Languages",
    icon: "⌨️",
    items: ["Java", "JavaScript", "TypeScript", "SQL"]
  },
  frontend: {
    label: "Frontend",
    icon: "🖥️",
    items: ["React", "Vite", "HTML5", "CSS3", "Tailwind CSS", "Three.js"]
  },
  backend: {
    label: "Backend",
    icon: "⚙️",
    items: ["Node.js", "Express.js", "REST APIs", "Socket.io"]
  },
  databases: {
    label: "Databases",
    icon: "🗄️",
    items: ["MongoDB", "PostgreSQL", "Pinecone Vector DB"]
  },
  cloud: {
    label: "Cloud & Azure",
    icon: "☁️",
    items: ["Azure App Service", "Azure Functions", "Azure OpenAI", "Azure Storage"]
  },
  devops: {
    label: "DevOps",
    icon: "🚀",
    items: ["Docker", "Docker Compose", "Git", "GitHub", "CI/CD", "Kubernetes (Learning)"]
  },
  ai: {
    label: "AI / ML",
    icon: "🤖",
    items: ["LangChain", "RAG Pipeline", "GPT Models", "Prompt Engineering", "Embeddings", "Semantic Search"]
  },
  tools: {
    label: "Dev Tools",
    icon: "🛠️",
    items: ["VS Code", "Postman", "Docker Desktop", "MySQL Workbench", "Git"]
  }
};

export const projects = [
  {
    id: "ai-second-brain",
    title: "AI Second Brain",
    codename: "OPERATION: NEURAL LINK",
    classification: "TOP SECRET",
    type: "Full Stack AI Application",
    status: "DEPLOYED",
    description: "An AI-powered knowledge assistant that ingests documents, builds vector embeddings, and enables semantic search, AI-powered Q&A, automatic summaries, and flashcard generation using a RAG pipeline.",
    problem: "Information overload — no way to query personal documents intelligently and get contextual answers.",
    approach: "Built a complete RAG pipeline with LangChain + Pinecone + Azure OpenAI (GPT-4). Designed document ingestion with automatic chunking and vector embedding generation.",
    outcome: "50+ pages/min ingestion speed. Reduced hallucinations significantly through prompt engineering. Fully Dockerized deployment.",
    tech: ["React", "Node.js", "Express.js", "MongoDB", "LangChain", "Pinecone", "Azure OpenAI", "GPT-4", "Docker"],
    features: [
      "PDF document ingestion & auto-chunking",
      "Semantic search with vector embeddings",
      "AI-powered Q&A with GPT-4",
      "Automatic summary generation",
      "Flashcard generation",
      "Dockerized deployment"
    ],
    github: "https://github.com/soham-kolhe",
    color: "cyan"
  },
  {
    id: "collabboard",
    title: "CollabBoard",
    codename: "OPERATION: SYNC STREAM",
    classification: "CLASSIFIED",
    type: "Real-Time Collaboration Tool",
    status: "DEPLOYED",
    description: "A real-time collaborative whiteboard allowing multiple users to draw simultaneously over the web with tools like freehand, shapes, text, and remote cursors.",
    problem: "No lightweight, real-time collaborative drawing tool for remote teams.",
    approach: "WebSocket architecture with Socket.io for real-time sync. Canvas API for drawing. Multi-user state management with conflict resolution.",
    outcome: "Real-time multi-user whiteboard with full drawing toolkit, undo/redo, and remote cursor tracking.",
    tech: ["React", "TypeScript", "Vite", "Tailwind CSS", "Node.js", "Express.js", "Socket.io", "MongoDB"],
    features: [
      "Multi-user real-time collaboration",
      "Freehand, rectangle, ellipse tools",
      "Text tool & eraser",
      "Undo / Redo support",
      "Remote cursor tracking",
      "Persistent drawing storage"
    ],
    github: "https://github.com/soham-kolhe",
    color: "magenta"
  },
  {
    id: "hospital-is",
    title: "Hospital Information System",
    codename: "OPERATION: MED GRID",
    classification: "RESTRICTED",
    type: "Enterprise Healthcare Platform",
    status: "IN DEVELOPMENT",
    description: "A comprehensive hospital management platform designed to digitize and streamline hospital operations with 12 integrated modules.",
    problem: "Hospital operations rely on fragmented, manual systems causing data silos and inefficiency.",
    approach: "Modular architecture with separate modules for OPD, IPD, Emergency, Pharmacy, Billing, and more. Dual-database approach with MongoDB and PostgreSQL.",
    outcome: "Comprehensive digital platform covering 12 hospital modules with analytics dashboard.",
    tech: ["React", "Tailwind CSS", "Express.js", "MongoDB", "PostgreSQL"],
    features: [
      "OPD / IPD management",
      "Emergency module",
      "Pharmacy & billing",
      "Insurance processing",
      "Radiology & laboratory",
      "Analytics dashboard"
    ],
    github: "https://github.com/soham-kolhe",
    color: "green"
  }
];

export const certifications = [
  {
    title: "Azure Administrator Associate",
    code: "AZ-104",
    issuer: "Microsoft",
    icon: "🏆",
    level: "Associate",
    color: "cyan"
  },
  {
    title: "Azure AI Fundamentals",
    code: "AI-900",
    issuer: "Microsoft",
    icon: "🤖",
    level: "Fundamentals",
    color: "magenta"
  },
  {
    title: "Azure Fundamentals",
    code: "AZ-900",
    issuer: "Microsoft",
    icon: "☁️",
    level: "Fundamentals",
    color: "cyan"
  },
  {
    title: "Azure Data Fundamentals",
    code: "DP-900",
    issuer: "Microsoft",
    icon: "📊",
    level: "Fundamentals",
    color: "green"
  },
  {
    title: "Security, Compliance & Identity",
    code: "SC-900",
    issuer: "Microsoft",
    icon: "🛡️",
    level: "Fundamentals",
    color: "magenta"
  },
  {
    title: "Computer Networks (Elite)",
    code: "NPTEL",
    issuer: "NPTEL / IIT",
    icon: "🌐",
    level: "Elite",
    color: "gold"
  },
  {
    title: "UX Design Job Simulation",
    code: "SIM",
    issuer: "Lloyds Banking Group",
    icon: "🎨",
    level: "Completion",
    color: "cyan"
  }
];

export const navItems = [
  { label: "Home", href: "#hero", icon: "home" },
  { label: "About", href: "#about", icon: "user" },
  { label: "Skills", href: "#skills", icon: "cpu" },
  { label: "Projects", href: "#projects", icon: "folder" },
  { label: "Certs", href: "#certifications", icon: "award" },
  { label: "Contact", href: "#contact", icon: "send" }
];
