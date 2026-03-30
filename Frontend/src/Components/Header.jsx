// src/components/Header.jsx
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { GOLD, MUTED, WHITE } from "../theme";

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
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: "20px 60px",
        background: scrolled ? "rgba(10,10,10,0.96)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(201,168,76,0.12)" : "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        transition: "all 0.5s ease",
      }}
    >
      {/* Logo */}
      <Link to="/" style={{ textDecoration: "none" }}>
        <p
          style={{
            fontSize: 10,
            letterSpacing: 6,
            color: GOLD,
            fontWeight: 400,
            textTransform: "uppercase",
            marginBottom: 2,
          }}
        >
          The Royal
        </p>
        <p
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 22,
            fontWeight: 300,
            color: WHITE,
            letterSpacing: 3,
          }}
        >
          Salon & Spa
        </p>
      </Link>

      {/* Desktop nav */}
      <nav style={{ display: "flex", gap: 36 }} className="hide-mobile">
        {NAV.map((n) => (
          <Link
            key={n.path}
            to={n.path}
            className={`nav-link${pathname === n.path ? " active" : ""}`}
          >
            {n.label}
          </Link>
        ))}
      </nav>

      <Link
        to="/booking"
        className="btn-gold hide-mobile"
        style={{ padding: "10px 28px", fontSize: 11 }}
      >
        Book Now
      </Link>

      {/* Mobile burger */}
      <button
        onClick={() => setMenuOpen((o) => !o)}
        style={{
          background: "none",
          border: "none",
          display: "flex",
          flexDirection: "column",
          gap: 5,
          padding: 4,
        }}
        className="show-mobile"
      >
        {[0, 1, 2].map((i) => (
          <div key={i} style={{ width: 24, height: 1, background: GOLD }} />
        ))}
      </button>

      {/* Mobile overlay */}
      {menuOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(10,10,10,0.98)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 36,
            zIndex: 200,
            animation: "fadeIn 0.3s ease",
          }}
        >
          <button
            onClick={() => setMenuOpen(false)}
            style={{
              position: "absolute",
              top: 28,
              right: 28,
              background: "none",
              border: "none",
              color: GOLD,
              fontSize: 22,
            }}
          >
            ✕
          </button>
          {NAV.map((n) => (
            <Link
              key={n.path}
              to={n.path}
              className="nav-link"
              style={{ fontSize: 18, letterSpacing: 4 }}
            >
              {n.label}
            </Link>
          ))}
          <Link to="/booking" className="btn-gold">
            Book Now
          </Link>
        </div>
      )}
    </header>
  );
}
