import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "../hooks/useReducedMotion";
import Stack from "./Stack";
import CountUp from "./CountUp";
import { Button } from "./ui/button";
import { ExternalLink, Layers, Sparkles, Maximize2, X, Terminal, ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface ProjectMetric {
  number: number;
  prefix?: string;
  suffix?: string;
  label: string;
}

interface ProjectSlide {
  title: string;
  tag: string;
  imageSrc?: string;
  description: string;
}

interface ProjectCaseStudy {
  id: string;
  indexNum: string;
  categoryTag: string;
  status: string;
  statusType: "shipped" | "building";
  title: string;
  summary: string;
  highlights: string[];
  techStack: string[];
  githubUrl: string;
  liveUrl?: string;
  metrics: ProjectMetric[];
  slides: ProjectSlide[];
}

const FEATURED_PROJECTS: ProjectCaseStudy[] = [
  {
    id: "collabboard",
    indexNum: "01 /",
    categoryTag: "REAL-TIME COLLABORATION • WEBSOCKETS • CANVAS ENGINE",
    status: "SHIPPED",
    statusType: "shipped",
    title: "CollabBoard",
    summary:
      "Full-stack real-time multiplayer whiteboard platform combining React, TypeScript, Node.js, and WebSockets — featuring room-based synchronization with live cursor tracking, an infinite vector canvas, JWT board access control, and persistent sessions.",
    highlights: [
      "Room-based WebSocket architecture broadcasting live cursor coordinates and strokes at <35ms latency.",
      "Tldraw infinite vector canvas integration supporting freehand sketching, geometrical shapes, text, and sticky notes.",
      "Stateless JWT board authentication with role-based access control and secure board ownership governance.",
      "Automatic board state serialization and resilient snapshot recovery backed by MongoDB document stores.",
      "Optimistic UI updates with conflict-free client synchronization across concurrent collaborators.",
    ],
    techStack: ["React", "TypeScript", "Tldraw", "Node.js", "Express", "Socket.io", "MongoDB", "JWT"],
    githubUrl: "https://github.com/soham-kolhe/CollabBoard",
    liveUrl: "https://github.com/soham-kolhe/CollabBoard",
    metrics: [
      { prefix: "<", number: 35, suffix: " ms", label: "CURSOR SYNC LATENCY" },
      { number: 60, suffix: " FPS", label: "CANVAS RENDER ENGINE" },
      { number: 100, suffix: "%", label: "ROOM STATE PERSISTENCE" },
    ],
    slides: [
      {
        title: "Authentication & Session Gateway",
        tag: "AUTH & ACCESS",
        imageSrc: "/images/collabboard1.png",
        description: "Stateless JWT authentication and secure user access management for private collaborative workspaces.",
      },
      {
        title: "Multi-Room Workspace Dashboard",
        tag: "ROOM MANAGEMENT",
        imageSrc: "/images/collabboard2.png",
        description: "Centralized workspace dashboard for managing, joining, and creating persistent board sessions.",
      },
      {
        title: "Multiplayer Real-Time Canvas",
        tag: "LIVE WORKSPACE",
        imageSrc: "/images/collabboard3.png",
        description: "Room-based WebSocket drawing with live multiplayer cursor presence and Tldraw vector rendering.",
      },
    ],
  },
  {
    id: "ai-second-brain",
    indexNum: "02 /",
    categoryTag: "RAG ARCHITECTURE • SEMANTIC SEARCH • LANGCHAIN & PINECONE",
    status: "BUILDING",
    statusType: "building",
    title: "AI Second Brain",
    summary:
      "Context-aware Retrieval-Augmented Generation (RAG) platform delivering precision answers from user-uploaded PDFs and documents with automated semantic chunking, Pinecone vector search, multi-session memory, and personalized weak-topic analytics.",
    highlights: [
      "Document ingestion pipeline with recursive text chunking and dense vector embedding generation.",
      "Pinecone vector database index enabling semantic similarity search in under 120ms.",
      "LangChain conversation orchestration maintaining contextual memory across multi-turn user queries.",
      "Automated study generator producing dynamic flashcards and adaptive MCQ assessments from raw course notes.",
      "Weak-topic analytics engine tracking concept mastery to guide targeted knowledge review.",
    ],
    techStack: ["React", "Node.js", "Express", "MongoDB", "LangChain", "Pinecone", "Docker"],
    githubUrl: "https://github.com/soham-kolhe",
    liveUrl: "https://github.com/soham-kolhe",
    metrics: [
      { prefix: "<", number: 120, suffix: " ms", label: "VECTOR RETRIEVAL TIME" },
      { number: 100, suffix: "%", label: "INGESTION ACCURACY" },
      { number: 4, suffix: "+", label: "STUDY & QUIZ MODES" },
    ],
    slides: [
      {
        title: "Semantic Vector Retrieval",
        tag: "RAG PLATFORM",
        imageSrc: "/images/ai-second-brain.png",
        description: "Real-time context-aware Q&A interface powered by Pinecone embeddings and LangChain.",
      },
      {
        title: "Document Ingestion Pipeline",
        tag: "DATA INGESTION",
        description: "Automated PDF/doc parsing, token normalization, and dense vector index generation.",
      },
      {
        title: "Adaptive Knowledge Testing",
        tag: "STUDY ANALYTICS",
        description: "Interactive flashcard generator and weak-topic concept score breakdown.",
      },
    ],
  },
];

const OTHER_PROJECTS = [
  {
    id: "causa",
    code: "03 /",
    title: "Causa Trace Engine",
    category: "Distributed Tracing & AI",
    status: "ACTIVE DEV",
    statusType: "building",
    description:
      "Distributed tracing and cloud observability ecosystem featuring a zero-code Java/Spring Boot OpenTelemetry auto-instrumentation plugin coupled with Azure AI Foundry LLMs to analyze telemetry graphs and generate actionable code fixes.",
    highlights: [
      "Zero-code Java / Spring Boot OpenTelemetry agent plugin (<2% CPU overhead)",
      "Azure AI Foundry integration analyzing distributed error stack traces for instant fixes",
      "High-throughput microservice span visualizer with latency topology heatmaps",
    ],
    techStack: ["Java 21", "Spring Boot", "OpenTelemetry", "Azure AI Foundry", "Docker"],
    githubUrl: "https://github.com/soham-kolhe",
  },
  {
    id: "parul-mediconnect",
    code: "04 /",
    title: "Parul MediConnect (HIS)",
    category: "Hospital Information System",
    status: "SHIPPED",
    statusType: "shipped",
    description:
      "Unified hospital management ecosystem digitizing clinical and administrative workflows — featuring electronic health records, conflict-free doctor appointment scheduling, prescription tracking, and role-based staff portals.",
    highlights: [
      "Modular healthcare portal digitizing outpatient/inpatient workflows and records",
      "Real-time doctor appointment engine with slot conflict prevention",
      "Role-based security segregating doctors, patients, pharmacists, and admins",
    ],
    techStack: ["React.js", "Node.js", "Express", "MongoDB", "Supabase", "Tailwind CSS"],
    githubUrl: "https://github.com/soham-kolhe/Parul_MediConnect",
    liveUrl: "https://github.com/soham-kolhe/Parul_MediConnect",
  },
];

interface SelectedWorkProps {
  sectionNumber?: string;
}

export const SelectedWork: React.FC<SelectedWorkProps> = ({
  sectionNumber = "02 /",
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  // Fullscreen image lightbox modal
  const [fullscreenImage, setFullscreenImage] = useState<{ src: string; title: string; tag: string } | null>(null);

  useEffect(() => {
    if (prefersReduced || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: { trigger: headerRef.current, start: "top 85%", once: true },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReduced]);

  // Helper to render slides for each project
  const renderStackCards = (project: ProjectCaseStudy) => {
    return project.slides.map((slide, i) => (
      <div
        key={`${project.id}-slide-${i}`}
        className="relative w-full h-full rounded-2xl overflow-hidden border border-brand-teal/30 bg-[#0B0D10] shadow-[0_15px_35px_rgba(0,0,0,0.9)] flex flex-col justify-between group/slide"
      >
        {slide.imageSrc ? (
          <div className="relative w-full h-full overflow-hidden bg-neutral-950">
            <img
              src={slide.imageSrc}
              alt={slide.title}
              className="w-full h-full object-cover object-top"
            />

            {/* Gradient Scrim Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#08090A] via-black/30 to-transparent pointer-events-none" />

            {/* Fullscreen zoom action */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setFullscreenImage({ src: slide.imageSrc!, title: slide.title, tag: slide.tag });
              }}
              className="absolute top-4 right-4 z-30 p-2 rounded-xl bg-black/70 hover:bg-brand-teal hover:text-black border border-white/20 text-neutral-300 transition-all backdrop-blur-md shadow-lg"
              title="View Fullscreen High-Resolution"
            >
              <Maximize2 className="w-4 h-4" />
            </button>

            {/* Bottom Caption Pill */}
            <div className="absolute bottom-5 left-5 right-5 z-20 pointer-events-none flex flex-col sm:flex-row sm:items-end justify-between gap-2">
              <div>
                <span className="font-mono text-[10px] text-brand-teal uppercase tracking-widest px-2.5 py-0.5 rounded bg-brand-teal/15 border border-brand-teal/30 backdrop-blur-md font-semibold">
                  {slide.tag}
                </span>
                <h4 className="text-lg sm:text-2xl font-bold text-white mt-1.5 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                  {slide.title}
                </h4>
                <p className="text-xs sm:text-sm text-neutral-300 line-clamp-2 mt-0.5 max-w-xl drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
                  {slide.description}
                </p>
              </div>
              <div className="hidden sm:flex items-center gap-1 text-[11px] font-mono text-neutral-400 bg-black/70 px-2.5 py-1 rounded-md border border-white/15 backdrop-blur-md">
                <span className="text-brand-teal font-semibold">SLIDE {i + 1}</span> / {project.slides.length}
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full h-full p-6 sm:p-10 flex flex-col justify-between bg-gradient-to-br from-[#101318] to-[#08090A]">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-brand-teal uppercase tracking-widest px-3 py-1 rounded bg-brand-teal/10 border border-brand-teal/25 font-semibold">
                {slide.tag}
              </span>
              <div className="flex items-center gap-1 text-xs font-mono text-neutral-400">
                <span className="text-brand-teal font-semibold">SLIDE {i + 1}</span> / {project.slides.length}
              </div>
            </div>

            <div className="my-auto py-6">
              <div className="w-12 h-12 rounded-xl bg-brand-teal/10 border border-brand-teal/30 flex items-center justify-center text-brand-teal mb-4 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
                <Layers className="w-6 h-6" />
              </div>
              <h4 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                {slide.title}
              </h4>
              <p className="text-sm sm:text-base text-neutral-400 leading-relaxed mt-3 max-w-lg">
                {slide.description}
              </p>
            </div>

            <div className="pt-4 border-t border-brand-cardBorder flex items-center justify-between text-xs font-mono text-neutral-400">
              <span>{project.title.toUpperCase()} ARCHITECTURE</span>
              <span className="text-brand-teal flex items-center gap-1">
                <span>✦ DRAG OR CLICK TO SHUFFLE</span>
              </span>
            </div>
          </div>
        )}
      </div>
    ));
  };

  return (
    <section
      ref={sectionRef}
      className="py-24 border-b border-brand-cardBorder relative overflow-hidden"
      data-purpose="selected-work-section"
      id="work"
    >
      {/* Background ambient lighting and laser traces */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-brand-teal/15 rounded-full blur-[140px]" />
        <div className="absolute top-2/3 right-1/4 w-[600px] h-[600px] bg-cyan-500/15 rounded-full blur-[140px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div
          ref={headerRef}
          className="flex flex-col md:flex-row md:items-end justify-between pb-12 border-b border-neutral-900 gap-6"
        >
          <div>
            <span className="font-mono text-xs text-brand-teal uppercase tracking-widest">
              {sectionNumber}
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mt-1">
              Selected Work
            </h2>
            <p className="text-neutral-400 font-normal text-sm mt-2 max-w-lg">
              Full-stack applications, real-time collaboration engines, and cloud observability systems.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-neutral-500 uppercase tracking-widest">
              FEATURED ENGINEERING SYSTEMS
            </span>
            <span className="w-2 h-2 rounded-full bg-brand-teal animate-pulse" />
          </div>
        </div>

        {/* Sequential Project Showcases (CollabBoard and AI Second Brain one after another) */}
        <div className="space-y-28 pt-12">
          {FEATURED_PROJECTS.map((project) => (
            <div key={project.id} className="space-y-8 relative">
              {/* Project Title & Status Bar with Tech HUD Corner Accents */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-neutral-800/80">
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-base sm:text-lg text-brand-teal font-semibold">
                    {project.indexNum}
                  </span>
                  <div>
                    <span className="font-mono text-[11px] text-brand-teal/80 tracking-widest block uppercase">
                      {project.categoryTag}
                    </span>
                    <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mt-0.5">
                      {project.title}
                    </h3>
                  </div>
                </div>

                {/* Status Tag: Shipped vs Building */}
                <div className="self-start sm:self-auto">
                  {project.statusType === "shipped" ? (
                    <span className="px-3.5 py-1 rounded-full text-xs font-mono font-semibold tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-2 shadow-[0_0_12px_rgba(16,185,129,0.15)]">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span>● SHIPPED</span>
                    </span>
                  ) : (
                    <span className="px-3.5 py-1 rounded-full text-xs font-mono font-semibold tracking-wider text-cyan-300 bg-cyan-500/10 border border-cyan-500/40 flex items-center gap-2 shadow-[0_0_12px_rgba(6,182,212,0.2)]">
                      <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                      <span>● BUILDING</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Fullscreen-Scale Expansive 3D Stack Viewport */}
              <div className="relative w-full max-w-6xl mx-auto">
                {/* HUD Themed Double-Border Container with Corner Brackets */}
                <div className="relative p-3 sm:p-4 rounded-3xl bg-[#080A0D]/90 border border-brand-teal/25 shadow-[0_20px_50px_rgba(0,0,0,0.85),0_0_30px_rgba(6,182,212,0.06)]">
                  {/* Tech Corner Brackets */}
                  <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-brand-teal/60 pointer-events-none rounded-tl-sm" />
                  <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-brand-teal/60 pointer-events-none rounded-tr-sm" />
                  <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-brand-teal/60 pointer-events-none rounded-bl-sm" />
                  <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-brand-teal/60 pointer-events-none rounded-br-sm" />

                  {/* 3D Stack Component */}
                  <div className="w-full h-[360px] sm:h-[480px] md:h-[560px] lg:h-[620px] relative">
                    <Stack
                      cards={renderStackCards(project)}
                      sensitivity={160}
                      randomRotation={true}
                      sendToBackOnClick={true}
                      autoplay={false}
                      pauseOnHover={true}
                      className="w-full h-full"
                    />
                  </div>

                  {/* Stack Info Bar */}
                  <div className="mt-3 flex items-center justify-between px-3 py-1 text-xs font-mono text-neutral-400">
                    <span className="flex items-center gap-1.5 text-neutral-300">
                      <Sparkles className="w-3.5 h-3.5 text-brand-teal" />
                      <span>Click or drag card to shuffle slides • Click zoom button for fullscreen</span>
                    </span>
                    <span className="hidden sm:inline text-neutral-500">
                      // {project.id.toUpperCase()}_STAGE
                    </span>
                  </div>
                </div>
              </div>

              {/* Narrative Summary */}
              <div className="max-w-6xl mx-auto pt-2">
                <p className="text-base sm:text-lg text-neutral-300 font-normal leading-relaxed border-l-2 border-brand-teal pl-4 sm:pl-5">
                  {project.summary}
                </p>
              </div>

              {/* 2-Column Technical Highlights & Tech Stack HUD Boxes */}
              <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2 items-start">
                {/* Left: Engineering Highlights (Themed HUD box) */}
                <div className="lg:col-span-8 p-6 rounded-2xl bg-gradient-to-br from-[#0E1116] to-[#0A0C0F] border border-brand-teal/20 shadow-sm relative space-y-4">
                  <div className="flex items-center justify-between border-b border-neutral-800/80 pb-3">
                    <div className="flex items-center gap-2">
                      <Terminal className="w-4 h-4 text-brand-teal" />
                      <span className="text-xs font-mono text-brand-teal uppercase tracking-widest font-semibold">
                        Key Architecture &amp; Capabilities
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-neutral-500">// ARCH_SPEC</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    {project.highlights.map((highlight, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2.5 p-3 rounded-xl bg-[#08090C] border border-neutral-800/80 text-xs text-neutral-300 leading-relaxed hover:border-brand-teal/40 transition-colors"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-teal mt-1.5 shrink-0" />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right: Tech Stack Pills & Action CTAs (Themed HUD box) */}
                <div className="lg:col-span-4 p-6 rounded-2xl bg-gradient-to-br from-[#0E1116] to-[#0A0C0F] border border-brand-teal/20 shadow-sm relative flex flex-col justify-between space-y-5">
                  <div>
                    <div className="flex items-center justify-between border-b border-neutral-800/80 pb-3 mb-4">
                      <span className="text-xs font-mono text-brand-teal uppercase tracking-widest font-semibold">
                        Tech Stack Matrix
                      </span>
                      <span className="text-[10px] font-mono text-neutral-500">// CORE_ENGINE</span>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded-md bg-[#08090C] border border-neutral-800 text-[11px] font-mono text-neutral-200"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2.5 pt-4 border-t border-neutral-800/80">
                    {project.githubUrl && (
                      <Button
                        asChild
                        variant="outline"
                        size="default"
                        className="w-full justify-center gap-2 border-brand-teal/30 bg-[#08090C] text-neutral-200 hover:text-white hover:border-brand-teal font-mono text-xs"
                      >
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                          </svg>
                          <span>GitHub Repository</span>
                        </a>
                      </Button>
                    )}

                    {project.liveUrl && (
                      <Button
                        asChild
                        variant="default"
                        size="default"
                        className="w-full justify-center gap-2 bg-brand-teal hover:bg-brand-teal/90 text-black font-mono text-xs font-semibold shadow-lg shadow-brand-teal/20"
                      >
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                          <span>View Live System</span>
                          <ExternalLink className="w-3.5 h-3.5 ml-1" />
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </div>

              {/* Bottom Themed Metrics HUD (3 Boxes with CountUp) */}
              <div className="max-w-6xl mx-auto pt-2 grid grid-cols-1 sm:grid-cols-3 gap-4">
                {project.metrics.map((metric, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-gradient-to-b from-[#0E1116] to-[#0A0C0F] border border-brand-teal/20 shadow-sm relative group hover:border-brand-teal/60 transition-all"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-brand-teal shadow-[0_0_8px_#06B6D4]" />
                        <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider">
                          Metric 0{idx + 1}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-neutral-600">// VERIFIED</span>
                    </div>

                    <div className="text-3xl sm:text-4xl font-bold font-mono text-white group-hover:text-brand-teal transition-colors flex items-baseline gap-0.5 tracking-tight">
                      {metric.prefix && <span>{metric.prefix}</span>}
                      <CountUp from={0} to={metric.number} duration={1.6} />
                      {metric.suffix && <span>{metric.suffix}</span>}
                    </div>

                    <div className="text-xs font-mono text-neutral-300 uppercase tracking-wider mt-1.5 font-medium">
                      {metric.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Other Projects Section (Only Causa and Parul MediConnect) */}
        <div className="pt-28">
          <div className="pb-8 border-b border-neutral-900 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="font-mono text-xs text-brand-teal uppercase tracking-widest">
                ADDITIONAL SYSTEMS &amp; ARCHITECTURES
              </span>
              <h3 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mt-1">
                Other Projects
              </h3>
            </div>
            <p className="text-neutral-400 font-normal text-xs sm:text-sm max-w-md">
              Distributed tracing, OTel auto-instrumentation, and hospital information workflows.
            </p>
          </div>

          {/* 2 Themed Cards for Causa and HIS */}
          <div className="pt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {OTHER_PROJECTS.map((proj) => (
              <div
                key={proj.id}
                className="p-6 sm:p-7 rounded-2xl bg-gradient-to-br from-[#0E1116] to-[#0A0C0F] border border-brand-teal/20 hover:border-brand-teal/60 transition-all group flex flex-col justify-between shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-neutral-800/80">
                    <span className="font-mono text-xs text-brand-teal font-semibold">
                      {proj.code} {proj.category.toUpperCase()}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold tracking-wider text-cyan-300 bg-cyan-500/10 border border-cyan-500/30">
                      ● {proj.status}
                    </span>
                  </div>

                  <h4 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-4 group-hover:text-brand-teal transition-colors">
                    {proj.title}
                  </h4>

                  <p className="text-sm text-neutral-300 leading-relaxed mt-2.5">
                    {proj.description}
                  </p>

                  <div className="space-y-2 mt-4 pt-4 border-t border-neutral-800/80">
                    {proj.highlights.map((h, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-neutral-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-teal mt-1 shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-neutral-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex flex-wrap gap-1.5">
                    {proj.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded bg-[#08090C] border border-neutral-800 text-[10px] font-mono text-neutral-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {proj.githubUrl && (
                    <a
                      href={proj.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-mono text-brand-teal hover:underline shrink-0"
                    >
                      <span>Explore Repository</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* High-Resolution Fullscreen Image Lightbox */}
      {fullscreenImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/90 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setFullscreenImage(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative w-full max-w-6xl max-h-[92vh] bg-[#0A0C0E] border border-brand-teal/40 rounded-2xl overflow-hidden shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-brand-cardBorder bg-[#0E1013]">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-semibold text-brand-teal uppercase tracking-wider px-2 py-0.5 rounded bg-brand-teal/10 border border-brand-teal/30">
                  {fullscreenImage.tag}
                </span>
                <span className="text-white font-bold text-base sm:text-lg">
                  {fullscreenImage.title}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setFullscreenImage(null)}
                className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white transition-colors"
                aria-label="Close fullscreen view"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Image Display */}
            <div className="flex-1 overflow-auto p-4 sm:p-6 bg-neutral-950 flex items-center justify-center">
              <img
                src={fullscreenImage.src}
                alt={fullscreenImage.title}
                className="w-full h-auto max-h-[75vh] object-contain rounded-lg shadow-inner"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
