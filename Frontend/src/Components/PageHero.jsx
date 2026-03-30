// src/components/PageHero.jsx
import { GOLD, WHITE, MUTED, BLACK } from "../theme";

export default function PageHero({ label, title, highlight, subtitle, bg }) {
  return (
    <section
      style={{
        minHeight: "52vh",
        background: bg
          ? `linear-gradient(to bottom, rgba(10,10,10,0.75) 0%, rgba(10,10,10,0.92) 100%), url('${bg}') center/cover no-repeat`
          : `radial-gradient(ellipse at 30% 50%, rgba(139,105,20,0.14) 0%, transparent 60%), ${BLACK}`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "140px 40px 80px",
        position: "relative",
      }}
    >
      {label && (
        <p
          style={{
            fontSize: 11,
            letterSpacing: 5,
            color: GOLD,
            textTransform: "uppercase",
            fontWeight: 400,
            marginBottom: 20,
          }}
        >
          {label}
        </p>
      )}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          marginBottom: 28,
        }}
      >
        <div style={{ width: 50, height: 1, background: GOLD, opacity: 0.5 }} />
        <div
          style={{
            width: 7,
            height: 7,
            background: GOLD,
            transform: "rotate(45deg)",
          }}
        />
        <div style={{ width: 50, height: 1, background: GOLD, opacity: 0.5 }} />
      </div>

      <h1
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "clamp(44px, 7vw, 80px)",
          fontWeight: 300,
          lineHeight: 1.1,
          color: WHITE,
        }}
      >
        {title}
        {highlight && (
          <>
            <br />
            <span className="gold-text">{highlight}</span>
          </>
        )}
      </h1>

      {subtitle && (
        <p
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: "italic",
            fontSize: "clamp(16px, 2vw, 21px)",
            color: `rgba(245,240,232,0.55)`,
            marginTop: 24,
            maxWidth: 560,
            lineHeight: 1.7,
          }}
        >
          {subtitle}
        </p>
      )}
    </section>
  );
}
