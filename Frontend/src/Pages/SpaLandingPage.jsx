// src/Pages/SpaLandingPage.jsx
// Serves the standalone spa landing page at /spa route
import { useEffect } from "react";

export default function SpaLandingPage() {
  useEffect(() => {
    // Redirect to the standalone HTML landing page
    window.location.replace("/spa-landing.html");
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#faf7f2",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Jost', sans-serif",
        color: "#3a3632",
      }}
    >
      <p style={{ opacity: 0.5, fontSize: "0.9rem", letterSpacing: "0.08em" }}>
        Loading…
      </p>
    </div>
  );
}
