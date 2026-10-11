import React from "react";
import { Badge } from "./ui/badge";
import { ExternalLink, Cpu, Network } from "lucide-react";
import { motion } from "motion/react";
import { useReducedMotion } from "../hooks/useReducedMotion";

export interface ProjectSpec {
  number?: string;
  name: string;
  tagline: string;
  problem: string;
  approach: string;
  outcome: string;
  stack: string[];
  links?: {
    repo?: string;
    live?: string;
  };
  canvasType?: "collab" | "ai" | "system";
  imageSrc?: string;
  reversed?: boolean;
}

interface ProjectCardProps {
  project: ProjectSpec;
  index?: number;
  reversed?: boolean;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, index = 0, reversed }) => {
  const {
    number = "01",
    name,
    tagline,
    problem,
    approach,
    outcome,
    stack,
    links,
    canvasType = "collab",
    imageSrc,
    reversed: projectReversed,
  } = project;

  const isReversed = reversed ?? projectReversed ?? (index % 2 === 1);
  const prefersReduced = useReducedMotion();

  return (
    <motion.div
      className="bg-brand-card border border-brand-cardBorder rounded-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 transition-shadow duration-300 project-card"
      whileHover={
        prefersReduced
          ? {}
          : { y: -6, boxShadow: "0 20px 60px -12px rgba(62, 207, 142, 0.08)" }
      }
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      style={{ willChange: "transform" }}
    >
      {/* Visual / Screenshot / Interactive Canvas Preview */}
      <div
        className={`lg:col-span-5 bg-[#0A0C0F] bg-whiteboard-grid border-b lg:border-b-0 ${
          isReversed ? "lg:order-2 lg:border-l" : "lg:order-1 lg:border-r"
        } border-brand-cardBorder p-6 sm:p-8 flex items-center justify-center relative min-h-[360px] overflow-hidden group project-canvas`}
      >
        {imageSrc ? (
          <div className="relative w-full h-full min-h-[280px] flex items-center justify-center">
            <div className="absolute inset-0 bg-brand-teal/5 blur-2xl rounded-full pointer-events-none" />
            <div className="relative w-full rounded-xl overflow-hidden border border-neutral-800 bg-[#08090A] shadow-2xl group-hover:border-brand-teal/40 transition-all duration-300">
              <img
                src={imageSrc}
                alt={name}
                className="w-full h-auto object-cover max-h-[300px] rounded-lg transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>
        ) : canvasType === "collab" ? (
          <div className="relative w-full h-full min-h-[280px] flex items-center justify-center">
            <div className="absolute inset-0 bg-brand-teal/5 blur-2xl rounded-full pointer-events-none" />
            <div className="absolute -top-2 left-6 transform -rotate-6 px-4 py-3 bg-[#111915] border border-brand-teal/40 rounded-md shadow-lg shadow-black/40 transition-transform group-hover:-translate-y-1">
              <span className="text-xs font-mono text-brand-teal">live.canvas()</span>
            </div>
            <div className="w-14 h-14 rounded-xl bg-[#0D1217] border border-brand-teal/50 flex items-center justify-center text-brand-teal shadow-xl shadow-brand-teal/10 transition-transform group-hover:scale-110">
              <span className="font-mono text-lg font-bold">&lt;/&gt;</span>
            </div>
            <div className="absolute bottom-2 right-10 w-28 h-20 bg-[#12151B] border border-neutral-800 rounded-lg p-3 flex items-center justify-center transition-transform group-hover:translate-x-1">
              <svg className="w-6 h-6 text-brand-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <rect height="4" rx="1" strokeWidth="2" width="6" x="9" y="3" />
                <rect height="4" rx="1" strokeWidth="2" width="6" x="3" y="17" />
                <rect height="4" rx="1" strokeWidth="2" width="6" x="15" y="17" />
                <path d="M12 7v4M6 17v-3a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3v3" strokeWidth="2" />
              </svg>
            </div>
          </div>
        ) : canvasType === "ai" ? (
          <div className="relative w-full h-full min-h-[280px] flex items-center justify-center">
            <div className="absolute top-2 left-6 px-3.5 py-2 bg-[#111915] border border-brand-teal/40 rounded-md text-xs font-mono text-brand-teal">
              rag.retrieve()
            </div>
            <div className="w-14 h-14 rounded-xl bg-[#0D1217] border border-brand-teal/50 flex items-center justify-center text-brand-teal shadow-xl shadow-brand-teal/10">
              <Cpu className="w-6 h-6" />
            </div>
            <div className="absolute bottom-2 right-8 px-4 py-2.5 bg-[#12151B] border border-neutral-800 rounded-lg text-xs font-mono text-neutral-300">
              Pinecone + GPT-4
            </div>
          </div>
        ) : (
          <div className="relative w-full h-full min-h-[280px] flex items-center justify-center">
            <div className="w-14 h-14 rounded-xl bg-[#0D1217] border border-brand-teal/50 flex items-center justify-center text-brand-teal shadow-xl">
              <Network className="w-6 h-6" />
            </div>
          </div>
        )}
      </div>

      {/* Right: Project Specifications & Breakdown */}
      <div
        className={`lg:col-span-7 p-8 sm:p-12 flex flex-col justify-between space-y-8 ${
          isReversed ? "lg:order-1" : "lg:order-2"
        }`}
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-brand-teal tracking-widest uppercase">
              FEATURED PROJECT / {number}
            </span>
            {links && (
              <div className="flex items-center gap-2">
                {links.repo && (
                  <a
                    href={links.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded text-neutral-400 hover:text-brand-teal hover:bg-white/[0.04] transition-colors"
                    title="View GitHub Repository"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                    </svg>
                  </a>
                )}
                {links.live && (
                  <a href={links.live} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded text-neutral-400 hover:text-brand-teal hover:bg-white/[0.04] transition-colors" title="View Live Demo">
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            )}
          </div>
          <div>
            <h3 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">{name}</h3>
            <p className="text-neutral-400 font-medium text-base mt-1">{tagline}</p>
          </div>
        </div>

        {/* Problem / Approach / Outcome Specification Rows */}
        <div className="space-y-6 pt-2">
          {(["PROBLEM", "APPROACH", "OUTCOME"] as const).map((label) => (
            <div key={label} className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 items-baseline">
              <div className="sm:col-span-3 text-xs font-mono uppercase tracking-wider text-brand-teal font-semibold">{label}</div>
              <div className="sm:col-span-9 text-sm text-neutral-300 leading-relaxed">
                {label === "PROBLEM" ? problem : label === "APPROACH" ? approach : outcome}
              </div>
            </div>
          ))}
        </div>

        {/* Technologies Pill Badges */}
        <div className="pt-4 flex flex-wrap gap-2 project-tech-tags">
          {stack.map((tech) => (
            <Badge key={tech} variant="default">{tech}</Badge>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
