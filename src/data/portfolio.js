/* ============================================
   Portfolio Data — Soham Kolhe
   Centralized content for the portfolio
   ============================================ */

export const personalInfo = {
  name: "Soham Kolhe",
  firstName: "Soham",
  lastName: "Kolhe",
  role: "Full-Stack Developer & Cloud Engineer",
  focus: "SDE & DevOps Roles",
  tagline: "Full-Stack & Cloud Engineer building containerized pipelines, applied AI interfaces, and resilient web platforms.",
  heroQuote: "Welcome to the Grid. I build the future.",
  location: "Vadodara, Gujarat, India",
  email: "sohamkolhe20@gmail.com",
  formspreeId: "", // Paste your Formspree form ID here (e.g. "xqnqjdyy") to receive form submissions
  resumeLink: "/resume.pdf",
  bio: [
    [
      { text: "I'm a Computer Science student who builds full systems end to end — from a RAG pipeline that ingests documents at 50+ pages/min to a WebSocket-based collaborative whiteboard handling real-time multi-user state. My background is MERN stack development paired with Azure cloud infrastructure, Docker containerization, and CI/CD pipelines." }
    ],
    [
      { text: "I'm currently completing my B.Tech at Parul University while working through DevOps practices (Docker, CI/CD, Kubernetes fundamentals), applied AI, and cloud-native tooling outside the classroom — five Azure certifications so far. " },
      { text: "I care most about the part after 'it works on my machine': containerizing it, handling the edge cases, and shipping something someone else can actually use.", bold: true }
    ]
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
    name: "Microsoft Learn",
    url: "https://learn.microsoft.com/en-us/users/sohamkolhe-0425/",
    icon: "microsoft"
  },
  {
    name: "Twitter / X",
    url: "https://x.com/SohamKolhe10489",
    icon: "twitter"
  },
  {
    name: "LeetCode",
    url: "https://leetcode.com/u/Soham_Kolhe/",
    icon: "code"
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
    items: [
      { name: "Java", level: "core", proof: "DS / Algos & Academic Labs" },
      { name: "JavaScript", level: "core", proof: "Used in All Projects" },
      { name: "TypeScript", level: "core", proof: "CollabBoard" },
      { name: "SQL", level: "proficient", proof: "Hospital Information System" }
    ]
  },
  devops: {
    label: "DevOps",
    icon: "🚀",
    items: [
      { name: "Docker", level: "core", proof: "AI Second Brain, Hospital IS" },
      { name: "Docker Compose", level: "core", proof: "AI Second Brain" },
      { name: "Git", level: "core", proof: "Used in All Projects" },
      { name: "GitHub", level: "core", proof: "Open Source Contributions" },
      { name: "CI/CD", level: "proficient", proof: "Vercel & Workflow Automations" },
      { name: "Kubernetes", level: "learning", proof: "Minikube Orchestration" }
    ]
  },
  cloud: {
    label: "Cloud & Azure",
    icon: "☁️",
    items: [
      { name: "Azure App Service", level: "core", proof: "Cloud deployments" },
      { name: "Azure Functions", level: "proficient", proof: "Serverless triggers" },
      { name: "Azure OpenAI", level: "proficient", proof: "AI Second Brain" },
      { name: "Azure Storage", level: "proficient", proof: "Document asset blobs" }
    ]
  },
  backend: {
    label: "Backend",
    icon: "⚙️",
    items: [
      { name: "Node.js", level: "core", proof: "AI Second Brain, CollabBoard" },
      { name: "Express.js", level: "core", proof: "AI Second Brain, CollabBoard, Hospital IS" },
      { name: "REST APIs", level: "core", proof: "AI Second Brain, Hospital IS" },
      { name: "Socket.io", level: "proficient", proof: "CollabBoard" }
    ]
  },
  databases: {
    label: "Databases",
    icon: "🗄️",
    items: [
      { name: "MongoDB", level: "core", proof: "AI Second Brain, CollabBoard, Hospital IS" },
      { name: "PostgreSQL", level: "proficient", proof: "Hospital Information System" },
      { name: "Pinecone Vector DB", level: "proficient", proof: "AI Second Brain" }
    ]
  },
  frontend: {
    label: "Frontend",
    icon: "🖥️",
    items: [
      { name: "React", level: "core", proof: "AI Second Brain, CollabBoard, Hospital IS" },
      { name: "Vite", level: "core", proof: "CollabBoard" },
      { name: "HTML5", level: "core", proof: "All Web Projects" },
      { name: "CSS3", level: "core", proof: "Custom styling sheets" },
      { name: "Tailwind CSS", level: "proficient", proof: "CollabBoard, Hospital IS" },
      { name: "Three.js", level: "learning", proof: "Custom 3D Scene background" }
    ]
  },
  ai: {
    label: "AI / ML",
    icon: "🤖",
    items: [
      { name: "LangChain", level: "proficient", proof: "AI Second Brain" },
      { name: "RAG Pipeline", level: "proficient", proof: "AI Second Brain" },
      { name: "GPT Models", level: "proficient", proof: "AI Second Brain" },
      { name: "Prompt Engineering", level: "proficient", proof: "AI Second Brain" },
      { name: "Embeddings", level: "proficient", proof: "AI Second Brain" },
      { name: "Semantic Search", level: "proficient", proof: "AI Second Brain" }
    ]
  },
  tools: {
    label: "Dev Tools",
    icon: "🛠️",
    items: [
      { name: "VS Code", level: "core", proof: "Primary IDE" },
      { name: "Postman", level: "core", proof: "API endpoint testing" },
      { name: "MySQL Workbench", level: "proficient", proof: "Local DB design" }
    ]
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
    image: "/images/ai-second-brain.jpg",
    stats: [
      { label: "Ingestion Speed", value: "50+ p/m" },
      { label: "Deployment", value: "Dockerized" },
      { label: "Scale", value: "1,200+ docs parsed" }
    ],
    description: "An AI-powered knowledge assistant that ingests documents, builds vector embeddings, and enables semantic search, AI-powered Q&A, automatic summaries, and flashcard generation using a RAG pipeline.",
    problem: "Information overload — no way to query personal documents intelligently and get contextual answers.",
    approach: "Built a complete RAG pipeline with LangChain + Pinecone + Azure OpenAI (GPT-4). Designed document ingestion with automatic chunking and vector embedding generation.",
    outcome: "50+ pages/min ingestion speed. Reduced hallucinations through retrieval-grounded prompting and context window optimization.",
    tech: ["React", "Node.js", "Express.js", "MongoDB", "LangChain", "Pinecone", "Azure OpenAI", "GPT-4", "Docker"],
    features: [
      "AI-powered Q&A with GPT-4 (Context-Grounding)",
      "Semantic search with Pinecone vector embeddings",
      "PDF document ingestion & auto-chunking pipeline",
      "Dockerized deployment setup",
      "Automatic summary generation",
      "Personalized flashcard generation"
    ],
    github: "https://github.com/soham-kolhe/AI-Second-Brain",
    live: "",
    color: "cyan"
  },
  {
    id: "collabboard",
    title: "CollabBoard",
    codename: "OPERATION: SYNC STREAM",
    classification: "CLASSIFIED",
    type: "Real-Time Collaboration Tool",
    status: "DEPLOYED",
    image: "/images/collabboard.jpg",
    stats: [
      { label: "Sync Latency", value: "< 50ms" },
      { label: "State Sync", value: "Real-Time" },
      { label: "Scale", value: "100+ sessions" }
    ],
    description: "A real-time collaborative whiteboard allowing multiple users to draw simultaneously over the web with tools like freehand, shapes, text, and remote cursors.",
    problem: "No lightweight, real-time collaborative drawing tool for remote teams.",
    approach: "WebSocket architecture with Socket.io for real-time sync. Canvas API for drawing. Multi-user state management with conflict resolution.",
    outcome: "Real-time multi-user whiteboard with full drawing toolkit, undo/redo, and remote cursor tracking.",
    tech: ["React", "TypeScript", "Vite", "Tailwind CSS", "Node.js", "Express.js", "Socket.io", "MongoDB"],
    features: [
      "Multi-user real-time collaboration via WebSockets",
      "Remote cursor tracking & sync latency < 50ms",
      "Conflict-resolved canvas state synchronization",
      "Persistent drawing storage & session recovery",
      "Interactive shapes, text, and drawing tools",
      "Multi-step undo / redo canvas support"
    ],
    github: "https://github.com/soham-kolhe/CollabBoard",
    live: "",
    color: "magenta"
  },
  {
    id: "hospital-is",
    title: "Hospital Information System",
    codename: "OPERATION: MED GRID",
    classification: "RESTRICTED",
    type: "Enterprise Healthcare Platform",
    status: "IN DEVELOPMENT",
    image: "/images/hospital-is.jpg",
    stats: [
      { label: "Active Modules", value: "12 Modules" },
      { label: "Architecture", value: "Dual DB" },
      { label: "Orchestration", value: "Minikube" }
    ],
    description: "A comprehensive hospital management platform designed to digitize and streamline hospital operations with 12 integrated modules.",
    problem: "Hospital operations rely on fragmented, manual systems causing data silos and inefficiency.",
    approach: "Modular architecture with separate modules for OPD, IPD, Emergency, Pharmacy, Billing, and more. Dual-database approach with MongoDB and PostgreSQL.",
    outcome: "Comprehensive digital platform covering 12 hospital modules, containerized for local orchestration.",
    tech: ["React", "Tailwind CSS", "Express.js", "MongoDB", "PostgreSQL", "Docker", "Kubernetes"],
    features: [
      "Docker containerization & Minikube orchestration config",
      "OPD / IPD patient cycle management",
      "Emergency room triage & coordination system",
      "Integrated pharmacy, billing & insurance processing",
      "Radiology & laboratory logging modules",
      "Unified hospital-wide dual DB analytics dashboard"
    ],
    github: "https://github.com/soham-kolhe/Hospital-Information-System",
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
    color: "cyan",
    date: "Jan 2026",
    verifyUrl: "https://learn.microsoft.com/en-us/users/sohamkolhe-0425/credentials/"
  },
  {
    title: "Azure AI Fundamentals",
    code: "AI-900",
    issuer: "Microsoft",
    icon: "🤖",
    level: "Fundamentals",
    color: "magenta",
    date: "Nov 2025",
    verifyUrl: "https://learn.microsoft.com/en-us/users/sohamkolhe-0425/credentials/"
  },
  {
    title: "Azure Fundamentals",
    code: "AZ-900",
    issuer: "Microsoft",
    icon: "☁️",
    level: "Fundamentals",
    color: "cyan",
    date: "Jul 2024",
    verifyUrl: "https://learn.microsoft.com/en-us/users/sohamkolhe-0425/credentials/"
  },
  {
    title: "Azure Data Fundamentals",
    code: "DP-900",
    issuer: "Microsoft",
    icon: "📊",
    level: "Fundamentals",
    color: "green",
    date: "Sep 2025",
    verifyUrl: "https://learn.microsoft.com/en-us/users/sohamkolhe-0425/credentials/"
  },
  {
    title: "Security, Compliance & Identity",
    code: "SC-900",
    issuer: "Microsoft",
    icon: "🛡️",
    level: "Fundamentals",
    color: "magenta",
    date: "Oct 2025",
    verifyUrl: "https://learn.microsoft.com/en-us/users/sohamkolhe-0425/credentials/"
  },
  {
    title: "Computer Networks (Elite)",
    code: "NPTEL",
    issuer: "NPTEL / IIT",
    icon: "🌐",
    level: "Elite",
    color: "gold",
    date: "Apr 2024",
    verifyUrl: "https://nptel.ac.in/noc/"
  },
  {
    title: "UX Design Job Simulation",
    code: "SIM",
    issuer: "Lloyds Banking Group",
    icon: "🎨",
    level: "Completion",
    color: "cyan",
    date: "Dec 2025",
    verifyUrl: "https://www.theforage.com/simulations/lloyds-banking-group/ux-design-simulation-nz7i"
  }
];

export const navItems = [
  { label: "Home", href: "#hero", icon: "home" },
  { label: "About", href: "#about", icon: "user" },
  { label: "Projects", href: "#projects", icon: "folder" },
  { label: "Open Source", href: "#open-source", icon: "code" },
  { label: "Certs", href: "#certifications", icon: "award" },
  { label: "Skills", href: "#skills", icon: "cpu" },
  { label: "Contact", href: "#contact", icon: "send" }
];

export const openSourceContributions = [
  {
    id: "privateboard",
    repo: "PrivateBoard",
    codename: "OPERATION: OPEN GRID",
    classification: "CONTRIBUTOR",
    repoPath: "lexasub/PrivateBoard",
    description: "A private workspace and board management application featuring real-time auto-saving and collaborative features.",
    contributions: [
      {
        text: "Added confirmation dialogs before deleting boards to prevent accidental data loss",
        issue: "#5",
        status: "merged",
        url: "https://github.com/lexasub/PrivateBoard/pull/5"
      },
      {
        text: "Implemented multi-select functionality for bulk deletion of boards",
        issue: "#6",
        status: "merged",
        url: "https://github.com/lexasub/PrivateBoard/pull/6"
      },
      {
        text: "Improved the auto-save status indicator with dynamic states (Saved, Saving, Failed)",
        issue: "#9",
        status: "merged",
        url: "https://github.com/lexasub/PrivateBoard/pull/9"
      }
    ],
    tech: ["React", "JavaScript", "Node.js"],
    prCount: "3",
    repoUrl: "https://github.com/lexasub/PrivateBoard",
    contributionsUrl: "https://github.com/lexasub/PrivateBoard/pulls?q=is%3Apr+author%3Asoham-kolhe",
    color: "cyan"
  }
];
