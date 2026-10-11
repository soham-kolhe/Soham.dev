import React, { useRef, useState } from "react";
import { ExternalLink, Maximize2, Cloud, BrainCircuit, Network, Database, ShieldCheck, Binary, Layout, Award, RotateCw } from "lucide-react";
import { motion, useSpring } from "motion/react";

export type CertTier = "important" | "fundamentals" | "specialized";

export interface CertItem {
  id: string;
  code: string;
  name: string;
  issuer: string;
  category?: string;
  tier?: CertTier;
  isFlagship?: boolean;
  badgeTag?: string;
  pinColor?: string;
  verifyUrl?: string;
  imageSrc: string;
  issueDate?: string;
  credentialId?: string;
  description?: string;
  skills?: string[];
  restingRotation?: number;
  colSpan?: string;
  cardHeightClass?: string;
  iconType?: "cloud" | "ai" | "network" | "data" | "security" | "code" | "design";
}

interface CertBadgeProps {
  cert: CertItem;
  onInspect?: (cert: CertItem) => void;
  className?: string;
}

// Icon selector helper
const getCategoryIcon = (type?: string) => {
  switch (type) {
    case "cloud":
      return <Cloud className="w-4 h-4 text-brand-teal" />;
    case "ai":
      return <BrainCircuit className="w-4 h-4 text-brand-teal" />;
    case "network":
      return <Network className="w-4 h-4 text-brand-teal" />;
    case "data":
      return <Database className="w-4 h-4 text-brand-teal" />;
    case "security":
      return <ShieldCheck className="w-4 h-4 text-brand-teal" />;
    case "code":
      return <Binary className="w-4 h-4 text-brand-teal" />;
    case "design":
      return <Layout className="w-4 h-4 text-brand-teal" />;
    default:
      return <Award className="w-4 h-4 text-brand-teal" />;
  }
};

export const ThemedCertCard: React.FC<CertBadgeProps> = ({ cert, onInspect, className = "" }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const isImportant = cert.tier === "important" || cert.isFlagship;

  // 3D Tilt Spring Physics
  const tiltX = useSpring(0, { stiffness: 280, damping: 24 });
  const tiltY = useSpring(0, { stiffness: 280, damping: 24 });
  const scale = useSpring(1, { stiffness: 280, damping: 24 });

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;

    // Subtle 3D tilt towards hovered side
    tiltX.set((0.5 - py) * 12);
    tiltY.set((px - 0.5) * 12);
  };

  const handlePointerEnter = () => {
    scale.set(1.02);
    setIsFlipped(true);
  };

  const handlePointerLeave = () => {
    tiltX.set(0);
    tiltY.set(0);
    scale.set(1);
    setIsFlipped(false);
  };

  const restingRotation = cert.restingRotation ?? 0;
  const heightClass = cert.cardHeightClass || (isImportant ? "h-[260px] sm:h-[280px]" : "h-[230px] sm:h-[250px]");

  return (
    <div
      className={`w-full h-full ${className}`}
      style={{
        transform: restingRotation ? `rotate(${restingRotation}deg)` : undefined,
        transformOrigin: "center center",
      }}
    >
      <motion.div
        ref={cardRef}
        onPointerMove={handlePointerMove}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        onClick={() => onInspect?.(cert)}
        style={{
          rotateX: tiltX,
          rotateY: tiltY,
          scale: scale,
          perspective: 1000,
        }}
        className={`relative w-full ${heightClass} rounded-2xl cursor-pointer select-none transition-all duration-300 ${
          isImportant
            ? "shadow-[0_12px_35px_rgba(0,0,0,0.85),0_0_25px_rgba(6,182,212,0.12)]"
            : "shadow-[0_8px_25px_rgba(0,0,0,0.75)]"
        }`}
      >
        {/* 3D Flip Container */}
        <div
          className="relative w-full h-full rounded-2xl transition-transform duration-500 [transform-style:preserve-3d]"
          style={{
            transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
          }}
        >
          {/* ─── FRONT FACE: Visible Certificate Screenshot ─── */}
          <div
            className={`absolute inset-0 w-full h-full rounded-2xl overflow-hidden border bg-[#090B0E] [backface-visibility:hidden] [-webkit-backface-visibility:hidden] flex flex-col justify-between ${
              isImportant
                ? "border-brand-teal/50 hover:border-brand-teal shadow-inner"
                : "border-brand-teal/25 hover:border-brand-teal/60"
            }`}
          >
            {/* Full-Cover Certificate Screenshot with Object-Contain (No Clipping / No Cropping) */}
            <div className="absolute inset-0 w-full h-full bg-[#06080A] flex items-center justify-center p-1.5 sm:p-2">
              <img
                src={cert.imageSrc}
                alt={`${cert.name} certificate`}
                className="w-full h-full object-contain rounded-xl"
                loading="lazy"
              />
            </div>

            {/* Top Badge: Category Icon & Code Badge */}
            <div className="relative z-10 px-3 py-2 flex items-center justify-between bg-gradient-to-b from-black/85 via-black/40 to-transparent pointer-events-none">
              <div className="flex items-center gap-1.5 pointer-events-auto">
                <div className="w-6 h-6 rounded-md bg-black/80 border border-brand-teal/40 flex items-center justify-center backdrop-blur-md">
                  {getCategoryIcon(cert.iconType)}
                </div>
                {isImportant && (
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold tracking-wider text-amber-300 bg-black/85 border border-amber-400/40 backdrop-blur-md shadow-sm">
                    ★ TOP LEVEL
                  </span>
                )}
              </div>

              <span className="px-2 py-0.5 rounded-md font-mono text-[10px] sm:text-[11px] font-semibold text-white bg-black/85 border border-brand-teal/40 backdrop-blur-md uppercase tracking-wider pointer-events-auto">
                {cert.code}
              </span>
            </div>

            {/* Bottom Bar: Hover to Flip Hint & Direct Verify Link */}
            <div className="relative z-10 px-3 py-1.5 flex items-center justify-between bg-gradient-to-t from-black/90 via-black/50 to-transparent pointer-events-none">
              <div className="flex items-center gap-1.5 text-[10px] font-mono text-neutral-200 drop-shadow-md">
                <RotateCw className="w-2.5 h-2.5 text-brand-teal" />
                <span className="hidden sm:inline">Hover for info</span>
              </div>

              <div className="flex items-center gap-1.5 pointer-events-auto">
                {cert.verifyUrl && (
                  <a
                    href={cert.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1 text-[10px] font-mono font-medium text-black bg-brand-teal hover:bg-brand-teal/90 px-2 py-0.5 rounded transition-colors shadow-sm font-semibold"
                    title="Verify on official credential portal"
                  >
                    <span>Verify</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* ─── BACK FACE: Certificate Text Info & Metadata ─── */}
          <div
            className={`absolute inset-0 w-full h-full p-4 sm:p-5 rounded-2xl border bg-[#0A0C0E] [transform:rotateY(180deg)] [backface-visibility:hidden] [-webkit-backface-visibility:hidden] flex flex-col justify-between select-none overflow-hidden ${
              isImportant
                ? "border-brand-teal shadow-[0_0_20px_rgba(6,182,212,0.2)]"
                : "border-brand-teal/50 shadow-lg"
            }`}
          >
            {/* Subtle Cyber Grid Background Texture */}
            <div
              className="absolute inset-0 pointer-events-none opacity-20"
              style={{
                backgroundImage: `radial-gradient(rgba(6, 182, 212, 0.3) 1px, transparent 1px)`,
                backgroundSize: "16px 16px",
              }}
            />

            {/* Top Header */}
            <div className="relative z-10 flex items-center justify-between pb-2 border-b border-brand-teal/20">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-brand-teal/15 border border-brand-teal/30 flex items-center justify-center">
                  {getCategoryIcon(cert.iconType)}
                </div>
                <span className="text-[10px] font-mono text-brand-teal uppercase tracking-widest font-semibold">
                  {cert.issuer}
                </span>
              </div>

              <span className="font-mono text-xs font-semibold text-brand-teal uppercase">
                {cert.code}
              </span>
            </div>

            {/* Content: Title, Description, Skills */}
            <div className="relative z-10 my-auto py-1.5 space-y-1">
              <h4 className="font-bold text-white tracking-tight leading-snug text-xs sm:text-sm md:text-base">
                {cert.name}
              </h4>

              {cert.description && (
                <p className="text-neutral-300 text-[10px] sm:text-xs leading-relaxed line-clamp-2">
                  {cert.description}
                </p>
              )}

              {cert.skills && cert.skills.length > 0 && (
                <div className="flex flex-wrap gap-1 pt-0.5">
                  {cert.skills.slice(0, 3).map((skill) => (
                    <span
                      key={skill}
                      className="px-1.5 py-0.2 rounded bg-[#12151B] border border-neutral-700/80 text-[9px] font-mono text-neutral-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Bottom Actions: Direct MS Learn Link & Click to View */}
            <div className="relative z-10 pt-2 border-t border-brand-teal/20 flex items-center justify-between gap-2">
              {cert.verifyUrl ? (
                <a
                  href={cert.verifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] font-mono font-medium text-black bg-brand-teal hover:bg-brand-teal/90 px-2.5 py-1 rounded-md transition-all shadow-sm font-semibold"
                  title="Verify on Microsoft Learn portal"
                >
                  <span>Verify on MS Learn</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              ) : (
                <span className="text-[10px] font-mono text-neutral-400 flex items-center gap-1">
                  Verified
                </span>
              )}

              <div className="flex items-center gap-1 text-[10px] font-mono text-neutral-400">
                <Maximize2 className="w-3 h-3 text-brand-teal" />
                <span>Click to view</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
