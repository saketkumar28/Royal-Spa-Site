// src/Components/BookingPopup.jsx
// Auto-shows once per session after 8 s — clicking CTA routes to /booking (single form)
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const GOLD = "#C9A84C";
const BLACK = "#0A0A0A";
const WHITE = "#F5F0E8";
const MUTED = "#9A9080";

export default function BookingPopup() {
  const [isOpen, setIsOpen] = useState(false);

  // Show once per session after 8 seconds
  useEffect(() => {
    const shown = sessionStorage.getItem("bookingPopupShown");
    if (shown) return;
    const timer = setTimeout(() => {
      setIsOpen(true);
      sessionStorage.setItem("bookingPopupShown", "1");
    }, 8000);
    return () => clearTimeout(timer);
  }, []);

  if (!isOpen) return null;

  return (
    <div style={styles.overlay} onClick={() => setIsOpen(false)}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button
          style={styles.closeBtn}
          onClick={() => setIsOpen(false)}
          aria-label="Close"
        >
          ✕
        </button>

        {/* Decorative top line */}
        <div style={styles.topLine} />

        <p style={styles.eyebrow}>Exclusive Offer</p>

        <h2 style={styles.heading}>
          Reserve Your
          <br />
          <span style={{ color: GOLD }}>Royal Experience</span>
        </h2>

        <p style={styles.sub}>
          Indulge in luxury treatments crafted entirely around you — your skin,
          your mood, your moment of peace.
        </p>

        {/* Trust badges */}
        <div style={styles.badges}>
          {["Certified Therapists", "Premium Products", "5-Star Rated"].map(
            (b) => (
              <span key={b} style={styles.badge}>
                ✦ {b}
              </span>
            ),
          )}
        </div>

        <Link
          to="/booking"
          onClick={() => setIsOpen(false)}
          style={styles.cta}
          onMouseOver={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.color = GOLD;
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = GOLD;
            e.currentTarget.style.color = BLACK;
          }}
        >
          Book Now — It&apos;s Free
        </Link>

        <button onClick={() => setIsOpen(false)} style={styles.dismissBtn}>
          Maybe later
        </button>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.75)",
    zIndex: 9999,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backdropFilter: "blur(4px)",
  },
  modal: {
    backgroundColor: "#0D0D0D",
    padding: "40px 36px 32px",
    borderRadius: "2px",
    border: "1px solid rgba(201,168,76,0.35)",
    width: "90%",
    maxWidth: "420px",
    position: "relative",
    textAlign: "center",
    color: WHITE,
    boxShadow: "0 24px 80px rgba(0,0,0,0.7)",
  },
  topLine: {
    position: "absolute",
    top: 0,
    left: "20%",
    right: "20%",
    height: "2px",
    background: "linear-gradient(90deg, transparent, #C9A84C, transparent)",
  },
  closeBtn: {
    position: "absolute",
    top: "14px",
    right: "16px",
    background: "none",
    border: "none",
    color: MUTED,
    fontSize: "18px",
    cursor: "pointer",
    lineHeight: 1,
    padding: "4px",
    transition: "color 0.2s",
  },
  eyebrow: {
    fontSize: "10px",
    letterSpacing: "4px",
    textTransform: "uppercase",
    color: GOLD,
    marginBottom: "16px",
    marginTop: "8px",
  },
  heading: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "clamp(26px, 5vw, 36px)",
    fontWeight: 300,
    color: WHITE,
    lineHeight: 1.25,
    marginBottom: "16px",
  },
  sub: {
    color: MUTED,
    fontSize: "14px",
    lineHeight: 1.7,
    marginBottom: "24px",
    maxWidth: "320px",
    margin: "0 auto 24px",
  },
  badges: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "8px",
    marginBottom: "28px",
  },
  badge: {
    fontSize: "10px",
    letterSpacing: "1.5px",
    color: "rgba(201,168,76,0.7)",
    border: "1px solid rgba(201,168,76,0.2)",
    padding: "5px 10px",
    borderRadius: "2px",
  },
  cta: {
    display: "block",
    background: GOLD,
    color: BLACK,
    padding: "14px 32px",
    fontSize: "11px",
    letterSpacing: "3px",
    textTransform: "uppercase",
    textDecoration: "none",
    fontFamily: "'Jost', sans-serif",
    fontWeight: 600,
    border: "1px solid #C9A84C",
    transition: "all 0.3s",
    marginBottom: "14px",
    cursor: "pointer",
  },
  dismissBtn: {
    background: "none",
    border: "none",
    color: MUTED,
    fontSize: "12px",
    cursor: "pointer",
    padding: "4px 8px",
    textDecoration: "underline",
    textUnderlineOffset: "3px",
  },
};
