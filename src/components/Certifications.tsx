import React, { useEffect, useRef, useState } from "react";
import { ThemedCertCard, CertItem } from "./CertBadge";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { ExternalLink, X, Sparkles } from "lucide-react";
import { certifications as allCertsData } from "../data/portfolio";

gsap.registerPlugin(ScrollTrigger);

interface CertificationsProps {
  sectionNumber?: string;
  certs?: CertItem[];
}

// Clean Single Certificate Modal (No next/prev navigation, just close button)
const CertLightboxModal: React.FC<{
  cert: CertItem | null;
  onClose: () => void;
}> = ({ cert, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!cert) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative w-full max-w-4xl bg-[#0A0C0E] border border-brand-teal/40 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-brand-cardBorder bg-[#0E1013]">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-teal shadow-[0_0_8px_#06B6D4]" />
            <span className="font-mono text-xs font-semibold text-brand-teal uppercase tracking-wider">
              {cert.issuer}
            </span>
            <span className="text-neutral-500 font-mono text-xs">•</span>
            <span className="text-neutral-300 font-mono text-xs font-semibold">
              {cert.code}
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg bg-neutral-800/80 hover:bg-neutral-700 text-neutral-300 hover:text-white transition-colors flex items-center gap-1 text-xs font-mono"
            aria-label="Close modal"
          >
            <span>ESC</span>
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body: High-Res Certificate Image & Info */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          {/* Full High-Res Document Preview */}
          <div className="w-full rounded-xl overflow-hidden border border-neutral-800 bg-neutral-950 flex items-center justify-center p-2 shadow-inner">
            <img
              src={cert.imageSrc}
              alt={cert.name}
              className="w-full max-h-[500px] object-contain"
            />
          </div>

          {/* Certificate Metadata & Verify Action */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="md:col-span-2 space-y-2">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-brand-teal font-semibold">
                  {cert.code}
                </span>
                {cert.badgeTag && (
                  <span className="px-2 py-0.5 rounded-full bg-amber-400/10 border border-amber-400/40 text-amber-300 font-mono text-[10px] font-bold">
                    {cert.badgeTag}
                  </span>
                )}
              </div>
              <h3 className="text-xl font-bold text-white tracking-tight">
                {cert.name}
              </h3>
              {cert.description && (
                <p className="text-neutral-300 text-sm leading-relaxed pt-1">
                  {cert.description}
                </p>
              )}
            </div>

            <div className="space-y-3 bg-[#0E1116] p-4 rounded-xl border border-neutral-800/80 self-start">
              {cert.issueDate && (
                <div>
                  <span className="block text-[10px] font-mono text-neutral-500 uppercase tracking-wider">
                    Issued
                  </span>
                  <span className="text-xs font-mono text-neutral-200">
                    {cert.issueDate}
                  </span>
                </div>
              )}
              {cert.credentialId && (
                <div>
                  <span className="block text-[10px] font-mono text-neutral-500 uppercase tracking-wider">
                    Credential ID
                  </span>
                  <span className="text-xs font-mono text-neutral-300 font-medium break-all">
                    {cert.credentialId}
                  </span>
                </div>
              )}
              {cert.verifyUrl && (
                <a
                  href={cert.verifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-full gap-1.5 text-xs font-mono font-medium text-black bg-brand-teal hover:bg-brand-teal/90 px-3 py-2 rounded-lg transition-colors mt-2 font-semibold shadow-md shadow-brand-teal/20"
                >
                  <span>Verify on Official Portal</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Modal Clean Footer with Single Close Button */}
        <div className="flex items-center justify-between px-5 py-3 border-t border-brand-cardBorder bg-[#0E1013]">
          <span className="text-xs font-mono text-neutral-500">
            Press <kbd className="px-1.5 py-0.5 rounded bg-neutral-800 text-neutral-300">ESC</kbd> to close
          </span>

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 hover:text-white transition-colors text-xs font-mono"
          >
            Close Document
          </button>
        </div>
      </div>
    </div>
  );
};

// Gap-Free Complete 12-Column Grid Configuration:
// Row 1: 6 + 6 = 12
// Row 2: 4 + 4 + 4 = 12
// Row 3: 3 + 3 + 3 + 3 = 12
const GAP_FREE_GRID_CONFIG: Record<
  string,
  {
    colSpan: string;
    rotation: number;
    cardHeightClass: string;
    iconType: "cloud" | "ai" | "network" | "data" | "security" | "code" | "design";
  }
> = {
  // Row 1 (Associate Tier — 2 Large Cards: 6 + 6 = 12)
  "az-104": {
    colSpan: "col-span-1 md:col-span-6 lg:col-span-6",
    rotation: -1.2,
    cardHeightClass: "h-[260px] sm:h-[285px]",
    iconType: "cloud",
  },
  "ai-200": {
    colSpan: "col-span-1 md:col-span-6 lg:col-span-6",
    rotation: 1.4,
    cardHeightClass: "h-[260px] sm:h-[285px]",
    iconType: "ai",
  },

  // Row 2 (AI, Azure Cloud & Networking — 3 Balanced Cards: 4 + 4 + 4 = 12)
  "ai-900": {
    colSpan: "col-span-1 sm:col-span-6 lg:col-span-4",
    rotation: -0.8,
    cardHeightClass: "h-[240px] sm:h-[260px]",
    iconType: "ai",
  },
  "az-900": {
    colSpan: "col-span-1 sm:col-span-6 lg:col-span-4",
    rotation: 1.0,
    cardHeightClass: "h-[240px] sm:h-[260px]",
    iconType: "cloud",
  },
  "nptel-cn": {
    colSpan: "col-span-1 sm:col-span-12 lg:col-span-4",
    rotation: -1.2,
    cardHeightClass: "h-[240px] sm:h-[260px]",
    iconType: "network",
  },

  // Row 3 (Data, Security, Camps & Simulations — 4 Balanced Cards: 3 + 3 + 3 + 3 = 12)
  "dp-900": {
    colSpan: "col-span-1 sm:col-span-6 lg:col-span-3",
    rotation: -1.0,
    cardHeightClass: "h-[230px] sm:h-[250px]",
    iconType: "data",
  },
  "sc-900": {
    colSpan: "col-span-1 sm:col-span-6 lg:col-span-3",
    rotation: 0.8,
    cardHeightClass: "h-[230px] sm:h-[250px]",
    iconType: "security",
  },
  "algo-graphs": {
    colSpan: "col-span-1 sm:col-span-6 lg:col-span-3",
    rotation: 1.2,
    cardHeightClass: "h-[230px] sm:h-[250px]",
    iconType: "code",
  },
  "forage-ux": {
    colSpan: "col-span-1 sm:col-span-6 lg:col-span-3",
    rotation: -0.9,
    cardHeightClass: "h-[230px] sm:h-[250px]",
    iconType: "design",
  },
};

export const Certifications: React.FC<CertificationsProps> = ({
  sectionNumber = "04 /",
  certs = allCertsData.map((c) => {
    const config = GAP_FREE_GRID_CONFIG[c.id] || {
      colSpan: "col-span-1 md:col-span-4",
      rotation: 0,
      cardHeightClass: "h-[240px]",
      iconType: "cloud",
    };
    return {
      id: c.id,
      code: c.code || c.name.split("(")[1]?.replace(")", "") || "CERT",
      name: c.name,
      issuer: c.issuer,
      category: c.category,
      tier: (c.tier as any) || (c.isFlagship ? "important" : "fundamentals"),
      isFlagship: c.isFlagship,
      badgeTag: c.badgeTag,
      pinColor: c.pinColor,
      verifyUrl: c.verifyUrl,
      imageSrc: c.imageUrl || `/images/${c.id}.png`,
      issueDate: c.issueDate,
      credentialId: c.credentialId,
      description: c.description,
      skills: c.skills,
      restingRotation: config.rotation,
      colSpan: config.colSpan,
      cardHeightClass: config.cardHeightClass,
      iconType: config.iconType,
    };
  }),
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  const [inspectCert, setInspectCert] = useState<CertItem | null>(null);

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

      const cards = sectionRef.current!.querySelectorAll(".themed-cert-item");
      if (cards.length) {
        ScrollTrigger.batch(cards, {
          onEnter: (batch) => {
            gsap.fromTo(
              batch,
              { opacity: 0, scale: 0.94, y: 20 },
              {
                opacity: 1,
                scale: 1,
                y: 0,
                duration: 0.5,
                stagger: 0.05,
                ease: "power2.out",
                overwrite: true,
                onComplete: () => {
                  gsap.set(batch, { clearProps: "transform" });
                },
              }
            );
          },
          start: "top 88%",
          once: true,
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReduced]);

  return (
    <section
      ref={sectionRef}
      className="py-24 border-b border-brand-cardBorder relative overflow-hidden"
      data-purpose="certifications-section"
      id="certifications"
    >
      {/* Ambient background lighting */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/4 left-1/4 w-[550px] h-[550px] bg-brand-teal/15 rounded-full blur-[130px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[550px] h-[550px] bg-cyan-500/15 rounded-full blur-[130px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div
          ref={headerRef}
          className="flex flex-col md:flex-row md:items-end justify-between pb-10 border-b border-neutral-900 gap-6"
        >
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-brand-teal uppercase tracking-widest">
                {sectionNumber}
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-mono text-brand-teal bg-brand-teal/10 px-2 py-0.5 rounded border border-brand-teal/25">
                <Sparkles className="w-3 h-3 text-brand-teal" />
                <span>Hover to 3D Flip • Click to Enlarge Document</span>
              </span>
            </div>

            <div className="mt-2">
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white font-mono uppercase">
                VERIFIED
              </h2>
              <span className="block text-2xl sm:text-3xl md:text-4xl font-serif italic text-brand-teal -mt-1 sm:-mt-2">
                credentials.
              </span>
            </div>
          </div>

          <p className="text-neutral-400 font-normal text-sm max-w-sm md:text-right">
            Official Microsoft Azure Associates, Cloud &amp; AI Fundamentals, NPTEL Elite, and competitive camp certifications.
          </p>
        </div>

        {/* Gap-Free Balanced 12-Column Grid (Zero Empty Spaces) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6 pt-12">
          {certs.map((cert) => {
            const spanClass = cert.colSpan || "col-span-1 md:col-span-4";
            return (
              <div
                key={cert.id}
                className={`themed-cert-item w-full flex ${spanClass}`}
              >
                <ThemedCertCard
                  cert={cert}
                  onInspect={setInspectCert}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* High-Resolution Document Lightbox Modal (Single Document, No Next/Prev) */}
      <CertLightboxModal
        cert={inspectCert}
        onClose={() => setInspectCert(null)}
      />
    </section>
  );
};
