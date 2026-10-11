import React, { useEffect, useRef } from "react";
import { useReducedMotion } from "../hooks/useReducedMotion";

interface NodePoint {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseRadius: number;
  radius: number;
  alpha: number;
  baseAlpha: number;
  color: string;
  pulsePhase: number;
  pulseSpeed: number;
  energy: number; // Click / excitation energy (0 to 1)
}

interface SynapseSignal {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  progress: number;
  speed: number;
  color: string;
  alpha: number;
}

interface ClickSurge {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
  speed: number;
}

interface NeuralConstellationProps {
  nodeCount?: number;
  maxDistance?: number;
  cursorRadius?: number;
  brandColor?: string;
  glowColor?: string;
}

export const GlobalBackgroundFlow: React.FC<NeuralConstellationProps> = ({
  nodeCount = 68,
  maxDistance = 125,
  cursorRadius = 210,
  brandColor = "#3ECF8E",
  glowColor = "rgba(62, 207, 142, 0.12)",
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // DPR scaling for Retina displays
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    // Mouse coordinates with spring lerp
    const mouse = {
      x: width / 2,
      y: height / 2,
      targetX: width / 2,
      targetY: height / 2,
      lastX: width / 2,
      lastY: height / 2,
      speed: 0,
      isActive: false,
    };

    // Initialize neural nodes
    const colors = [
      "rgba(62, 207, 142, ",  // Brand teal
      "rgba(52, 211, 153, ",  // Emerald
      "rgba(45, 212, 191, ",  // Cyan
      "rgba(240, 253, 250, ", // Soft starlight core
    ];

    const nodes: NodePoint[] = Array.from({ length: nodeCount }, () => {
      const baseAlpha = 0.25 + Math.random() * 0.45;
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        baseRadius: 1.2 + Math.random() * 1.8,
        radius: 1.2 + Math.random() * 1.8,
        alpha: baseAlpha,
        baseAlpha: baseAlpha,
        color: colors[Math.floor(Math.random() * colors.length)],
        pulsePhase: Math.random() * Math.PI * 2,
        pulseSpeed: 0.02 + Math.random() * 0.025,
        energy: 0,
      };
    });

    const surges: ClickSurge[] = [];
    const signals: SynapseSignal[] = [];

    // Resize handler with Retina support
    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const handlePointerMove = (e: MouseEvent | PointerEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouse.isActive = true;
    };

    const handlePointerDown = (e: MouseEvent | PointerEvent) => {
      surges.push({
        x: e.clientX,
        y: e.clientY,
        radius: 0,
        maxRadius: Math.min(width, height) * 0.5,
        alpha: 0.7,
        speed: 7,
      });

      // Excite nearby nodes
      for (const node of nodes) {
        const d = Math.hypot(node.x - e.clientX, node.y - e.clientY);
        if (d < cursorRadius * 1.5) {
          node.energy = Math.max(node.energy, 1 - d / (cursorRadius * 1.5));
        }
      }
    };

    const handlePointerLeave = () => {
      mouse.isActive = false;
    };

    window.addEventListener("resize", handleResize, { passive: true });
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerdown", handlePointerDown, { passive: true });
    document.addEventListener("mouseleave", handlePointerLeave, { passive: true });

    let time = 0;

    // Main animation loop
    const render = () => {
      time += 0.016;

      // Lerp mouse coordinates with smooth spring inertia
      const lerp = 0.09;
      mouse.x += (mouse.targetX - mouse.x) * lerp;
      mouse.y += (mouse.targetY - mouse.y) * lerp;

      const dx = mouse.x - mouse.lastX;
      const dy = mouse.y - mouse.lastY;
      mouse.speed = Math.hypot(dx, dy);
      mouse.lastX = mouse.x;
      mouse.lastY = mouse.y;

      ctx.clearRect(0, 0, width, height);

      // 1. Soft Ambient Cursor Aura (Neural Core Glow)
      if (mouse.isActive || mouse.speed > 0.1) {
        const dynamicGlowRadius = cursorRadius + Math.min(mouse.speed * 3.5, 90);
        const radialGlow = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          dynamicGlowRadius
        );

        radialGlow.addColorStop(0, glowColor);
        radialGlow.addColorStop(0.35, "rgba(62, 207, 142, 0.05)");
        radialGlow.addColorStop(0.7, "rgba(20, 184, 166, 0.018)");
        radialGlow.addColorStop(1, "rgba(8, 9, 10, 0)");

        ctx.fillStyle = radialGlow;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, dynamicGlowRadius, 0, Math.PI * 2);
        ctx.fill();
      }

      // 2. Click Shockwaves / Neural Energy Surges
      for (let s = surges.length - 1; s >= 0; s--) {
        const surge = surges[s];
        surge.radius += surge.speed;
        surge.alpha = Math.max(0, surge.alpha - 0.015);

        if (surge.alpha <= 0 || surge.radius >= surge.maxRadius) {
          surges.splice(s, 1);
          continue;
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(surge.x, surge.y, surge.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(62, 207, 142, ${surge.alpha * 0.75})`;
        ctx.lineWidth = 1.6;
        ctx.stroke();
        ctx.restore();
      }

      // 3. Update Nodes & Physics
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];

        // Free-floating random drift — nodes move on their own, never pulled by cursor
        n.x += n.vx;
        n.y += n.vy;

        // Wrap edges smoothly
        if (n.x < -20) n.x = width + 20;
        if (n.x > width + 20) n.x = -20;
        if (n.y < -20) n.y = height + 20;
        if (n.y > height + 20) n.y = -20;

        // Decay energy
        if (n.energy > 0) {
          n.energy = Math.max(0, n.energy - 0.018);
        }

        // Check cursor proximity — boost brightness & spawn signals, but NO position change
        const mDx = mouse.x - n.x;
        const mDy = mouse.y - n.y;
        const mDist = Math.hypot(mDx, mDy);

        if (mDist < cursorRadius && mDist > 0) {
          const proximity = 1 - mDist / cursorRadius;
          // Only visual: brighten and enlarge the node, do NOT move it
          n.radius = n.baseRadius * (1 + proximity * 0.7);
          n.alpha = Math.min(0.95, n.baseAlpha + proximity * 0.45);

          // Randomly spawn energetic synaptic signal pulses traveling along the connection
          if (Math.random() < 0.012 && signals.length < 15) {
            signals.push({
              startX: n.x,
              startY: n.y,
              endX: mouse.x,
              endY: mouse.y,
              progress: 0,
              speed: 0.035 + Math.random() * 0.02,
              color: "rgba(62, 207, 142, 0.9)",
              alpha: 0.9,
            });
          }
        } else {
          // Harmonic pulse
          const pulse = Math.sin(time * n.pulseSpeed * 10 + n.pulsePhase) * 0.15;
          n.alpha = Math.max(0.12, Math.min(0.85, n.baseAlpha + pulse + n.energy * 0.4));
          n.radius = n.baseRadius * (1 + n.energy * 0.5);
        }
      }

      // 4. Draw Inter-Node Synapse Connections (Mesh Lines)
      ctx.lineWidth = 0.85;
      for (let i = 0; i < nodes.length; i++) {
        const nA = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const nB = nodes[j];
          const dist = Math.hypot(nA.x - nB.x, nA.y - nB.y);

          if (dist < maxDistance) {
            const proximity = 1 - dist / maxDistance;
            const lineAlpha = proximity * 0.18 * Math.max(nA.alpha, nB.alpha);

            ctx.strokeStyle = `rgba(62, 207, 142, ${lineAlpha})`;
            ctx.beginPath();
            ctx.moveTo(nA.x, nA.y);
            ctx.lineTo(nB.x, nB.y);
            ctx.stroke();
          }
        }
      }

      // 5. Draw Active Cursor-to-Node Synapses
      if (mouse.isActive || mouse.speed > 0.1) {
        for (let i = 0; i < nodes.length; i++) {
          const n = nodes[i];
          const dist = Math.hypot(n.x - mouse.x, n.y - mouse.y);

          if (dist < cursorRadius) {
            const proximity = 1 - dist / cursorRadius;
            const lineAlpha = Math.pow(proximity, 1.4) * 0.45;

            // Gradient line fading toward cursor
            const lineGrad = ctx.createLinearGradient(n.x, n.y, mouse.x, mouse.y);
            lineGrad.addColorStop(0, `rgba(62, 207, 142, ${lineAlpha * 0.7})`);
            lineGrad.addColorStop(1, `rgba(62, 207, 142, ${lineAlpha * 1.2})`);

            ctx.strokeStyle = lineGrad;
            ctx.lineWidth = 1 + proximity * 0.8;
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        }
      }

      // 6. Draw Synaptic Electrical Traveling Signals
      for (let k = signals.length - 1; k >= 0; k--) {
        const sig = signals[k];
        sig.progress += sig.speed;

        if (sig.progress >= 1) {
          signals.splice(k, 1);
          continue;
        }

        const currX = sig.startX + (sig.endX - sig.startX) * sig.progress;
        const currY = sig.startY + (sig.endY - sig.startY) * sig.progress;

        ctx.fillStyle = sig.color;
        ctx.beginPath();
        ctx.arc(currX, currY, 1.8, 0, Math.PI * 2);
        ctx.fill();
      }

      // 7. Draw Neural Nodes (Glowing Dots)
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];

        // Outer soft glow
        const nodeGlow = ctx.createRadialGradient(
          n.x,
          n.y,
          0,
          n.x,
          n.y,
          n.radius * 3.2
        );
        nodeGlow.addColorStop(0, `${n.color}${n.alpha * 0.85})`);
        nodeGlow.addColorStop(1, "rgba(8, 9, 10, 0)");

        ctx.fillStyle = nodeGlow;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius * 3.2, 0, Math.PI * 2);
        ctx.fill();

        // Inner solid core
        ctx.fillStyle = `${n.color}${Math.min(1, n.alpha + 0.2)})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // 8. Draw Central Cursor Neural Hub Dot
      if (mouse.isActive) {
        ctx.fillStyle = brandColor;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 2.5, 0, Math.PI * 2);
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("mouseleave", handlePointerLeave);
    };
  }, [nodeCount, maxDistance, cursorRadius, brandColor, glowColor, prefersReduced]);

  if (prefersReduced) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-transparent"
    >
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
};
