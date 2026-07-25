export const scrollState = {
  progress: 0,
  velocity: 0,
  sectionIndex: 0,
  sectionProgress: 0,
};

export const SECTION_COLORS = [
  '#00F0FF', // hero: cyan
  '#00F0FF', // about: cyan
  '#FF00AA', // projects: magenta
  '#00F0FF', // opensource: cyan
  '#00F0FF', // certs: cyan
  '#FF00AA', // skills: magenta
  '#FF00AA', // contact: magenta
];

export const TOTAL_SECTIONS = SECTION_COLORS.length;

export const SECTION_CONFIGS = [
  {
    name: 'hero',
    color: '#00F0FF',
    drone: { posLerp: 0.08, bobAmp: 0.04, bobSpeed: 1.5, bankMult: 4, glowSpeed: 2, glowRange: 0.1, baseEmissive: 0.6, opacity: 0.9 },
  },
  {
    name: 'about',
    color: '#00F0FF',
    drone: { posLerp: 0.06, bobAmp: 0.03, bobSpeed: 1.2, bankMult: 3, glowSpeed: 1.8, glowRange: 0.08, baseEmissive: 0.5, opacity: 0.85 },
  },
  {
    name: 'projects',
    color: '#FF00AA',
    drone: { posLerp: 0.10, bobAmp: 0.06, bobSpeed: 2.0, bankMult: 6, glowSpeed: 3, glowRange: 0.15, baseEmissive: 0.7, opacity: 0.95 },
  },
  {
    name: 'opensource',
    color: '#00F0FF',
    drone: { posLerp: 0.07, bobAmp: 0.04, bobSpeed: 1.4, bankMult: 4, glowSpeed: 2.2, glowRange: 0.1, baseEmissive: 0.6, opacity: 0.9 },
  },
  {
    name: 'certs',
    color: '#00F0FF',
    drone: { posLerp: 0.07, bobAmp: 0.03, bobSpeed: 1.3, bankMult: 3.5, glowSpeed: 1.9, glowRange: 0.09, baseEmissive: 0.55, opacity: 0.85 },
  },
  {
    name: 'skills',
    color: '#FF00AA',
    drone: { posLerp: 0.09, bobAmp: 0.05, bobSpeed: 1.8, bankMult: 5, glowSpeed: 2.5, glowRange: 0.12, baseEmissive: 0.65, opacity: 0.9 },
  },
  {
    name: 'contact',
    color: '#FF00AA',
    drone: { posLerp: 0.08, bobAmp: 0.05, bobSpeed: 1.6, bankMult: 5, glowSpeed: 2.4, glowRange: 0.12, baseEmissive: 0.65, opacity: 0.9 },
  },
];

