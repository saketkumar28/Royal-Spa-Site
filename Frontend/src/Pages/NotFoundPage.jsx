// src/pages/NotFoundPage.jsx
import { Link } from "react-router-dom";
import { GOLD, WHITE, MUTED, BLACK } from "../theme.js";

export default function NotFoundPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: BLACK,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: 40,
      }}
    >
      <p
        style={{
          fontSize: 11,
          letterSpacing: 6,
          color: GOLD,
          textTransform: "uppercase",
          marginBottom: 20,
        }}
      >
        404
      </p>
      <h1
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "clamp(48px, 8vw, 96px)",
          fontWeight: 300,
          color: WHITE,
          lineHeight: 1.1,
          marginBottom: 20,
        }}
      >
        Page Not <span className="gold-text">Found</span>
      </h1>
      <p
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 20,
          fontStyle: "italic",
          color: MUTED,
          maxWidth: 440,
          lineHeight: 1.7,
          marginBottom: 48,
        }}
      >
        "Even the most attentive guest occasionally takes a wrong turn. Allow us
        to guide you back."
      </p>
      <Link to="/" className="btn-gold">
        Return to Home
      </Link>
    </div>
  );
}
