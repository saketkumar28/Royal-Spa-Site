// src/components/Footer.jsx
import { Link } from "react-router-dom";
import { GOLD, MUTED, WHITE, BLACK, SURFACE2, SURFACE } from "../theme";

export default function Footer() {
  const socials = [
    {
      name: "Instagram",
      url: "https://www.instagram.com/theroyalsalonandspa_hyd?igsh=MTQzOXh6dm94aDVoOA%3D%3D&utm_source=qr",
    },
    { name: "Facebook", url: "https://www.facebook.com/theroyalsaloonandspa" },
  ];

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
        {
          l: "Kothaguda, Hyderabad - 500081",
          href: "https://maps.app.goo.gl/aQEbvsQiPsqgD5cW6?g_st=ic",
        },
        {
          l: "Call Us: +91 9392211285",
          href: "tel:+919392211285",
        },
        {
          l: "WhatsApp Us",
          href: "https://wa.me/919392211285",
        },
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
              Salon & Spa
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
              {socials.map((s) => (
                <a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontSize: 11,
                    letterSpacing: 1.5,
                    color: MUTED,
                    textTransform: "uppercase",
                    transition: "color 0.3s",
                    textDecoration: "none",
                  }}
                  onMouseOver={(e) => (e.target.style.color = GOLD)}
                  onMouseOut={(e) => (e.target.style.color = MUTED)}
                >
                  {s.name}
                </a>
              ))}
            </div>
          </div>

          {/* Columns */}
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
              {col.links.map((lk, i) => {
                const linkStyle = {
                  display: "block",
                  fontSize: 13,
                  color: MUTED,
                  marginBottom: 12,
                  transition: "color 0.3s",
                  textDecoration: "none",
                };

                // Internal React Router Link
                if (lk.p) {
                  return (
                    <Link
                      key={i}
                      to={lk.p}
                      style={linkStyle}
                      onMouseOver={(e) => (e.target.style.color = WHITE)}
                      onMouseOut={(e) => (e.target.style.color = MUTED)}
                    >
                      {lk.l}
                    </Link>
                  );
                }

                // External Link (Maps, Phone, WhatsApp)
                if (lk.href) {
                  return (
                    <a
                      key={i}
                      href={lk.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={linkStyle}
                      onMouseOver={(e) => (e.target.style.color = WHITE)}
                      onMouseOut={(e) => (e.target.style.color = MUTED)}
                    >
                      {lk.l}
                    </a>
                  );
                }

                // Plain Text (Timings, EST)
                return (
                  <p
                    key={i}
                    style={{ fontSize: 13, color: MUTED, marginBottom: 12 }}
                  >
                    {lk.l}
                  </p>
                );
              })}
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
            © 2026 The Royal Salon & Spa. All rights reserved. Crafted by Saket
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
            <Link
              to="/privacy"
              style={{ fontSize: 12, color: MUTED, textDecoration: "none" }}
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              style={{ fontSize: 12, color: MUTED, textDecoration: "none" }}
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
