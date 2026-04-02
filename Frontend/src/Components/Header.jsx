// src/components/Header.jsx
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const GOLD = "#C9A84C";
const GOLD_L = "#E8C97A";
const WHITE = "#F5F0E8";
const MUTED = "#9A9080";
const BLACK = "#0A0A0A";

const NAV = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Services", path: "/services" },
  { label: "Gallery", path: "/gallery" },
  { label: "Journal", path: "/journal" },
  { label: "Contact", path: "/contact" },
];

// ─── Inline SVG Logo ─────────────────────────────────────────────────────────
// Fully self-contained — no img src, no public/ file, works on any host
export function RoyalLogo({ width = 110 }) {
  const h = Math.round(width * 0.474);
  return (
    <svg
      width={width}
      height={h}
      viewBox="0 0 220 104"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: "block", overflow: "visible" }}
    >
      <text
        x="110"
        y="14"
        textAnchor="middle"
        fontFamily="Georgia,'Times New Roman',serif"
        fontSize="9"
        fontWeight="400"
        fill={GOLD}
        letterSpacing="5"
      >
        T H E
      </text>

      <text
        x="110"
        y="54"
        textAnchor="middle"
        fontFamily="Georgia,'Times New Roman',serif"
        fontSize="40"
        fontWeight="700"
        fill={GOLD}
        letterSpacing="3"
      >
        ROYAL
      </text>

      <line
        x1="18"
        y1="62"
        x2="94"
        y2="62"
        stroke={GOLD}
        strokeWidth="0.7"
        opacity="0.65"
      />
      <line
        x1="126"
        y1="62"
        x2="202"
        y2="62"
        stroke={GOLD}
        strokeWidth="0.7"
        opacity="0.65"
      />
      <rect
        x="106"
        y="57.5"
        width="8"
        height="8"
        fill={GOLD}
        transform="rotate(45 110 61.5)"
      />

      <text
        x="110"
        y="82"
        textAnchor="middle"
        fontFamily="Georgia,'Times New Roman',serif"
        fontSize="11"
        fontWeight="400"
        fill={GOLD}
        letterSpacing="8"
      >
        S A L O N
      </text>

      <text
        x="110"
        y="100"
        textAnchor="middle"
        fontFamily="Georgia,'Times New Roman',serif"
        fontSize="14"
        fontStyle="italic"
        fontWeight="300"
        fill={GOLD_L}
        letterSpacing="2"
      >
        &amp; Spa
      </text>
    </svg>
  );
}

// ─── Header Component ─────────────────────────────────────────────────────────
export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <style>{`
        .rh-desk { display: flex !important; }
        .rh-mob  { display: none  !important; }
        @media (max-width: 900px) {
          .rh-desk { display: none !important; }
          .rh-mob  { display: flex !important; }
          .rh-bar  { padding: 12px 20px !important; }
        }
      `}</style>

      {/* ── Navbar ── */}
      <header
        className="rh-bar"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          padding: "14px 48px",
          background:
            scrolled || menuOpen ? "rgba(10,10,10,0.97)" : "transparent",
          backdropFilter: scrolled ? "blur(14px)" : "none",
          borderBottom:
            scrolled && !menuOpen ? "1px solid rgba(201,168,76,0.12)" : "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          transition: "background 0.4s, border-color 0.4s",
        }}
      >
        <Link to="/" style={{ textDecoration: "none", lineHeight: 0 }}>
          <RoyalLogo width={100} />
        </Link>

        {/* Desktop links */}
        <nav className="rh-desk" style={{ gap: 28, alignItems: "center" }}>
          {NAV.map((n) => (
            <Link
              key={n.path}
              to={n.path}
              style={{
                color: pathname === n.path ? GOLD : MUTED,
                fontSize: 11,
                letterSpacing: 2.5,
                textTransform: "uppercase",
                fontWeight: 400,
                textDecoration: "none",
                fontFamily: "'Jost', sans-serif",
                transition: "color 0.25s",
                borderBottom:
                  pathname === n.path
                    ? `1px solid ${GOLD}`
                    : "1px solid transparent",
                paddingBottom: 2,
              }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <Link
          to="/booking"
          className="rh-desk"
          style={{
            background: "transparent",
            border: `1px solid ${GOLD}`,
            color: GOLD,
            padding: "9px 22px",
            fontSize: 10,
            letterSpacing: 3,
            textTransform: "uppercase",
            textDecoration: "none",
            fontFamily: "'Jost', sans-serif",
            fontWeight: 400,
            transition: "all 0.3s",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = GOLD;
            e.currentTarget.style.color = BLACK;
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.color = GOLD;
          }}
        >
          Book Now
        </Link>

        {/* Burger */}
        <button
          onClick={() => setMenuOpen((o) => !o)}
          className="rh-mob"
          aria-label="Toggle menu"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "6px 4px",
            flexDirection: "column",
            gap: 5,
            alignItems: "flex-end",
            justifyContent: "center",
          }}
        >
          <span
            style={{
              display: "block",
              width: 26,
              height: 1.5,
              background: GOLD,
              borderRadius: 2,
              transformOrigin: "center",
              transition: "transform 0.35s",
              transform: menuOpen
                ? "rotate(45deg) translate(4.5px, 4.5px)"
                : "none",
            }}
          />
          <span
            style={{
              display: "block",
              width: 18,
              height: 1.5,
              background: GOLD,
              borderRadius: 2,
              transition: "opacity 0.25s, transform 0.3s",
              opacity: menuOpen ? 0 : 1,
              transform: menuOpen ? "translateX(10px)" : "none",
            }}
          />
          <span
            style={{
              display: "block",
              width: 26,
              height: 1.5,
              background: GOLD,
              borderRadius: 2,
              transformOrigin: "center",
              transition: "transform 0.35s",
              transform: menuOpen
                ? "rotate(-45deg) translate(4.5px, -4.5px)"
                : "none",
            }}
          />
        </button>
      </header>

      {/* ── Mobile Overlay Menu ── */}
      <div
        aria-hidden={!menuOpen}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 999,
          background: "#0A0A0A",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? "all" : "none",
          transition: "opacity 0.35s ease",
          overflowY: "auto",
          padding: "90px 32px 48px",
          gap: 0,
        }}
      >
        {/* Logo big in overlay */}
        <div style={{ marginBottom: 32, textAlign: "center" }}>
          <RoyalLogo width={170} />
        </div>

        {/* Gold rule */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            width: "80%",
            maxWidth: 300,
            marginBottom: 24,
          }}
        >
          <div style={{ flex: 1, height: 1, background: GOLD, opacity: 0.3 }} />
          <div
            style={{
              width: 6,
              height: 6,
              background: GOLD,
              transform: "rotate(45deg)",
            }}
          />
          <div style={{ flex: 1, height: 1, background: GOLD, opacity: 0.3 }} />
        </div>

        {/* Links */}
        {NAV.map((n, i) => (
          <Link
            key={n.path}
            to={n.path}
            style={{
              color: pathname === n.path ? GOLD : WHITE,
              fontSize: 26,
              letterSpacing: 5,
              textTransform: "uppercase",
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 300,
              textDecoration: "none",
              padding: "13px 0",
              display: "block",
              textAlign: "center",
              width: "100%",
              borderBottom: "1px solid rgba(201,168,76,0.08)",
              opacity: menuOpen ? 1 : 0,
              transform: menuOpen ? "translateY(0)" : "translateY(14px)",
              transition: `opacity 0.4s ease ${i * 0.06}s, transform 0.4s ease ${i * 0.06}s`,
            }}
          >
            {n.label}
          </Link>
        ))}

        <Link
          to="/booking"
          style={{
            marginTop: 32,
            background: GOLD,
            color: BLACK,
            padding: "15px 56px",
            fontSize: 11,
            letterSpacing: 4,
            textTransform: "uppercase",
            textDecoration: "none",
            fontFamily: "'Jost', sans-serif",
            fontWeight: 500,
            display: "inline-block",
            textAlign: "center",
            opacity: menuOpen ? 1 : 0,
            transition: `opacity 0.4s ease ${NAV.length * 0.06 + 0.12}s`,
          }}
        >
          Book Now
        </Link>
      </div>
    </>
  );
}
