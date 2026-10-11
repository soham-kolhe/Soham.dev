import React from "react";
import { SmoothScroll } from "./components/SmoothScroll";
import { GlobalBackgroundFlow } from "./components/GlobalBackgroundFlow";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { SelectedWork } from "./components/SelectedWork";
import { OpenSource } from "./components/OpenSource";
import { Certifications } from "./components/Certifications";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <SmoothScroll>
      <div className="min-h-screen bg-[#08090A] text-[#F3F4F6] font-sans antialiased selection:bg-brand-teal selection:text-black relative">
        {/* Global Reactive Cursor Flow & Ambient Particle Background */}
        <GlobalBackgroundFlow />

        {/* Top Navigation */}
        <Navbar resumeUrl="/resume.pdf" />

        <main>
          {/* Hero Section */}
          <Hero
            name="Soham Kolhe"
            role="OPEN TO OPPORTUNITIES"
            subheading="Building real-time & AI-integrated web applications"
            techSpecs="React · Node.js · MongoDB · Cloud-native systems"
            availability="Open to Internship Opportunities"
            resumeUrl="/resume.pdf"
            profileImgUrl="/images/soham-profile.svg"
          />

          {/* 01 / About Section with Skills Matrix & Metrics */}
          <About sectionNumber="01 /" />

          {/* 02 / Selected Work Section with Project Cards */}
          <SelectedWork sectionNumber="02 /" />

          {/* 03 / Open Source Section with Timeline Contribution Entry */}
          <OpenSource sectionNumber="03 /" />

          {/* 04 / Certifications Section with Flagship Card & Grid */}
          <Certifications sectionNumber="04 /" />

          {/* 05 / Contact Section with Interactive Email & Socials */}
          <Contact
            email="sohamkolhe20@gmail.com"
            githubUrl="https://github.com/soham-kolhe"
            linkedinUrl="https://www.linkedin.com/in/soham-kolhe3318/"
            leetcodeUrl="https://leetcode.com/u/Soham_Kolhe/"
            learnUrl="https://learn.microsoft.com/en-us/users/sohamkolhe-0425/"
          />
        </main>

        {/* Site Footer */}
        <Footer />
      </div>
    </SmoothScroll>
  );
}
