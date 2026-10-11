import React, { useState, useEffect } from "react";
import { ArrowDown, Menu, X, FileText } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "./ui/button";
import { useReducedMotion } from "../hooks/useReducedMotion";

interface NavbarProps {
  resumeUrl?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ resumeUrl = "/resume.pdf" }) => {
  const [activeSection, setActiveSection] = useState("hero");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = ["hero", "about", "work", "opensource", "certifications", "contact"];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { num: "00", label: "Hero", href: "#hero", id: "hero" },
    { num: "01", label: "About", href: "#about", id: "about" },
    { num: "02", label: "Work", href: "#work", id: "work" },
    { num: "03", label: "Open Source", href: "#opensource", id: "opensource" },
    { num: "04", label: "Certifications", href: "#certifications", id: "certifications" },
    { num: "05", label: "Contact", href: "#contact", id: "contact" },
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 border-b ${
        scrolled
          ? "backdrop-blur-md bg-[#08090A]/85 border-brand-cardBorder shadow-lg shadow-black/40"
          : "backdrop-blur-md bg-[#08090A]/70 border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Monogram brand mark */}
        <a
          aria-label="Home"
          className="flex items-center gap-3 group focus:outline-none"
          href="#"
        >
          <div className="w-10 h-10 flex items-center justify-center transition-transform duration-200 group-hover:scale-105 group-hover:drop-shadow-[0_0_12px_rgba(62,207,142,0.4)]">
            <img
              src="/images/logo.png"
              alt="Soham Kolhe Logo"
              className="w-full h-full object-contain rounded-xl"
              width={40}
              height={40}
            />
          </div>
        </a>

        {/* Center navigation links */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-mono tracking-wider uppercase text-neutral-400 relative">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                className={`relative transition-colors flex items-center gap-1.5 py-2 ${
                  isActive
                    ? "text-brand-teal"
                    : "hover:text-brand-teal text-neutral-400"
                }`}
              >
                <span className={isActive ? "text-brand-teal" : "text-neutral-500"}>
                  {item.num}
                </span>
                {item.label}
                {isActive && (
                  <motion.span
                    layoutId={prefersReduced ? undefined : "nav-indicator"}
                    className="absolute -bottom-0.5 left-0 right-0 h-[2px] bg-brand-teal rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Right resume action button */}
        <div className="hidden sm:flex items-center">
          <Button
            asChild
            variant="secondary"
            size="sm"
            className="group gap-2 border-brand-cardBorder hover:border-brand-teal/60 hover:text-brand-teal text-neutral-200"
          >
            <a href={resumeUrl} target="_blank" rel="noopener noreferrer">
              Resume
              <ArrowDown className="w-3.5 h-3.5 transition-transform group-hover:translate-y-0.5" />
            </a>
          </Button>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 text-neutral-400 hover:text-white focus:outline-none"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile dropdown menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={prefersReduced ? false : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="md:hidden overflow-hidden bg-brand-card border-b border-brand-cardBorder"
          >
            <div className="px-6 py-4 space-y-3 font-mono text-xs uppercase tracking-wider">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between py-2 text-neutral-300 hover:text-brand-teal border-b border-neutral-900 last:border-0"
                >
                  <span>{item.label}</span>
                  <span className="text-brand-teal">{item.num}</span>
                </a>
              ))}
              <div className="pt-2">
                <a
                  href={resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded bg-brand-card border border-brand-teal-border text-brand-teal font-mono text-xs"
                >
                  <FileText className="w-4 h-4" />
                  Download Resume
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
