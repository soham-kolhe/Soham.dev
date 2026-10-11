import React, { useEffect, useRef, useState, useMemo } from "react";
import { ArrowDown, ExternalLink } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "motion/react";
import { Button } from "./ui/button";
import { useReducedMotion } from "../hooks/useReducedMotion";
import DecryptedText from "./DecryptedText";
import Lanyard from "./Lanyard";
import { createCardTexture, loadProfileTexture } from "./cardCanvas";

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  name?: string;
  role?: string;
  subheading?: string;
  techSpecs?: string;
  availability?: string;
  resumeUrl?: string;
  profileImgUrl?: string;
}

export const Hero: React.FC<HeroProps> = ({
  name = "Soham Kolhe",
  role = "OPEN TO OPPORTUNITIES",
  subheading = "Building real-time & AI-integrated web applications",
  techSpecs = "React · Node.js · MongoDB · Cloud-native systems",
  availability: _availability = "Open to Internship Opportunities",
  resumeUrl = "/resume.pdf",
  profileImgUrl = "/images/soham-profile.svg",
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const decryptedRoleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const safeZoneRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLAnchorElement>(null);
  const prefersReduced = useReducedMotion();

  const roles = useMemo(
    () => [
      "Full-Stack Developer",
      "Frontend Developer",
      "AI Systems Developer",
      "Competitive Coder",
      "Cloud Solutions Builder",
    ],
    []
  );
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);

  // Generate dynamic front/back textures with user profile photo integrated
  const [frontImage, setFrontImage] = useState<string | null>(() => {
    return typeof window !== "undefined" ? createCardTexture("front", null) : null;
  });

  const backImage = useMemo(() => {
    return typeof window !== "undefined" ? createCardTexture("back") : null;
  }, []);

  // Preload profile image (SVG, PNG, JPG) and re-render the card texture with the photo
  useEffect(() => {
    if (typeof window === "undefined") return;
    let isMounted = true;
    loadProfileTexture(profileImgUrl).then((tex) => {
      if (isMounted && tex) {
        setFrontImage(tex);
      }
    });
    return () => {
      isMounted = false;
    };
  }, [profileImgUrl]);

  useEffect(() => {
    if (prefersReduced) return;
    const timer = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2000);
    return () => clearInterval(timer);
  }, [prefersReduced, roles.length]);

  useEffect(() => {
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      // 1. Eyebrow fade up
      tl.fromTo(
        eyebrowRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.5 }
      );

      // 2. Headline words stagger
      if (headlineRef.current) {
        const words = headlineRef.current.querySelectorAll(".hero-word");
        tl.fromTo(
          words,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.08 },
          "-=0.3"
        );
      }

      // 2.5. Decrypted role entrance
      if (decryptedRoleRef.current) {
        tl.fromTo(
          decryptedRoleRef.current,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.5 },
          "-=0.25"
        );
      }

      // 3. Subtitle + tech specs
      tl.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.5 },
        "-=0.35"
      );

      // 4. CTAs fade + scale
      tl.fromTo(
        ctaRef.current,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.5 },
        "-=0.2"
      );

      // 5. 3D Interactive Lanyard Entrance
      if (photoRef.current) {
        tl.fromTo(
          photoRef.current,
          { opacity: 0, scale: 0.92, y: 30 },
          { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: "power2.out" },
          "-=0.3"
        );
      }

      // 6. Scroll indicator fade out on scroll
      if (scrollIndicatorRef.current) {
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top top",
          end: "10% top",
          scrub: true,
          onUpdate: (self) => {
            gsap.set(scrollIndicatorRef.current, {
              opacity: 1 - self.progress * 2,
            });
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReduced]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[calc(100vh-5rem)] lg:h-[calc(100vh-5rem)] flex flex-col justify-between py-6 sm:py-8 lg:py-6 border-b border-brand-cardBorder overflow-hidden"
      data-purpose="hero-section"
      id="hero"
    >
      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center flex-1 relative z-10 my-auto">
        {/* Left Hero Content Column */}
        <div className="lg:col-span-6 xl:col-span-6 flex flex-col justify-center space-y-4 sm:space-y-5 lg:space-y-4">
          {/* Role Eyebrow with Active Indicator Dot */}
          <div ref={eyebrowRef} className="flex items-center gap-2.5" style={prefersReduced ? {} : { opacity: 0 }}>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-teal opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-teal" />
            </span>
            <span className="font-mono text-xs text-brand-teal uppercase tracking-widest font-medium">
              {role}
            </span>
          </div>

          {/* Hero Main Title */}
          <div className="space-y-2">
            <h1
              ref={headlineRef}
              className="font-pixel text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-normal tracking-wide text-white leading-[1.08]"
            >
              <span className="hero-word inline-block" style={prefersReduced ? {} : { opacity: 0 }}>
                {name.split(" ")[0]}
              </span>
              <br />
              <span className="hero-word inline-block" style={prefersReduced ? {} : { opacity: 0 }}>
                {name.split(" ").slice(1).join(" ")}
              </span>
            </h1>

            {/* Decrypted Dynamic Role Under Name */}
            <div
              ref={decryptedRoleRef}
              className="pt-1 flex items-center"
              style={prefersReduced ? {} : { opacity: 0 }}
            >
              <button
                type="button"
                onClick={() => setCurrentRoleIndex((prev) => (prev + 1) % roles.length)}
                className="inline-flex items-center gap-2.5 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-brand-card/90 border border-brand-cardBorder backdrop-blur-md shadow-lg shadow-black/40 hover:border-brand-teal/60 hover:shadow-brand-teal/10 transition-all cursor-pointer group text-left"
                title="Click to cycle next role or hover to decrypt"
              >
                <span className="text-brand-teal font-mono text-base sm:text-lg font-bold select-none">&gt;</span>
                <DecryptedText
                  key={currentRoleIndex}
                  text={roles[currentRoleIndex]}
                  animateOn="view"
                  speed={14}
                  maxIterations={8}
                  sequential={true}
                  revealDirection="start"
                  className="text-brand-teal font-mono font-semibold text-base sm:text-lg lg:text-xl tracking-wide"
                  encryptedClassName="text-neutral-500 font-mono text-base sm:text-lg lg:text-xl"
                  parentClassName="font-mono text-base sm:text-lg lg:text-xl"
                />
                <span className="w-2.5 h-5 bg-brand-teal/90 inline-block animate-pulse rounded-xs ml-0.5" />
              </button>
            </div>
          </div>

          {/* Subheading & Tech Stack Specs */}
          <div ref={subtitleRef} className="space-y-2 pt-1" style={prefersReduced ? {} : { opacity: 0 }}>
            <p className="text-lg sm:text-xl lg:text-2xl text-neutral-200 font-normal leading-relaxed max-w-xl">
              {subheading}
            </p>
            <p className="text-xs sm:text-sm font-mono text-neutral-400 tracking-wide">
              {techSpecs}
            </p>
          </div>

          {/* Hero Action CTAs */}
          <div ref={ctaRef} className="pt-2 sm:pt-3 flex flex-wrap items-center gap-4" style={prefersReduced ? {} : { opacity: 0 }}>
            <Button asChild size="lg">
              <a href="#work" className="inline-flex items-center gap-2">
                View Work
                <ArrowDown className="w-4 h-4" />
              </a>
            </Button>

            <Button asChild variant="outline" size="lg">
              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2"
              >
                Download Resume
                <ExternalLink className="w-4 h-4" />
              </a>
            </Button>
          </div>
        </div>

        {/* Right Hero Visual Column: 3D Interactive Lanyard with enlarged card hero image (Visual Anchor) */}
        <div
          ref={photoRef}
          className="lg:col-span-6 xl:col-span-6 flex items-center justify-center relative w-full h-[500px] sm:h-[540px] lg:h-[580px] xl:h-[620px]"
          style={prefersReduced ? {} : { opacity: 0 }}
        >
          {/* Safe zone boundary wrapper inset from the container edges */}
          <div
            ref={safeZoneRef}
            className="absolute inset-4 sm:inset-6 lg:inset-8 pointer-events-none"
          />

          {/* Framer Motion constrained draggable ID-card container */}
          <motion.div
            drag={!prefersReduced}
            dragConstraints={safeZoneRef}
            dragElastic={0.15}
            dragTransition={{ bounceStiffness: 300, bounceDamping: 20 }}
            whileDrag={{ scale: 1.02 }}
            className="w-full h-full relative z-20 touch-none cursor-grab active:cursor-grabbing"
          >
            <Lanyard
              position={[0, 0, 17.5]}
              gravity={[0, -40, 0]}
              fov={20}
              transparent={true}
              frontImage={frontImage}
              backImage={frontImage || backImage}
              imageFit="cover"
              lanyardWidth={1.15}
              cardScale={4.56}
              leashSegment={0.32}
            />
          </motion.div>
        </div>
      </div>

      {/* Bottom subtle scroll indicator */}
      <div className="max-w-7xl mx-auto px-6 w-full pt-2 pb-2 relative z-10">
        <a
          ref={scrollIndicatorRef}
          href="#about"
          className="inline-flex items-center gap-3 text-[11px] font-mono text-neutral-500 uppercase tracking-widest hover:text-brand-teal transition-colors"
        >
          <span className="w-4 h-7 rounded-full border border-neutral-700 flex items-start justify-center p-1">
            <span className="w-1 h-1.5 bg-brand-teal rounded-full animate-bounce" />
          </span>
          Scroll to explore
        </a>
      </div>
    </section>
  );
};
