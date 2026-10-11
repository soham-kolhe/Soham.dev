import React, { useEffect, useRef } from "react";
import { TimelineItem, TimelineEntry } from "./TimelineItem";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "../hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

interface OpenSourceProps {
  sectionNumber?: string;
  entries?: TimelineEntry[];
}

export const OpenSource: React.FC<OpenSourceProps> = ({
  sectionNumber = "03 /",
  entries = [
    {
      id: "privateboard",
      period: "2025",
      role: "Open Source Contributor — PrivateBoard",
      organization: "PrivateBoard · Real-Time Collaborative Platform",
      type: "opensource",
      badge: "Merged PRs",
      summary:
        "Contributed to PrivateBoard, an open-source collaborative platform — implemented features and resolved issues through merged pull requests, collaborating with maintainers on code review and integration.",
      bulletsTitle: "Contributions & Scope",
      bullets: [
        "Implemented new features on the platform",
        "Resolved existing issues via pull requests",
        "Collaborated directly with maintainers through code review",
      ],
      stack: ["React", "JavaScript", "Node.js", "Git Workflow", "Code Review"],
      link: {
        url: "https://github.com/lexasub/PrivateBoard",
        label: "lexasub/PrivateBoard",
      },
      actionButton: {
        url: "https://github.com/lexasub/PrivateBoard/pulls?q=is%3Apr+author%3Asoham-kolhe",
        label: "View Contributions",
      },
      isSubstantial: true,
    },
  ],
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const timelineLineRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Section header animation
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

      // Timeline line draw with scrub
      if (timelineLineRef.current) {
        gsap.fromTo(
          timelineLineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current!.querySelector(".timeline-container"),
              start: "top 80%",
              end: "bottom 30%",
              scrub: true,
            },
          }
        );
      }

      // Timeline entries reveal
      const entryElements = sectionRef.current!.querySelectorAll(".timeline-entry");
      entryElements.forEach((entry) => {
        gsap.fromTo(
          entry,
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: { trigger: entry, start: "top 85%", once: true },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReduced]);

  return (
    <section
      ref={sectionRef}
      className="py-24 border-b border-brand-cardBorder relative"
      data-purpose="open-source-section"
      id="opensource"
    >
      {/* Anchor alias to support legacy #experience links seamlessly */}
      <span id="experience" className="absolute -top-20 opacity-0 pointer-events-none" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-6">
        <div
          ref={headerRef}
          className="flex flex-col md:flex-row md:items-end justify-between pb-12 border-b border-neutral-900"
        >
          <div>
            <span className="font-mono text-xs text-brand-teal uppercase tracking-widest">{sectionNumber}</span>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mt-1">Open Source</h2>
          </div>
          <p className="text-neutral-400 font-normal text-sm md:text-right mt-4 md:mt-0 max-w-sm">
            Contributing to real-world codebases beyond my own projects.
          </p>
        </div>

        <div className="pt-12 max-w-4xl mx-auto relative timeline-container">
          {/* Animated vertical timeline line */}
          <div
            ref={timelineLineRef}
            className="absolute left-[15px] top-0 bottom-0 w-[1px] bg-gradient-to-b from-brand-teal/50 via-brand-teal/20 to-transparent origin-top"
            style={prefersReduced ? {} : { transform: "scaleY(0)" }}
          />
          {entries.map((entry, idx) => (
            <TimelineItem
              key={entry.id}
              entry={entry}
              isLast={idx === entries.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
