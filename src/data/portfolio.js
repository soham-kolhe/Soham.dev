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
      { text: "I'm a Computer Science student who builds full systems end to end — from a RAG pipeline ingesting 50+ pages/min to a WebSocket collaborative whiteboard syncing multi-user state in real time. My stack is MERN + Azure cloud, Docker, and CI/CD pipelines." }
    ],
    [
      { text: "Currently completing my B.Tech at Parul University while earning Azure certifications (five so far) and going deeper on DevOps, applied AI, and cloud-native tooling outside the classroom. " },
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
      { name: "TypeScript", level: "core", proof: "CollabBoard", proofProjectId: "collabboard" },
      { name: "SQL", level: "proficient", proof: "Hospital Information System", proofProjectId: "hospital-is" }
    ]
  },
  devops: {
    label: "DevOps",
    icon: "🚀",
    items: [
      { name: "Docker", level: "core", proof: "AI Second Brain, Hospital IS", proofProjectId: "ai-second-brain" },
      { name: "Docker Compose", level: "core", proof: "AI Second Brain", proofProjectId: "ai-second-brain" },
      { name: "Git", level: "core", proof: "Used in All Projects" },
      { name: "GitHub", level: "core", proof: "Open Source Contributions" },
      { name: "CI/CD", level: "proficient", proof: "Vercel & Workflow Automations" },
      { name: "Kubernetes", level: "learning", proof: "Minikube Orchestration", proofProjectId: "hospital-is" }
    ]
  },
  cloud: {
    label: "Cloud & Azure",
    icon: "☁️",
    items: [
      { name: "Azure App Service", level: "core", proof: "Cloud deployments" },
      { name: "Azure Functions", level: "proficient", proof: "Serverless triggers" },
      { name: "Azure OpenAI", level: "proficient", proof: "AI Second Brain", proofProjectId: "ai-second-brain" },
      { name: "Azure Storage", level: "proficient", proof: "Document asset blobs" }
    ]
  },
  backend: {
    label: "Backend",
    icon: "⚙️",
    items: [
      { name: "Node.js", level: "core", proof: "AI Second Brain, CollabBoard", proofProjectId: "ai-second-brain" },
      { name: "Express.js", level: "core", proof: "AI Second Brain, CollabBoard, Hospital IS", proofProjectId: "ai-second-brain" },
      { name: "REST APIs", level: "core", proof: "AI Second Brain, Hospital IS", proofProjectId: "ai-second-brain" },
      { name: "Socket.io", level: "proficient", proof: "CollabBoard", proofProjectId: "collabboard" }
    ]
  },
  databases: {
    label: "Databases",
    icon: "🗄️",
    items: [
      { name: "MongoDB", level: "core", proof: "AI Second Brain, CollabBoard, Hospital IS", proofProjectId: "ai-second-brain" },
      { name: "PostgreSQL", level: "proficient", proof: "Hospital Information System", proofProjectId: "hospital-is" },
      { name: "Pinecone Vector DB", level: "proficient", proof: "AI Second Brain", proofProjectId: "ai-second-brain" }
    ]
  },
  frontend: {
    label: "Frontend",
    icon: "🖥️",
    items: [
      { name: "React", level: "core", proof: "AI Second Brain, CollabBoard, Hospital IS", proofProjectId: "ai-second-brain" },
      { name: "Vite", level: "core", proof: "CollabBoard", proofProjectId: "collabboard" },
      { name: "HTML5", level: "core", proof: "All Web Projects" },
      { name: "CSS3", level: "core", proof: "Custom styling sheets" },
      { name: "Tailwind CSS", level: "proficient", proof: "CollabBoard, Hospital IS", proofProjectId: "collabboard" },
      { name: "Three.js", level: "learning", proof: "Custom 3D Scene background" }
    ]
  },
  ai: {
    label: "AI / ML",
    icon: "🤖",
    items: [
      { name: "LangChain", level: "proficient", proof: "AI Second Brain", proofProjectId: "ai-second-brain" },
      { name: "RAG Pipeline", level: "proficient", proof: "AI Second Brain", proofProjectId: "ai-second-brain" },
      { name: "GPT Models", level: "proficient", proof: "AI Second Brain", proofProjectId: "ai-second-brain" },
      { name: "Prompt Engineering", level: "proficient", proof: "AI Second Brain", proofProjectId: "ai-second-brain" },
      { name: "Embeddings", level: "proficient", proof: "AI Second Brain", proofProjectId: "ai-second-brain" },
      { name: "Semantic Search", level: "proficient", proof: "AI Second Brain", proofProjectId: "ai-second-brain" }
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
    codename: "OPERATION: NEURAL_LINK",
    classification: "TOP SECRET",
    type: "Full Stack AI Application",
    status: "BUILD COMPLETE",
    image: "/images/ai-second-brain.png",
    stats: [
      { label: "PIPELINE", value: "RAG" },
      { label: "DEPLOYMENT", value: "Docker" },
      { label: "AUTH", value: "JWT" }
    ],
    description: "AI-powered learning platform built using Retrieval-Augmented Generation (RAG) that transforms uploaded PDFs into an intelligent searchable knowledge base.",
    problem: "Students struggle to search large collections of notes using <strong>traditional keyword search</strong>. Finding contextual answers across multiple documents becomes <strong>slow and inefficient</strong>.",
    approach: "Designed a complete <strong>RAG pipeline</strong> using <strong>Multer</strong>, <strong>pdfjs-dist</strong>, <strong>LangChain text splitters</strong>, <strong>OpenAI Embeddings</strong> and <strong>Pinecone Vector Database</strong>. Added <strong>JWT authentication</strong>, isolated <strong>multi-session chat history</strong> and <strong>Dockerized deployment</strong>.",
    outcome: "Delivered an end-to-end <strong>document intelligence platform</strong> supporting <strong>contextual Q&A</strong>, <strong>semantic retrieval</strong>, <strong>flashcard generation</strong>, <strong>MCQ creation</strong> and persistent <strong>multi-session conversations</strong>.",
    tech: ["React", "Node.js", "Express.js", "MongoDB", "LangChain", "Pinecone", "Azure OpenAI", "Docker"],
    features: [
      "<strong>Semantic search</strong> with Pinecone vector database",
      "<strong>PDF upload & automatic text chunking</strong> pipeline",
      "<strong>Flashcard generation</strong> from uploaded documents",
      "<strong>Automatic MCQ generation</strong> for self-testing",
      "<strong>Weak-topic analytics</strong> for targeted revision"
    ],
    github: "https://github.com/soham-kolhe/AI-Second-Brain",
    live: "https://github.com/soham-kolhe/AI-Second-Brain",
    color: "cyan"
  },
  {
    id: "collabboard",
    title: "CollabBoard",
    codename: "OPERATION: SYNCHRONIZE",
    classification: "RESTRICTED",
    type: "Real-Time Collaboration Platform",
    status: "BUILD COMPLETE",
    image: "/images/collabboard.png",
    stats: [
      { label: "REAL-TIME", value: "Socket.io" },
      { label: "PERSISTENCE", value: "MongoDB" },
      { label: "SECURITY", value: "JWT" }
    ],
    description: "A collaborative whiteboard enabling multiple users to draw together in real-time using WebSockets with persistent board storage.",
    problem: "Traditional drawing applications provide <strong>limited real-time collaboration</strong> and often <strong>lose board state</strong> when users disconnect or refresh the application.",
    approach: "Built a room-based <strong>Socket.io architecture</strong> with <strong>JWT authentication</strong>, <strong>board ownership</strong>, <strong>MongoDB persistence</strong> and <strong>Tldraw SDK integration</strong> to synchronize canvas operations across connected users.",
    outcome: "Created a collaborative platform supporting <strong>synchronized drawing</strong>, <strong>persistent whiteboards</strong>, <strong>secure room access</strong> and seamless <strong>multi-user interaction</strong>.",
    tech: ["React", "TypeScript", "Tldraw", "Node.js", "Express.js", "MongoDB", "Socket.io", "JWT"],
    features: [
      "<strong>Tldraw SDK integration</strong> with board CRUD APIs",
      "<strong>Live cursor tracking</strong> & multi-user canvas sync",
      "<strong>Board ownership</strong> & granular access control",
      "<strong>Multi-step Undo / Redo</strong> canvas state support"
    ],
    github: "https://github.com/soham-kolhe/CollabBoard",
    live: "https://github.com/soham-kolhe/CollabBoard",
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
    highlight: true,
    // TODO: Replace with your personal Credly / Microsoft Learn verification URL
    verifyUrl: "https://learn.microsoft.com/en-us/users/sohamkolhe-0425/credentials/",
    image: "/images/Az-104.png"
  },
  {
    title: "Azure AI Fundamentals",
    code: "AI-900",
    issuer: "Microsoft",
    icon: "🤖",
    level: "Fundamentals",
    color: "magenta",
    date: "Nov 2025",
    highlight: false,
    verifyUrl: "https://learn.microsoft.com/en-us/users/sohamkolhe-0425/credentials/",
    image: "/images/Ai-900.png"
  },
  {
    title: "Azure Fundamentals",
    code: "AZ-900",
    issuer: "Microsoft",
    icon: "☁️",
    level: "Fundamentals",
    color: "cyan",
    date: "Jul 2024",
    highlight: false,
    verifyUrl: "https://learn.microsoft.com/en-us/users/sohamkolhe-0425/credentials/",
    // TODO: Drop the real AZ-900 certificate screenshot at public/images/certs/az-900.png
    image: "/images/certs/az-900.png"
  },
  {
    title: "Azure Data Fundamentals",
    code: "DP-900",
    issuer: "Microsoft",
    icon: "📊",
    level: "Fundamentals",
    color: "green",
    date: "Sep 2025",
    highlight: false,
    verifyUrl: "https://learn.microsoft.com/en-us/users/sohamkolhe-0425/credentials/",
    image: "/images/DP-900.png"
  },
  {
    title: "Security, Compliance & Identity",
    code: "SC-900",
    issuer: "Microsoft",
    icon: "🛡️",
    level: "Fundamentals",
    color: "magenta",
    date: "Oct 2025",
    highlight: false,
    verifyUrl: "https://learn.microsoft.com/en-us/users/sohamkolhe-0425/credentials/",
    image: "/images/SC-900.png"
  },
  {
    title: "Computer Networks (Elite)",
    code: "NPTEL",
    issuer: "NPTEL / IIT",
    icon: "🌐",
    level: "Elite",
    color: "gold",
    date: "Apr 2024",
    highlight: false,
    verifyUrl: "https://nptel.ac.in/noc/",
    // TODO: Drop the real NPTEL certificate screenshot at public/images/certs/nptel.png
    image: "/images/certs/nptel.png"
  },
  {
    title: "UX Design Job Simulation",
    code: "SIM",
    issuer: "Lloyds Banking Group",
    icon: "🎨",
    level: "Completion",
    color: "cyan",
    date: "Dec 2025",
    highlight: false,
    verifyUrl: "https://www.theforage.com/simulations/lloyds-banking-group/ux-design-simulation-nz7i",
    // TODO: Drop the real Lloyds UX certificate screenshot at public/images/certs/lloyds-ux.png
    image: "/images/certs/lloyds-ux.png"
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
        id: "pr-5",
        folderName: "pr-5-delete-confirmation",
        title: "Board Deletion Confirmation Dialog",
        issue: "#5",
        status: "merged",
        url: "https://github.com/lexasub/PrivateBoard/pull/5",
        summary: "Added confirmation dialogs before deleting boards to prevent accidental data loss.",
        about: "Designed and integrated a safety modal prompt whenever a user initiates board deletion. Prevents accidental destruction of workspace boards and ensures explicit user confirmation before executing destructive API calls."
      },
      {
        id: "pr-6",
        folderName: "pr-6-multi-select-deletion",
        title: "Multi-Select Bulk Board Deletion",
        issue: "#6",
        status: "merged",
        url: "https://github.com/lexasub/PrivateBoard/pull/6",
        summary: "Implemented multi-select functionality for bulk deletion of boards.",
        about: "Added checkbox state management across the workspace dashboard, enabling users to select multiple boards simultaneously and trigger a batched bulk deletion action."
      },
      {
        id: "pr-9",
        folderName: "pr-9-autosave-indicator",
        title: "Dynamic Auto-Save Status Indicator",
        issue: "#9",
        status: "merged",
        url: "https://github.com/lexasub/PrivateBoard/pull/9",
        summary: "Improved the auto-save status indicator with dynamic states (Saved, Saving, Failed).",
        about: "Refactored the header sync status component to give real-time visual feedback ('Saving...', 'All changes saved', 'Sync failed, retrying') during background REST updates."
      }
    ],
    tech: ["React", "JavaScript", "Node.js"],
    prCount: "3",
    repoUrl: "https://github.com/lexasub/PrivateBoard",
    contributionsUrl: "https://github.com/lexasub/PrivateBoard/pulls?q=is%3Apr+author%3Asoham-kolhe",
    color: "cyan"
  }
];
