// src/components/Footer.jsx
import { Link } from "react-router-dom";
import { GOLD, MUTED, WHITE, BLACK, SURFACE2, SURFACE } from "../theme";

export default function Footer() {
  const cols = [
    {
      title: "Explore",
      links: [
        { l: "Home", p: "/" },
        { l: "About", p: "/about" },
        { l: "Services", p: "/services" },
        { l: "Gallery", p: "/gallery" },
        { l: "Journal", p: "/journal" },
        { l: "Membership", p: "/memberships" },
      ],
    },
    {
      title: "Services",
      links: [
        { l: "Classic Massages", p: "/services" },
        { l: "Signature Massages", p: "/services" },
        { l: "Body Polish", p: "/services" },
        { l: "Memberships", p: "/services" },
        { l: "Exclusive Offers", p: "/services" },
      ],
    },
    {
      title: "Visit",
      links: [
        { l: "Kothaguda, Hyderabad - 500081" },
        { l: "Call or WhatsApp for Appointments" },
        { l: "Mon–Sun: 10:00 AM – 9:00 PM" },
        { l: "EST. 2008" },
      ],
    },
  ];

  return (
    <footer
      style={{
        background: BLACK,
        borderTop: "1px solid rgba(201,168,76,0.12)",
      }}
    >
      <div
        style={{ padding: "80px 60px 40px", maxWidth: 1200, margin: "0 auto" }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr 1fr",
            gap: 60,
            marginBottom: 60,
            flexWrap: "wrap",
          }}
        >
          {/* Brand */}
          <div>
            <p
              style={{
                fontSize: 10,
                letterSpacing: 6,
                color: GOLD,
                textTransform: "uppercase",
                marginBottom: 4,
              }}
            >
              The Royal
            </p>
            <p
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 26,
                fontWeight: 300,
                color: WHITE,
                letterSpacing: 3,
                marginBottom: 20,
              }}
            >
              Saloon & Spa
            </p>
            <p
              style={{
                fontSize: 14,
                color: MUTED,
                lineHeight: 1.9,
                maxWidth: 280,
              }}
            >
              Where Luxury Meets Serenity — exclusively crafted for you.
            </p>
            <div style={{ display: "flex", gap: 20, marginTop: 28 }}>
              {["Instagram", "Facebook", "Pinterest"].map((s) => (
                <a
                  key={s}
                  href="#"
                  style={{
                    fontSize: 11,
                    letterSpacing: 1.5,
                    color: MUTED,
                    textTransform: "uppercase",
                    transition: "color 0.3s",
                  }}
                  onMouseOver={(e) => (e.target.style.color = GOLD)}
                  onMouseOut={(e) => (e.target.style.color = MUTED)}
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          {cols.map((col) => (
            <div key={col.title}>
              <p
                style={{
                  fontSize: 11,
                  letterSpacing: 3,
                  color: GOLD,
                  textTransform: "uppercase",
                  marginBottom: 24,
                  fontWeight: 400,
                }}
              >
                {col.title}
              </p>
              {col.links.map((lk, i) =>
                lk.p ? (
                  <Link
                    key={i}
                    to={lk.p}
                    style={{
                      display: "block",
                      fontSize: 13,
                      color: MUTED,
                      marginBottom: 12,
                      transition: "color 0.3s",
                    }}
                    onMouseOver={(e) => (e.target.style.color = WHITE)}
                    onMouseOut={(e) => (e.target.style.color = MUTED)}
                  >
                    {lk.l}
                  </Link>
                ) : (
                  <p
                    key={i}
                    style={{ fontSize: 13, color: MUTED, marginBottom: 12 }}
                  >
                    {lk.l}
                  </p>
                ),
              )}
            </div>
          ))}
        </div>

        <div
          style={{
            borderTop: "1px solid rgba(201,168,76,0.1)",
            paddingTop: 32,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 16,
          }}
        >
          <p style={{ fontSize: 12, color: MUTED }}>
            © 2026 The Royal Saloon & Spa. All rights reserved. Crafted by Saket
            Kumar.
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div
              style={{ width: 30, height: 1, background: GOLD, opacity: 0.4 }}
            />
            <div
              style={{
                width: 6,
                height: 6,
                background: GOLD,
                transform: "rotate(45deg)",
              }}
            />
            <div
              style={{ width: 30, height: 1, background: GOLD, opacity: 0.4 }}
            />
          </div>
          <div style={{ display: "flex", gap: 20 }}>
            <a href="#" style={{ fontSize: 12, color: MUTED }}>
              Privacy Policy
            </a>
            <a href="#" style={{ fontSize: 12, color: MUTED }}>
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
