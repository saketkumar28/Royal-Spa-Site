// src/components/Header.jsx
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const GOLD = "#C9A84C";
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
        .royal-desktop { display: flex !important; }
        .royal-mobile  { display: none  !important; }
        @media (max-width: 900px) {
          .royal-desktop { display: none !important; }
          .royal-mobile  { display: flex !important; }
          .royal-header  { padding: 14px 20px !important; }
        }
      `}</style>

      <header
        className="royal-header"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          padding: "18px 48px",
          background:
            scrolled || menuOpen ? "rgba(10,10,10,0.98)" : "transparent",
          backdropFilter: scrolled ? "blur(14px)" : "none",
          borderBottom:
            scrolled && !menuOpen ? "1px solid rgba(201,168,76,0.12)" : "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          transition: "all 0.4s ease",
        }}
      >
        {/* Logo */}
        <Link to="/" style={{ textDecoration: "none" }}>
          <p
            style={{
              fontSize: 9,
              letterSpacing: 6,
              color: GOLD,
              fontWeight: 400,
              textTransform: "uppercase",
              marginBottom: 2,
              fontFamily: "'Jost', sans-serif",
            }}
          >
            The Royal
          </p>
          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 20,
              fontWeight: 300,
              color: WHITE,
              letterSpacing: 3,
              margin: 0,
            }}
          >
            Salon & Spa
          </p>
        </Link>

        {/* Desktop Nav */}
        <nav
          className="royal-desktop"
          style={{ gap: 32, alignItems: "center" }}
        >
          {NAV.map((n) => (
            <Link
              key={n.path}
              to={n.path}
              style={{
                color: pathname === n.path ? GOLD : MUTED,
                fontSize: 11,
                letterSpacing: 2,
                textTransform: "uppercase",
                fontWeight: 400,
                textDecoration: "none",
                transition: "color 0.3s",
                fontFamily: "'Jost', sans-serif",
              }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <Link
          to="/booking"
          className="royal-desktop"
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
          }}
        >
          Book Now
        </Link>

        {/* Burger button */}
        <button
          onClick={() => setMenuOpen((o) => !o)}
          className="royal-mobile"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "6px",
            flexDirection: "column",
            gap: 5,
            alignItems: "center",
            justifyContent: "center",
          }}
          aria-label="Toggle menu"
        >
          <span
            style={{
              display: "block",
              width: 26,
              height: 1.5,
              background: GOLD,
              borderRadius: 2,
              transition: "transform 0.35s ease, opacity 0.3s",
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
              transition: "opacity 0.3s, transform 0.3s",
              opacity: menuOpen ? 0 : 1,
              transform: menuOpen ? "translateX(8px)" : "none",
            }}
          />
          <span
            style={{
              display: "block",
              width: 26,
              height: 1.5,
              background: GOLD,
              borderRadius: 2,
              transition: "transform 0.35s ease, opacity 0.3s",
              transform: menuOpen
                ? "rotate(-45deg) translate(4.5px, -4.5px)"
                : "none",
            }}
          />
        </button>
      </header>

      {/* Mobile overlay menu */}
      <div
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
          padding: "100px 40px 60px",
          gap: 4,
        }}
      >
        {/* Logo in overlay */}
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <p
            style={{
              fontSize: 10,
              letterSpacing: 6,
              color: GOLD,
              fontWeight: 400,
              textTransform: "uppercase",
              marginBottom: 6,
              fontFamily: "'Jost', sans-serif",
            }}
          >
            The Royal
          </p>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 4,
            }}
          >
            <div
              style={{ flex: 1, height: 1, background: GOLD, opacity: 0.4 }}
            />
            <div
              style={{
                width: 7,
                height: 7,
                background: GOLD,
                transform: "rotate(45deg)",
              }}
            />
            <div
              style={{ flex: 1, height: 1, background: GOLD, opacity: 0.4 }}
            />
          </div>
          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 13,
              fontWeight: 300,
              color: MUTED,
              letterSpacing: 4,
              textTransform: "uppercase",
            }}
          >
            Salon & Spa
          </p>
        </div>

        {NAV.map((n, i) => (
          <Link
            key={n.path}
            to={n.path}
            style={{
              color: pathname === n.path ? GOLD : WHITE,
              fontSize: 28,
              letterSpacing: 4,
              textTransform: "uppercase",
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 300,
              textDecoration: "none",
              padding: "12px 0",
              display: "block",
              textAlign: "center",
              opacity: menuOpen ? 1 : 0,
              transform: menuOpen ? "translateY(0)" : "translateY(16px)",
              transition: `opacity 0.4s ease ${i * 0.07}s, transform 0.4s ease ${i * 0.07}s`,
              borderBottom: "1px solid rgba(201,168,76,0.08)",
              width: "100%",
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
            padding: "15px 52px",
            fontSize: 11,
            letterSpacing: 4,
            textTransform: "uppercase",
            textDecoration: "none",
            fontFamily: "'Jost', sans-serif",
            fontWeight: 500,
            display: "block",
            textAlign: "center",
            opacity: menuOpen ? 1 : 0,
            transition: `opacity 0.4s ease ${NAV.length * 0.07 + 0.1}s`,
          }}
        >
          Book Now
        </Link>
      </div>
    </>
  );
}
