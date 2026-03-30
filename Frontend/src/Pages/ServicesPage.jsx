// src/pages/ServicesPage.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../Components/Header.jsx";
import Footer from "../Components/Footer.jsx";
import PageHero from "../Components/PageHero.jsx";
import { serviceAPI } from "../Services/api.js";
import { GOLD, WHITE, MUTED, SURFACE, SURFACE2, BLACK } from "../theme.js";

const STATIC_SERVICES = [
  {
    _id: "s1",
    name: "Royal Signature Facial",
    category: "Facial",
    duration: 90,
    price: 4500,
    description:
      "A bespoke facial using 24k gold serum and diamond dust to restore radiance and youthfulness. Includes deep cleanse, exfoliation, masque and LED therapy.",
    icon: "✦",
    popular: true,
  },
  {
    _id: "s2",
    name: "Hot Stone Therapy",
    category: "Massage",
    duration: 75,
    price: 3800,
    description:
      "Volcanic basalt stones heated to therapeutic temperature melt away tension and restore your body's natural energy flow. Deeply grounding and restorative.",
    icon: "◈",
  },
  {
    _id: "s3",
    name: "Aromatherapy Massage",
    category: "Massage",
    duration: 60,
    price: 3200,
    description:
      "Custom blended essential oils with Swedish technique to rejuvenate mind, body and soul. Choose your mood: relax, energise, or balance.",
    icon: "❋",
  },
  {
    _id: "s4",
    name: "Bridal Package",
    category: "Bridal",
    duration: 240,
    price: 18000,
    description:
      "A complete head-to-toe bridal transformation including hair styling, airbrush makeup, facial, body scrub and relaxation ritual. Pre-bridal consultations included.",
    icon: "◇",
    popular: true,
  },
  {
    _id: "s5",
    name: "Hair Spa Ritual",
    category: "Hair",
    duration: 45,
    price: 2500,
    description:
      "Premium Moroccan argan oil treatment that restores shine, strength and silkiness. Includes scalp massage, steam treatment and conditioning masque.",
    icon: "✿",
  },
  {
    _id: "s6",
    name: "Gold Leaf Body Wrap",
    category: "Body",
    duration: 120,
    price: 7500,
    description:
      "Indulge in a full-body detox wrap infused with 24k gold and rare botanical extracts. Skin is left luminous, firm and deeply nourished.",
    icon: "✧",
  },
  {
    _id: "s7",
    name: "Deep Tissue Massage",
    category: "Massage",
    duration: 90,
    price: 4200,
    description:
      "Targeted pressure on chronic muscle tension and knots. Ideal for athletes, desk workers, and anyone carrying deep-seated stress.",
    icon: "◉",
  },
  {
    _id: "s8",
    name: "Hydra Glow Facial",
    category: "Facial",
    duration: 60,
    price: 3500,
    description:
      "Intense hydration facial with hyaluronic acid infusion, peptide serum and oxygen therapy. Perfect for dehydrated, dull or mature skin.",
    icon: "❊",
  },
  {
    _id: "s9",
    name: "Keratin Hair Treatment",
    category: "Hair",
    duration: 120,
    price: 6500,
    description:
      "Professional-grade keratin smoothing treatment that eliminates frizz, adds mirror shine and reduces styling time by up to 70% for 3–4 months.",
    icon: "✦",
  },
];

const CATEGORIES = ["All", "Facial", "Massage", "Hair", "Body", "Bridal"];

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
                    {s.duration} min
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
                    ₹{s.price?.toLocaleString()}
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
            Custom Packages
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
            Can't find exactly what you're looking for?
          </h2>
          <p
            style={{
              color: MUTED,
              fontSize: 15,
              lineHeight: 1.8,
              marginBottom: 40,
            }}
          >
            We offer fully bespoke treatment packages — tell us your goals and
            our wellness consultants will design a ritual just for you.
            Corporate bookings, anniversary packages, and group events all
            welcome.
          </p>
          <Link to="/contact" className="btn-gold">
            Request Custom Package
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
