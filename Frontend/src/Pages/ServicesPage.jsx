// src/pages/ServicesPage.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../Components/Header.jsx";
import Footer from "../Components/Footer.jsx";
import PageHero from "../Components/PageHero.jsx";
import { serviceAPI } from "../Services/api.js";
import { GOLD, WHITE, MUTED, SURFACE, SURFACE2, BLACK } from "../theme.js";

const STATIC_SERVICES = [
  // Classic Massages
  {
    _id: "c1",
    name: "Head Massage",
    category: "Classic Massage",
    duration: "30",
    price: "₹500",
    description:
      "Professional head massage treatment by our expert therapists.",
    icon: "💆‍♀️",
  },
  {
    _id: "c2",
    name: "Foot Massage",
    category: "Classic Massage",
    duration: "30",
    price: "₹700",
    description: "Relaxing foot massage to relieve stress and tension.",
    icon: "👣",
  },
  {
    _id: "c3",
    name: "Legs and Hands Massage",
    category: "Classic Massage",
    duration: "45",
    price: "₹1,000",
    description: "Targeted professional treatment for legs and hands.",
    icon: "✨",
  },
  {
    _id: "c4",
    name: "Back Massage",
    category: "Classic Massage",
    duration: "45",
    price: "₹1,000",
    description: "Relieve upper and lower back pain with expert therapy.",
    icon: "💆‍♂️",
  },
  {
    _id: "c5",
    name: "Basic Massage",
    category: "Classic Massage",
    duration: "60",
    price: "₹1,500",
    description: "A classic full body massage to melt away daily stress.",
    icon: "❋",
    popular: true,
  },

  // Signature Massages
  {
    _id: "s1",
    name: "Swedish Massage",
    category: "Signature Massage",
    duration: "45-90",
    price: "From ₹1,500",
    description:
      "Exclusively crafted for you. 45 Mins: ₹1,500 | 60 Mins: ₹2,000 | 90 Mins: ₹2,500.",
    icon: "✦",
  },
  {
    _id: "s2",
    name: "Normal Cream Massage",
    category: "Signature Massage",
    duration: "45-90",
    price: "From ₹1,500",
    description:
      "Smooth and relaxing cream massage. 45 Mins: ₹1,500 | 60 Mins: ₹2,000 | 90 Mins: ₹2,500.",
    icon: "◈",
  },
  {
    _id: "s3",
    name: "Aroma Massage",
    category: "Signature Massage",
    duration: "45-90",
    price: "From ₹2,000",
    description:
      "Custom blended essential oils. 45 Mins: ₹2,000 | 60 Mins: ₹2,500 | 90 Mins: ₹3,000.",
    icon: "🌿",
  },
  {
    _id: "s4",
    name: "Thai Massage",
    category: "Signature Massage",
    duration: "45-90",
    price: "From ₹2,000",
    description:
      "Traditional Thai techniques. 45 Mins: ₹2,000 | 60 Mins: ₹2,500 | 90 Mins: ₹3,000.",
    icon: "🌸",
    popular: true,
  },
  {
    _id: "s5",
    name: "Bellyness Massage",
    category: "Signature Massage",
    duration: "45-60",
    price: "From ₹2,000",
    description:
      "Specialized belly therapy. 45 Mins: ₹2,000 | 60 Mins: ₹2,500.",
    icon: "◎",
  },
  {
    _id: "s6",
    name: "Deep Tissue Massage",
    category: "Signature Massage",
    duration: "45-60",
    price: "From ₹2,000",
    description:
      "Targeted pressure on deep muscle tension. 45 Mins: ₹2,000 | 60 Mins: ₹2,500.",
    icon: "◉",
  },

  // Body Polish
  {
    _id: "b1",
    name: "Body Polish",
    category: "Body Polish",
    duration: "45-120",
    price: "From ₹2,500",
    description:
      "Our premium experience for glowing skin. 45 Mins: ₹2,500 | 60 Mins: ₹3,000 | 90 Mins: ₹3,500 | 120 Mins: ₹4,500.",
    icon: "✨",
  },
];

const CATEGORIES = [
  "All",
  "Classic Massage",
  "Signature Massage",
  "Body Polish",
];

export default function ServicesPage() {
  const [services, setServices] = useState(STATIC_SERVICES);
  const [category, setCategory] = useState("All");
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    serviceAPI
      .getAll()
      .then((d) => {
        if (d.services?.length) setServices(d.services);
      })
      .catch(() => {});
  }, []);

  const filtered =
    category === "All"
      ? services
      : services.filter((s) => s.category === category);

  return (
    <>
      <Header />

      <PageHero
        label="What We Offer"
        title="Luxury"
        highlight="Treatments & Rituals"
        subtitle="Every service is a bespoke ritual designed to restore, renew and elevate"
        bg="https://images.unsplash.com/photo-1552693673-1bf958298935?w=1600&q=80"
      />

      {/* Category filter */}
      <section
        style={{
          padding: "40px 60px",
          background: SURFACE,
          position: "sticky",
          top: 76,
          zIndex: 50,
          borderBottom: "1px solid rgba(201,168,76,0.1)",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: 8,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              style={{
                background: category === c ? GOLD : "transparent",
                border: `1px solid ${category === c ? GOLD : "rgba(201,168,76,0.3)"}`,
                color: category === c ? "#0A0A0A" : MUTED,
                padding: "9px 24px",
                fontSize: 11,
                letterSpacing: 2,
                textTransform: "uppercase",
                cursor: "pointer",
                transition: "all 0.3s",
              }}
            >
              {c}
            </button>
          ))}
        </div>
      </section>

      {/* Services grid */}
      <section className="section" style={{ background: BLACK }}>
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: 1,
              background: "rgba(201,168,76,0.08)",
              border: "1px solid rgba(201,168,76,0.08)",
            }}
          >
            {filtered.map((s, i) => (
              <div
                key={s._id || i}
                className="card-hover"
                style={{
                  background: BLACK,
                  padding: "44px 36px",
                  cursor: "pointer",
                  position: "relative",
                }}
                onClick={() => setSelected(selected?._id === s._id ? null : s)}
              >
                {s.popular && (
                  <span
                    style={{
                      position: "absolute",
                      top: 20,
                      right: 20,
                      fontSize: 10,
                      letterSpacing: 2,
                      color: "#0A0A0A",
                      background: GOLD,
                      padding: "4px 10px",
                      textTransform: "uppercase",
                    }}
                  >
                    Popular
                  </span>
                )}
                <div style={{ fontSize: 28, color: GOLD, marginBottom: 20 }}>
                  {s.icon || "✦"}
                </div>
                <h3
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: 23,
                    fontWeight: 400,
                    color: WHITE,
                    marginBottom: 12,
                  }}
                >
                  {s.name}
                </h3>
                <div
                  style={{
                    display: "flex",
                    gap: 16,
                    alignItems: "center",
                    marginBottom: 16,
                  }}
                >
                  <span
                    style={{
                      fontSize: 11,
                      letterSpacing: 2,
                      color: MUTED,
                      textTransform: "uppercase",
                    }}
                  >
                    {s.duration} MIN
                  </span>
                  <span
                    style={{
                      width: 4,
                      height: 4,
                      background: GOLD,
                      transform: "rotate(45deg)",
                      opacity: 0.5,
                    }}
                  />
                  <span style={{ fontSize: 17, color: GOLD, fontWeight: 400 }}>
                    {s.price}
                  </span>
                </div>
                <p style={{ fontSize: 14, color: MUTED, lineHeight: 1.8 }}>
                  {s.description}
                </p>

                {/* Expanded CTA */}
                <div
                  style={{
                    maxHeight: selected?._id === s._id ? 80 : 0,
                    overflow: "hidden",
                    transition: "max-height 0.4s ease",
                    marginTop: selected?._id === s._id ? 24 : 0,
                  }}
                >
                  <div style={{ display: "flex", gap: 12, paddingTop: 4 }}>
                    <Link
                      to="/booking"
                      className="btn-solid"
                      style={{
                        padding: "10px 24px",
                        fontSize: 11,
                        textDecoration: "none",
                      }}
                    >
                      Book Now
                    </Link>
                    <Link
                      to="/contact"
                      className="btn-gold"
                      style={{
                        padding: "10px 24px",
                        fontSize: 11,
                        textDecoration: "none",
                      }}
                    >
                      Enquire
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages highlight */}
      <section className="section" style={{ background: SURFACE }}>
        <div
          className="container"
          style={{ textAlign: "center", maxWidth: 720 }}
        >
          <p
            style={{
              fontSize: 11,
              letterSpacing: 5,
              color: GOLD,
              textTransform: "uppercase",
              marginBottom: 16,
            }}
          >
            Special Offers
          </p>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(28px, 4vw, 48px)",
              fontWeight: 300,
              color: WHITE,
              marginBottom: 24,
            }}
          >
            Unlock the ultimate relaxation journey
          </h2>
          <p
            style={{
              color: MUTED,
              fontSize: 15,
              lineHeight: 1.8,
              marginBottom: 40,
            }}
          >
            Take advantage of our exclusive Women's 60-Minute Massage offer for
            ₹2,999, or indulge in our 90-Minute Custom Selection Package for
            ₹3,999.
          </p>
          <Link to="/contact" className="btn-gold">
            Claim Offer
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
