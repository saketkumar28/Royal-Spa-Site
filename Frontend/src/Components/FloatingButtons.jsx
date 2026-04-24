// src/Components/FloatingButtons.jsx
// Left: floating call button   Right: scroll-to-top button
import { useState, useEffect } from "react";

const GOLD = "#C9A84C";
const BLACK = "#0A0A0A";
const PHONE = "+919392211285"; // tel: link (no spaces)
const DISPLAY = "+91 93922 11285"; // shown in tooltip

export default function FloatingButtons() {
  const [showScroll, setShowScroll] = useState(false);
  const [callHover, setCallHover] = useState(false);
  const [topHover, setTopHover] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowScroll(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  // ── shared button base ──────────────────────────────────────────────────────
  const base = {
    position: "fixed",
    width: 48,
    height: 48,
    borderRadius: "50%",
    border: `1.5px solid ${GOLD}`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    zIndex: 9000,
    transition: "transform 0.25s, background 0.25s, box-shadow 0.25s",
    boxShadow: "0 4px 20px rgba(0,0,0,0.55)",
  };

  return (
    <>
      {/* ── LEFT: Call button ─────────────────────────────────────────────── */}
      <a
        href={`tel:${PHONE}`}
        aria-label={`Call us at ${DISPLAY}`}
        title={`Call: ${DISPLAY}`}
        style={{
          ...base,
          bottom: 28,
          left: 20,
          background: callHover ? GOLD : "rgba(10,10,10,0.92)",
          transform: callHover ? "scale(1.12)" : "scale(1)",
          textDecoration: "none",
        }}
        onMouseEnter={() => setCallHover(true)}
        onMouseLeave={() => setCallHover(false)}
      >
        {/* Phone SVG icon */}
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24
               c1.12.37 2.33.57 3.58.57a1 1 0 011 1V20a1 1 0 01-1 1
               C10.61 21 3 13.39 3 4a1 1 0 011-1h3.5a1 1 0 011 1
               c0 1.25.2 2.46.57 3.58a1 1 0 01-.25 1.01l-2.2 2.2z"
            fill={callHover ? BLACK : GOLD}
          />
        </svg>

        {/* Pulse ring */}
        <span
          style={{
            position: "absolute",
            inset: -6,
            borderRadius: "50%",
            border: `1.5px solid ${GOLD}`,
            opacity: callHover ? 0 : 0.35,
            animation: "callPulse 2s ease-out infinite",
            pointerEvents: "none",
          }}
        />
      </a>

      {/* ── RIGHT: Scroll-to-top button ───────────────────────────────────── */}
      <button
        onClick={scrollToTop}
        aria-label="Scroll to top"
        title="Back to top"
        style={{
          ...base,
          bottom: 28,
          right: 20,
          background: topHover ? GOLD : "rgba(10,10,10,0.92)",
          transform: topHover
            ? "scale(1.12) translateY(-3px)"
            : showScroll
              ? "scale(1) translateY(0)"
              : "scale(0.6) translateY(16px)",
          opacity: showScroll ? 1 : 0,
          pointerEvents: showScroll ? "all" : "none",
        }}
        onMouseEnter={() => setTopHover(true)}
        onMouseLeave={() => setTopHover(false)}
      >
        {/* Up-arrow SVG */}
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 19V5M5 12l7-7 7 7"
            stroke={topHover ? BLACK : GOLD}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* ── Keyframe for call pulse ring ──────────────────────────────────── */}
      <style>{`
        @keyframes callPulse {
          0%   { transform: scale(1);   opacity: 0.35; }
          70%  { transform: scale(1.5); opacity: 0;    }
          100% { transform: scale(1.5); opacity: 0;    }
        }
      `}</style>
    </>
  );
}
