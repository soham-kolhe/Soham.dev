import React, { useState, useEffect, useRef } from "react";
import { Copy, Check, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "../hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

interface ContactProps {
  email?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  leetcodeUrl?: string;
  learnUrl?: string;
}

export const Contact: React.FC<ContactProps> = ({
  email = "sohamkolhe20@gmail.com",
  githubUrl = "https://github.com/soham-kolhe",
  linkedinUrl = "https://www.linkedin.com/in/soham-kolhe3318/",
  leetcodeUrl = "https://leetcode.com/u/Soham_Kolhe/",
  learnUrl = "https://learn.microsoft.com/en-us/users/sohamkolhe-0425/",
}) => {
  const [copied, setCopied] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  useEffect(() => {
    if (prefersReduced || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Content reveal
      const items = contentRef.current?.querySelectorAll(".contact-reveal");
      if (items) {
        ScrollTrigger.batch(items, {
          onEnter: (batch) => {
            gsap.fromTo(
              batch,
              { opacity: 0, y: 20 },
              { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power2.out", overwrite: true }
            );
          },
          start: "top 85%",
          once: true,
        });
      }

      // Social icons stagger
      const icons = socialsRef.current?.querySelectorAll(".social-icon");
      if (icons) {
        ScrollTrigger.batch(icons, {
          onEnter: (batch) => {
            gsap.fromTo(
              batch,
              { opacity: 0, y: 10 },
              { opacity: 1, y: 0, duration: 0.4, stagger: 0.06, ease: "power2.out", overwrite: true }
            );
          },
          start: "top 90%",
          once: true,
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReduced]);

  const socialLinkClass = "w-11 h-11 rounded-lg border border-brand-cardBorder bg-[#111317] text-neutral-400 flex items-center justify-center transition-all duration-200 social-icon";
  const socialHoverClass = "hover:border-brand-teal hover:text-brand-teal hover:scale-110";

  return (
    <section
      ref={sectionRef}
      className="py-24 border-b border-brand-cardBorder"
      data-purpose="contact-section"
      id="contact"
    >
      <div ref={contentRef} className="max-w-4xl mx-auto px-6 text-center space-y-8">
        <span className="font-mono text-xs text-brand-teal uppercase tracking-widest contact-reveal">
          05 / CONTACT
        </span>

        <h2 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white contact-reveal">
          Let's build something
        </h2>

        <p className="text-neutral-400 text-base sm:text-lg max-w-xl mx-auto font-normal contact-reveal">
          Have an ambitious product, internship, or engineering challenge in mind? I'd like to hear about it.
        </p>

        <div className="pt-4 pb-2 flex flex-col items-center gap-2 contact-reveal">
          <div className="relative inline-flex items-center">
            <a
              href={`mailto:${email}`}
              onClick={handleCopyEmail}
              className="inline-flex items-center gap-3 text-xl sm:text-2xl font-mono text-brand-teal hover:text-white border-b-2 border-brand-teal pb-1 transition-colors group cursor-pointer"
              title="Click to copy email address"
            >
              <span>{email}</span>
              <AnimatePresence mode="wait">
                {copied ? (
                  <motion.span
                    key="check"
                    initial={prefersReduced ? false : { opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Check className="w-5 h-5 text-brand-teal" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="copy"
                    initial={prefersReduced ? false : { opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Copy className="w-5 h-5 transition-transform group-hover:scale-110 text-brand-teal" />
                  </motion.span>
                )}
              </AnimatePresence>
            </a>
          </div>

          <span
            className={`text-xs font-mono transition-opacity duration-200 ${
              copied ? "opacity-100 text-brand-teal" : "opacity-0 text-neutral-500"
            }`}
          >
            ✓ Email copied to clipboard
          </span>
        </div>

        <div ref={socialsRef} className="pt-6 flex items-center justify-center gap-3">
          <a aria-label="GitHub" className={`${socialLinkClass} ${socialHoverClass}`} href={githubUrl} rel="noopener noreferrer" target="_blank" title="GitHub Profile">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </svg>
          </a>
          <a aria-label="LinkedIn" className={`${socialLinkClass} ${socialHoverClass} font-mono text-xs font-semibold`} href={linkedinUrl} rel="noopener noreferrer" target="_blank" title="LinkedIn Profile">in</a>
          <a aria-label="LeetCode Profile" className={`${socialLinkClass} ${socialHoverClass} font-mono text-xs font-semibold`} href={leetcodeUrl} rel="noopener noreferrer" target="_blank" title="LeetCode Profile">&lt;/&gt;</a>
          <a aria-label="Microsoft Learn Profile" className={`${socialLinkClass} ${socialHoverClass}`} href={learnUrl} rel="noopener noreferrer" target="_blank" title="Microsoft Learn Profile">
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};
