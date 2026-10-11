import React from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { GitPullRequest, GraduationCap, Trophy, Briefcase, ExternalLink, GitMerge } from "lucide-react";

export interface TimelineEntry {
  id: string;
  period: string;
  role: string;
  organization: string;
  location?: string;
  type: "education" | "opensource" | "hackathon" | "work";
  summary: string;
  bulletsTitle?: string;
  bullets?: string[];
  stack?: string[];
  badge?: string;
  link?: {
    url: string;
    label: string;
  };
  actionButton?: {
    url: string;
    label: string;
  };
  isSubstantial?: boolean;
}

interface TimelineItemProps {
  entry: TimelineEntry;
  isLast?: boolean;
}

export const TimelineItem: React.FC<TimelineItemProps> = ({ entry, isLast = false }) => {
  const getIcon = () => {
    switch (entry.type) {
      case "education":
        return <GraduationCap className="w-4 h-4 text-brand-teal" />;
      case "opensource":
        return <GitPullRequest className="w-4 h-4 text-brand-teal" />;
      case "hackathon":
        return <Trophy className="w-4 h-4 text-brand-teal" />;
      default:
        return <Briefcase className="w-4 h-4 text-brand-teal" />;
    }
  };

  const getTypeLabel = () => {
    switch (entry.type) {
      case "education":
        return "ACADEMIC";
      case "opensource":
        return "OPEN SOURCE";
      case "hackathon":
        return "HACKATHON";
      default:
        return "EXPERIENCE";
    }
  };

  const isSubstantial = entry.isSubstantial ?? false;

  return (
    <div className="relative flex gap-6 group timeline-entry">
      {/* Left rail with node dot and line */}
      <div className="flex flex-col items-center">
        <div className="w-8 h-8 rounded-lg bg-[#0E1013] border border-brand-teal/40 flex items-center justify-center shadow-lg shadow-brand-teal/5 transition-transform group-hover:scale-110 relative z-10">
          {getIcon()}
        </div>
        {!isLast && (
          <div className="w-[1px] flex-1 bg-transparent my-2" />
        )}
      </div>

      {/* Content Card */}
      <div className={`flex-1 ${isLast ? "pb-2" : "pb-12"}`}>
        <div className={`bg-brand-card border border-brand-cardBorder rounded-xl transition-all hover:border-neutral-700 ${
          isSubstantial ? "p-7 sm:p-9 shadow-lg shadow-black/40" : "p-6 sm:p-7"
        }`}>
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-brand-cardBorder">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="text-[11px] font-mono tracking-wider uppercase text-brand-teal font-semibold">
                {getTypeLabel()}
              </span>
              <span className="text-neutral-600">•</span>
              <span className="text-xs font-mono text-neutral-400">
                {entry.period}
              </span>
              {entry.badge && (
                <>
                  <span className="text-neutral-600">•</span>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-brand-teal/10 border border-brand-teal/30 text-brand-teal text-[11px] font-mono font-medium">
                    <GitMerge className="w-3 h-3 text-brand-teal" />
                    {entry.badge}
                  </span>
                </>
              )}
            </div>
            {entry.link && (
              <a
                href={entry.link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono text-neutral-400 hover:text-brand-teal inline-flex items-center gap-1.5 transition-colors"
                title={`View ${entry.link.label} on GitHub`}
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                </svg>
                <span>{entry.link.label}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>

          <div className="mt-5">
            <h3 className={`font-bold text-white tracking-tight ${
              isSubstantial ? "text-2xl sm:text-3xl" : "text-xl"
            }`}>
              {entry.role}
            </h3>
            <p className="text-sm font-medium text-neutral-300 mt-1">
              {entry.organization}
              {entry.location && (
                <span className="text-neutral-500 font-normal"> · {entry.location}</span>
              )}
            </p>
          </div>

          <p className={`text-neutral-300 leading-relaxed font-normal ${
            isSubstantial ? "text-sm sm:text-base mt-4" : "text-sm mt-3"
          }`}>
            {entry.summary}
          </p>

          {entry.bullets && entry.bullets.length > 0 && (
            <div className="mt-6 pt-5 border-t border-brand-cardBorder">
              {entry.bulletsTitle && (
                <span className="text-xs font-mono uppercase tracking-wider text-brand-teal font-semibold block mb-3">
                  {entry.bulletsTitle}
                </span>
              )}
              <ul className="space-y-2.5 text-sm text-neutral-300">
                {entry.bullets.map((bullet, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="text-brand-teal mt-0.5 text-xs select-none">▸</span>
                    <span className="leading-normal">{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="pt-5 mt-5 border-t border-brand-cardBorder flex flex-wrap items-center justify-between gap-4">
            {entry.stack && entry.stack.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {entry.stack.map((tech) => (
                  <Badge key={tech} variant="subtle">{tech}</Badge>
                ))}
              </div>
            )}
            {entry.actionButton && (
              <Button
                asChild
                variant="secondary"
                size="sm"
                className="group gap-2 border-brand-cardBorder hover:border-brand-teal/60 hover:text-brand-teal text-neutral-200"
              >
                <a
                  href={entry.actionButton.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <GitPullRequest className="w-3.5 h-3.5 text-brand-teal" />
                  <span>{entry.actionButton.label}</span>
                  <ExternalLink className="w-3.5 h-3.5 text-neutral-400 group-hover:text-brand-teal transition-colors" />
                </a>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
