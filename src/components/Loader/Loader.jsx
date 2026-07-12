/* ============================================
   Loader — Cyberpunk Boot Sequence
   A full-screen loading overlay that simulates
   booting into a cyberpunk operating system.
   ============================================ */

import { useState, useEffect, useCallback } from 'react';
import './Loader.css';

const BOOT_SEQUENCE = [
  { text: '> INITIALIZING SYSTEM...', delay: 0, duration: 150 },
  { text: '> LOADING NEURAL INTERFACE...', delay: 150, duration: 150 },
  { text: '> CONNECTING TO THE GRID...', delay: 300, duration: 150 },
  { text: '> DECRYPTING PROTOCOLS... [OK]', delay: 450, duration: 100, type: 'success' },
  { text: '> WELCOME, OPERATOR', delay: 600, duration: 150, type: 'welcome' },
];

const TOTAL_DURATION = 800; // ms before fade-out begins
const FADE_DURATION = 400;  // matches CSS transition

const Loader = ({ onComplete }) => {
  const [visibleLines, setVisibleLines] = useState([]);
  const [progress, setProgress] = useState(0);
  const [isHidden, setIsHidden] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  // Progress bar animation
  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min((elapsed / TOTAL_DURATION) * 100, 100);
      setProgress(pct);

      if (pct >= 100) {
        clearInterval(interval);
      }
    }, 15);

    return () => clearInterval(interval);
  }, []);

  // Boot sequence lines
  useEffect(() => {
    const timers = BOOT_SEQUENCE.map((line, index) =>
      setTimeout(() => {
        setVisibleLines((prev) => [...prev, { ...line, id: index }]);
      }, line.delay)
    );

    return () => timers.forEach(clearTimeout);
  }, []);

  // Fade-out and completion
  const handleComplete = useCallback((e) => {
    if (e) {
      e.stopPropagation();
    }
    setShowCursor(false);
    setIsHidden(true);

    const fadeTimer = setTimeout(() => {
      onComplete?.();
    }, FADE_DURATION);

    return () => clearTimeout(fadeTimer);
  }, [onComplete]);

  useEffect(() => {
    const completeTimer = setTimeout(() => handleComplete(), TOTAL_DURATION);
    return () => clearTimeout(completeTimer);
  }, [handleComplete]);

  return (
    <div
      className={`loader ${isHidden ? 'loader--hidden' : ''}`}
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Loading portfolio"
      onClick={() => handleComplete()}
      style={{ cursor: 'pointer' }}
    >
      {/* Skip Button */}
      <button 
        className="loader__skip cyber-btn" 
        onClick={(e) => handleComplete(e)}
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          fontSize: '0.7rem',
          padding: '6px 12px',
          zIndex: 10,
          background: 'rgba(13,13,13,0.8)',
        }}
      >
        <span>[ SKIP_BOOT ]</span>
      </button>

      {/* Scanline overlay */}
      <div className="loader__scanlines" aria-hidden="true" />

      {/* Main boot log */}
      <div className="loader__content">
        <div className="loader__header">
          ◈ NEON_CITY OS v2.7.1 ◈
        </div>

        <div className="loader__log" aria-live="polite">
          {visibleLines.map((line) => (
            <div
              key={line.id}
              className={`loader__line ${
                line.type === 'success' ? 'loader__line--success' : ''
              } ${line.type === 'welcome' ? 'loader__line--welcome' : ''}`}
            >
              <span>{line.text}</span>
            </div>
          ))}
          {showCursor && visibleLines.length > 0 && visibleLines.length < BOOT_SEQUENCE.length && (
            <span className="loader__cursor" aria-hidden="true" />
          )}
        </div>

        <div className="loader__status">
          <span className="loader__status-dot" />
          <span>System boot in progress (Click anywhere to skip)</span>
        </div>
      </div>

      {/* Bottom progress bar */}
      <div className="loader__progress-container">
        <div className="loader__progress-info">
          <span>Loading modules</span>
          <span className="loader__progress-percent">
            {Math.round(progress)}%
          </span>
        </div>
        <div className="loader__progress-track">
          <div
            className="loader__progress-bar"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="loader__version" aria-hidden="true">
        SK_PORTFOLIO // BUILD 2026.07
      </div>
    </div>
  );
};

export default Loader;
