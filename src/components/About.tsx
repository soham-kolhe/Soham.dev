import React, { useEffect, useRef, useMemo } from "react";
import { Badge } from "./ui/badge";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "../hooks/useReducedMotion";
import LogoLoop, { LogoItem } from "./LogoLoop";
import CountUp from "./CountUp";
import {
  SiReact,
  SiTypescript,
  SiJavascript,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiDocker,
  SiTailwindcss,
  SiVite,
  SiPython,
  SiMysql,
  SiSocketdotio,
  SiGit,
  SiGithub,
  SiPostman,
} from "react-icons/si";
import { VscAzure } from "react-icons/vsc";

gsap.registerPlugin(ScrollTrigger);

interface AboutProps {
  sectionNumber?: string;
}

export const About: React.FC<AboutProps> = ({
  sectionNumber = "01 /",
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const narrativeRef = useRef<HTMLDivElement>(null);
  const skillsCardRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  const skillCategories: Record<string, string[]> = {
    backend: ["Java", "Spring Boot", "Node.js", "Express.js", "REST APIs", "JWT Auth", "Socket.io"],
    cloudAndTools: ["Microsoft Azure", "Docker", "OpenTelemetry", "Git", "GitHub", "Postman"],
    frontend: ["React.js", "TypeScript", "JavaScript (ES6+)", "Tailwind CSS", "HTML5", "Vite"],
    databases: ["MongoDB", "MySQL", "Pinecone Vector DB"],
  };

  const techLogos: LogoItem[] = useMemo(
    () => [
      {
        node: (
          <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-brand-card border border-brand-cardBorder hover:border-brand-teal/50 hover:bg-brand-teal/5 transition-all text-neutral-300 hover:text-brand-teal group cursor-default shadow-sm">
            <SiReact className="w-5 h-5 text-[#61DAFB] group-hover:scale-110 transition-transform" />
            <span className="font-mono text-xs font-semibold tracking-wider text-neutral-200 group-hover:text-white">
              React.js
            </span>
          </div>
        ),
        title: "React.js",
      },
      {
        node: (
          <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-brand-card border border-brand-cardBorder hover:border-brand-teal/50 hover:bg-brand-teal/5 transition-all text-neutral-300 hover:text-brand-teal group cursor-default shadow-sm">
            <SiTypescript className="w-5 h-5 text-[#3178C6] group-hover:scale-110 transition-transform" />
            <span className="font-mono text-xs font-semibold tracking-wider text-neutral-200 group-hover:text-white">
              TypeScript
            </span>
          </div>
        ),
        title: "TypeScript",
      },
      {
        node: (
          <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-brand-card border border-brand-cardBorder hover:border-brand-teal/50 hover:bg-brand-teal/5 transition-all text-neutral-300 hover:text-brand-teal group cursor-default shadow-sm">
            <SiNodedotjs className="w-5 h-5 text-[#5FA04E] group-hover:scale-110 transition-transform" />
            <span className="font-mono text-xs font-semibold tracking-wider text-neutral-200 group-hover:text-white">
              Node.js
            </span>
          </div>
        ),
        title: "Node.js",
      },
      {
        node: (
          <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-brand-card border border-brand-cardBorder hover:border-brand-teal/50 hover:bg-brand-teal/5 transition-all text-neutral-300 hover:text-brand-teal group cursor-default shadow-sm">
            <VscAzure className="w-5 h-5 text-[#0078D4] group-hover:scale-110 transition-transform" />
            <span className="font-mono text-xs font-semibold tracking-wider text-neutral-200 group-hover:text-white">
              Azure
            </span>
          </div>
        ),
        title: "Microsoft Azure",
      },
      {
        node: (
          <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-brand-card border border-brand-cardBorder hover:border-brand-teal/50 hover:bg-brand-teal/5 transition-all text-neutral-300 hover:text-brand-teal group cursor-default shadow-sm">
            <SiMongodb className="w-5 h-5 text-[#47A248] group-hover:scale-110 transition-transform" />
            <span className="font-mono text-xs font-semibold tracking-wider text-neutral-200 group-hover:text-white">
              MongoDB
            </span>
          </div>
        ),
        title: "MongoDB",
      },
      {
        node: (
          <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-brand-card border border-brand-cardBorder hover:border-brand-teal/50 hover:bg-brand-teal/5 transition-all text-neutral-300 hover:text-brand-teal group cursor-default shadow-sm">
            <SiDocker className="w-5 h-5 text-[#2496ED] group-hover:scale-110 transition-transform" />
            <span className="font-mono text-xs font-semibold tracking-wider text-neutral-200 group-hover:text-white">
              Docker
            </span>
          </div>
        ),
        title: "Docker",
      },
      {
        node: (
          <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-brand-card border border-brand-cardBorder hover:border-brand-teal/50 hover:bg-brand-teal/5 transition-all text-neutral-300 hover:text-brand-teal group cursor-default shadow-sm">
            <SiTailwindcss className="w-5 h-5 text-[#06B6D4] group-hover:scale-110 transition-transform" />
            <span className="font-mono text-xs font-semibold tracking-wider text-neutral-200 group-hover:text-white">
              Tailwind CSS
            </span>
          </div>
        ),
        title: "Tailwind CSS",
      },
      {
        node: (
          <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-brand-card border border-brand-cardBorder hover:border-brand-teal/50 hover:bg-brand-teal/5 transition-all text-neutral-300 hover:text-brand-teal group cursor-default shadow-sm">
            <SiExpress className="w-5 h-5 text-neutral-200 group-hover:scale-110 transition-transform" />
            <span className="font-mono text-xs font-semibold tracking-wider text-neutral-200 group-hover:text-white">
              Express.js
            </span>
          </div>
        ),
        title: "Express.js",
      },
      {
        node: (
          <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-brand-card border border-brand-cardBorder hover:border-brand-teal/50 hover:bg-brand-teal/5 transition-all text-neutral-300 hover:text-brand-teal group cursor-default shadow-sm">
            <SiPython className="w-5 h-5 text-[#3776AB] group-hover:scale-110 transition-transform" />
            <span className="font-mono text-xs font-semibold tracking-wider text-neutral-200 group-hover:text-white">
              Python
            </span>
          </div>
        ),
        title: "Python",
      },
      {
        node: (
          <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-brand-card border border-brand-cardBorder hover:border-brand-teal/50 hover:bg-brand-teal/5 transition-all text-neutral-300 hover:text-brand-teal group cursor-default shadow-sm">
            <SiVite className="w-5 h-5 text-[#646CFF] group-hover:scale-110 transition-transform" />
            <span className="font-mono text-xs font-semibold tracking-wider text-neutral-200 group-hover:text-white">
              Vite
            </span>
          </div>
        ),
        title: "Vite",
      },
      {
        node: (
          <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-brand-card border border-brand-cardBorder hover:border-brand-teal/50 hover:bg-brand-teal/5 transition-all text-neutral-300 hover:text-brand-teal group cursor-default shadow-sm">
            <SiMysql className="w-5 h-5 text-[#4479A1] group-hover:scale-110 transition-transform" />
            <span className="font-mono text-xs font-semibold tracking-wider text-neutral-200 group-hover:text-white">
              MySQL
            </span>
          </div>
        ),
        title: "MySQL",
      },
      {
        node: (
          <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-brand-card border border-brand-cardBorder hover:border-brand-teal/50 hover:bg-brand-teal/5 transition-all text-neutral-300 hover:text-brand-teal group cursor-default shadow-sm">
            <SiSocketdotio className="w-5 h-5 text-neutral-200 group-hover:scale-110 transition-transform" />
            <span className="font-mono text-xs font-semibold tracking-wider text-neutral-200 group-hover:text-white">
              Socket.io
            </span>
          </div>
        ),
        title: "Socket.io",
      },
      {
        node: (
          <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-brand-card border border-brand-cardBorder hover:border-brand-teal/50 hover:bg-brand-teal/5 transition-all text-neutral-300 hover:text-brand-teal group cursor-default shadow-sm">
            <SiJavascript className="w-5 h-5 text-[#F7DF1E] group-hover:scale-110 transition-transform" />
            <span className="font-mono text-xs font-semibold tracking-wider text-neutral-200 group-hover:text-white">
              JavaScript
            </span>
          </div>
        ),
        title: "JavaScript",
      },
      {
        node: (
          <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-brand-card border border-brand-cardBorder hover:border-brand-teal/50 hover:bg-brand-teal/5 transition-all text-neutral-300 hover:text-brand-teal group cursor-default shadow-sm">
            <SiGit className="w-5 h-5 text-[#F05032] group-hover:scale-110 transition-transform" />
            <span className="font-mono text-xs font-semibold tracking-wider text-neutral-200 group-hover:text-white">
              Git
            </span>
          </div>
        ),
        title: "Git",
      },
      {
        node: (
          <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-brand-card border border-brand-cardBorder hover:border-brand-teal/50 hover:bg-brand-teal/5 transition-all text-neutral-300 hover:text-brand-teal group cursor-default shadow-sm">
            <SiGithub className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
            <span className="font-mono text-xs font-semibold tracking-wider text-neutral-200 group-hover:text-white">
              GitHub
            </span>
          </div>
        ),
        title: "GitHub",
      },
      {
        node: (
          <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-brand-card border border-brand-cardBorder hover:border-brand-teal/50 hover:bg-brand-teal/5 transition-all text-neutral-300 hover:text-brand-teal group cursor-default shadow-sm">
            <SiPostman className="w-5 h-5 text-[#FF6C37] group-hover:scale-110 transition-transform" />
            <span className="font-mono text-xs font-semibold tracking-wider text-neutral-200 group-hover:text-white">
              Postman
            </span>
          </div>
        ),
        title: "Postman",
      },
    ],
    []
  );

  useEffect(() => {
    if (prefersReduced || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Section header reveal
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0, duration: 0.6, ease: "power2.out",
          scrollTrigger: { trigger: headerRef.current, start: "top 85%", once: true },
        }
      );

      // Narrative text reveal
      gsap.fromTo(
        narrativeRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0, duration: 0.6, ease: "power2.out",
          scrollTrigger: { trigger: narrativeRef.current, start: "top 80%", once: true },
        }
      );

      // Skills card reveal
      gsap.fromTo(
        skillsCardRef.current,
        { opacity: 0, y: 25 },
        {
          opacity: 1, y: 0, duration: 0.7, ease: "power2.out",
          scrollTrigger: { trigger: skillsCardRef.current, start: "top 80%", once: true },
        }
      );

      // Skill tag pills stagger within each category
      const tagGroups = sectionRef.current!.querySelectorAll(".skill-tag-group");
      tagGroups.forEach((group) => {
        const tags = group.querySelectorAll(".skill-tag");
        ScrollTrigger.batch(tags, {
          onEnter: (batch) => {
            gsap.fromTo(
              batch,
              { opacity: 0, y: 10 },
              { opacity: 1, y: 0, duration: 0.4, stagger: 0.04, ease: "power2.out", overwrite: true }
            );
          },
          start: "top 85%",
          once: true,
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReduced]);

  return (
    <section
      ref={sectionRef}
      className="py-24 border-b border-brand-cardBorder"
      data-purpose="about-section"
      id="about"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Eyebrow & Title Header */}
        <div ref={headerRef} className="flex flex-col md:flex-row md:items-end justify-between pb-12 border-b border-neutral-900">
          <div>
            <span className="font-mono text-xs text-brand-teal uppercase tracking-widest">
              {sectionNumber}
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mt-1">
              About
            </h2>
          </div>
          <p className="text-neutral-400 font-normal text-sm md:text-right mt-4 md:mt-0 max-w-lg">
            I care most about the part after &apos;it works on my machine&apos;: containerizing it, handling the edge cases, and shipping something someone else can actually use.
          </p>
        </div>

        {/* Main About Grid: Narrative left & Tech Matrix right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-12 items-start">
          {/* Narrative Left Column */}
          <div ref={narrativeRef} className="lg:col-span-6 space-y-6">
            {/* Narrative text with refined, compact sizing */}
            <div className="space-y-3 text-neutral-300 text-sm sm:text-[15px] leading-relaxed font-normal">
              <p>
                Final-year B.Tech CSE student at Parul University{" "}
                <strong className="text-white font-medium">
                  focused on full-stack engineering, real-time systems, and cloud-native architecture.
                </strong>{" "}
                I have hands-on experience building distributed tracing platforms, multiplayer collaborative canvases, and AI-integrated RAG applications with active open-source contributions.
              </p>
              <p className="text-neutral-400 text-xs sm:text-sm">
                My technical expertise spans <span className="text-neutral-200">React</span>,{" "}
                <span className="text-neutral-200">TypeScript</span>,{" "}
                <span className="text-neutral-200">Node.js</span>,{" "}
                <span className="text-neutral-200">Java / Spring Boot</span>, and{" "}
                <span className="text-neutral-200">Microsoft Azure</span> (AZ-104 &amp; AI-200 Associate Certified), with a passion for architecting resilient APIs, low-latency WebSocket pipelines, and scalable developer tools.
              </p>
            </div>

            {/* Large Standout Metric Highlight Cards with CountUp */}
            <div className="pt-2 grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              <div className="p-4 sm:p-5 rounded-xl bg-gradient-to-b from-[#121519] to-[#0A0C0E] border border-neutral-800 hover:border-brand-teal/50 transition-all group shadow-sm">
                <div className="flex items-center gap-1.5 mb-2">
                  <span className="w-2 h-2 rounded-full bg-brand-teal shadow-[0_0_8px_#06B6D4]" />
                  <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider">
                    LeetCode
                  </span>
                </div>
                <div className="text-3xl sm:text-4xl font-bold font-mono text-white group-hover:text-brand-teal transition-colors tracking-tight flex items-baseline">
                  <CountUp from={0} to={160} duration={1.6} />
                  <span className="text-brand-teal">+</span>
                </div>
                <div className="text-xs font-mono text-neutral-300 mt-1 font-medium">
                  Problems Solved
                </div>
              </div>

              <div className="p-4 sm:p-5 rounded-xl bg-gradient-to-b from-[#121519] to-[#0A0C0E] border border-neutral-800 hover:border-brand-teal/50 transition-all group shadow-sm">
                <div className="flex items-center gap-1.5 mb-2">
                  <span className="w-2 h-2 rounded-full bg-brand-teal shadow-[0_0_8px_#06B6D4]" />
                  <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider">
                    Academics
                  </span>
                </div>
                <div className="text-3xl sm:text-4xl font-bold font-mono text-white group-hover:text-brand-teal transition-colors tracking-tight">
                  <CountUp from={0} to={8.59} duration={1.6} />
                </div>
                <div className="text-xs font-mono text-neutral-300 mt-1 font-medium">
                  B.Tech CGPA
                </div>
              </div>

              <div className="p-4 sm:p-5 rounded-xl bg-gradient-to-b from-[#121519] to-[#0A0C0E] border border-neutral-800 hover:border-brand-teal/50 transition-all group shadow-sm">
                <div className="flex items-center gap-1.5 mb-2">
                  <span className="w-2 h-2 rounded-full bg-brand-teal shadow-[0_0_8px_#06B6D4]" />
                  <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider">
                    Credentials
                  </span>
                </div>
                <div className="text-3xl sm:text-4xl font-bold font-mono text-white group-hover:text-brand-teal transition-colors tracking-tight">
                  <CountUp from={0} to={7} duration={1.2} />
                </div>
                <div className="text-xs font-mono text-neutral-300 mt-1 font-medium">
                  Industry Certs
                </div>
              </div>
            </div>
          </div>

          {/* Skills 2x2 Matrix Card Right Column */}
          <div className="lg:col-span-6">
            <div ref={skillsCardRef} className="bg-brand-card border border-brand-cardBorder rounded-xl p-6 sm:p-8 divide-y divide-brand-cardBorder">
              {/* Upper 2 quadrants: Frontend & Backend */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pb-8">
                <div>
                  <h3 className="text-xs font-mono text-brand-teal uppercase tracking-wider mb-4">Frontend</h3>
                  <div className="flex flex-wrap gap-2 skill-tag-group">
                    {skillCategories.frontend.map((skill) => (
                      <Badge key={skill} variant="subtle" className="skill-tag">{skill}</Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-xs font-mono text-brand-teal uppercase tracking-wider mb-4">Backend</h3>
                  <div className="flex flex-wrap gap-2 skill-tag-group">
                    {skillCategories.backend.map((skill) => (
                      <Badge key={skill} variant="subtle" className="skill-tag">{skill}</Badge>
                    ))}
                  </div>
                </div>
              </div>
              {/* Lower 2 quadrants: Databases & Cloud Tools */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-8">
                <div>
                  <h3 className="text-xs font-mono text-brand-teal uppercase tracking-wider mb-4">Databases</h3>
                  <div className="flex flex-wrap gap-2 skill-tag-group">
                    {skillCategories.databases.map((skill) => (
                      <Badge key={skill} variant="subtle" className="skill-tag">{skill}</Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-xs font-mono text-brand-teal uppercase tracking-wider mb-4">Cloud &amp; Tools</h3>
                  <div className="flex flex-wrap gap-2 skill-tag-group">
                    {skillCategories.cloudAndTools.map((skill) => (
                      <Badge key={skill} variant="subtle" className="skill-tag">{skill}</Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Continuous Tech Stack Marquee Strip */}
        <div className="mt-16 pt-12 border-t border-neutral-900">
          <div className="flex items-center justify-between mb-5">
            <span className="font-mono text-[11px] text-neutral-500 uppercase tracking-widest">
              Technologies &amp; Tools / Daily Stack
            </span>
            <span className="font-mono text-[11px] text-brand-teal/80 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-teal animate-pulse" />
              // INFINITE STREAM
            </span>
          </div>
          <div className="relative overflow-hidden py-1">
            <LogoLoop
              logos={techLogos}
              speed={45}
              direction="left"
              logoHeight={34}
              gap={20}
              hoverSpeed={0}
              scaleOnHover={true}
              fadeOut={true}
              fadeOutColor="#08090A"
              ariaLabel="Skills and technologies"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
