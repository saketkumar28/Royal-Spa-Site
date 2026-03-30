// src/pages/AboutPage.jsx
import { Link } from "react-router-dom";
import Header from "../Components/Header.jsx";
import Footer from "../Components/Footer.jsx";
import PageHero from "../Components/PageHero.jsx";
import {
  GOLD,
  GOLD_LIGHT,
  WHITE,
  MUTED,
  SURFACE,
  SURFACE2,
  BLACK,
} from "../theme";

const team = [
  {
    name: "Ritu Agarwal",
    role: "Founder & Lead Aesthetician",
    exp: "18 yrs",
    bio: "Trained in Paris and Bali, Ritu founded The Royal with a singular vision — to merge Ayurvedic wisdom with modern luxury skincare.",
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80",
  },
  {
    name: "Meenakshi Iyer",
    role: "Master Therapist",
    exp: "12 yrs",
    bio: "A certified hot stone and deep tissue specialist, Meenakshi's treatments are renowned for their transformative healing power.",
    img: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&q=80",
  },
  {
    name: "Kavitha Nair",
    role: "Hair & Bridal Director",
    exp: "14 yrs",
    bio: "Kavitha has styled over 600 brides across India. Her signature look blends timeless elegance with contemporary glamour.",
    img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80",
  },
  {
    name: "Sunita Prasad",
    role: "Wellness Consultant",
    exp: "10 yrs",
    bio: "A certified Ayurveda practitioner, Sunita curates personalised wellness journeys for each guest's unique needs.",
    img: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=400&q=80",
  },
];

const values = [
  {
    icon: "✦",
    title: "Bespoke Rituals",
    desc: "Every treatment is tailored to the individual — your skin type, your mood, your intention for the day.",
  },
  {
    icon: "◈",
    title: "Rare Ingredients",
    desc: "We source only the finest: 24k gold serums, Himalayan minerals, Moroccan argan, and rare botanical extracts.",
  },
  {
    icon: "❋",
    title: "Expert Hands",
    desc: "Our therapists average 12+ years of experience, trained across India, Bali, Paris, and Thailand.",
  },
  {
    icon: "◉",
    title: "Serene Environment",
    desc: "Every detail of our space — lighting, scent, sound — is curated to facilitate deep rest and transformation.",
  },
];

const milestones = [
  {
    year: "2014",
    event: "Founded in South Kolkata with 3 therapists and a dream",
  },
  {
    year: "2016",
    event: "Launched signature Gold Facial — became our bestseller",
  },
  {
    year: "2018",
    event: "Expanded to full-floor luxury salon with 12 treatment rooms",
  },
  {
    year: "2020",
    event: "Awarded 'Best Luxury Spa in Eastern India' by Wellness India",
  },
  {
    year: "2022",
    event: "Launched Royal Bridal Studio — 300+ brides served in year one",
  },
  { year: "2024", event: "Introduced online booking + membership programme" },
  {
    year: "2026",
    event: "Serving 8,000+ clients — still the same passion, elevated",
  },
];

export default function AboutPage() {
  return (
    <>
      <Header />

      <PageHero
        label="Our Story"
        title="Crafted with"
        highlight="Passion & Purpose"
        subtitle="Twelve years of redefining luxury wellness in the heart of Kolkata"
        bg="https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=1600&q=80"
      />

      {/* Mission */}
      <section className="section" style={{ background: SURFACE }}>
        <div
          className="container"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 80,
            alignItems: "center",
          }}
        >
          <div>
            <p
              style={{
                fontSize: 11,
                letterSpacing: 5,
                color: GOLD,
                textTransform: "uppercase",
                marginBottom: 20,
              }}
            >
              Our Philosophy
            </p>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(32px, 4vw, 52px)",
                fontWeight: 300,
                color: WHITE,
                lineHeight: 1.2,
                marginBottom: 28,
              }}
            >
              Beauty is not a<br />
              <span className="gold-text">destination — it's a ritual</span>
            </h2>
            <p
              style={{
                color: MUTED,
                lineHeight: 1.9,
                fontSize: 15,
                marginBottom: 20,
              }}
            >
              The Royal Salon & Spa was born from a deeply personal belief: that
              taking care of oneself is not vanity — it is an act of
              self-respect. Our founder, Ritu Agarwal, spent years studying
              ancient healing traditions across Ayurveda, Thai massage, and
              European skincare before returning to Kolkata with a vision.
            </p>
            <p
              style={{
                color: MUTED,
                lineHeight: 1.9,
                fontSize: 15,
                marginBottom: 36,
              }}
            >
              That vision was simple: create a space so beautiful, so peaceful,
              so expertly staffed that every person who walked through our doors
              left feeling genuinely, deeply cared for — body and soul.
            </p>
            <Link to="/services" className="btn-gold">
              Explore Our Services
            </Link>
          </div>
          <div style={{ position: "relative" }}>
            <div
              style={{
                height: 480,
                background: `url('https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80') center/cover`,
                border: "1px solid rgba(201,168,76,0.2)",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: -24,
                left: -24,
                background: SURFACE2,
                border: "1px solid rgba(201,168,76,0.3)",
                padding: "20px 28px",
              }}
            >
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 44,
                  color: GOLD,
                  fontWeight: 300,
                }}
              >
                8K+
              </p>
              <p
                style={{
                  fontSize: 11,
                  color: MUTED,
                  letterSpacing: 2,
                  textTransform: "uppercase",
                }}
              >
                Clients Served
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section" style={{ background: BLACK }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <p
              style={{
                fontSize: 11,
                letterSpacing: 5,
                color: GOLD,
                textTransform: "uppercase",
                marginBottom: 16,
              }}
            >
              What We Stand For
            </p>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(32px, 4vw, 52px)",
                fontWeight: 300,
                color: WHITE,
              }}
            >
              The Royal <span className="gold-text">Promise</span>
            </h2>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: 2,
              background: "rgba(201,168,76,0.08)",
              border: "1px solid rgba(201,168,76,0.08)",
            }}
          >
            {values.map((v, i) => (
              <div key={i} style={{ padding: "48px 36px", background: BLACK }}>
                <div style={{ fontSize: 28, color: GOLD, marginBottom: 20 }}>
                  {v.icon}
                </div>
                <h3
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: 22,
                    fontWeight: 400,
                    color: WHITE,
                    marginBottom: 14,
                  }}
                >
                  {v.title}
                </h3>
                <p style={{ color: MUTED, fontSize: 14, lineHeight: 1.8 }}>
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section" style={{ background: SURFACE }}>
        <div className="container" style={{ maxWidth: 800 }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <p
              style={{
                fontSize: 11,
                letterSpacing: 5,
                color: GOLD,
                textTransform: "uppercase",
                marginBottom: 16,
              }}
            >
              Our Journey
            </p>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(32px, 4vw, 52px)",
                fontWeight: 300,
                color: WHITE,
              }}
            >
              Twelve Years of <span className="gold-text">Excellence</span>
            </h2>
          </div>
          <div style={{ position: "relative" }}>
            {/* Vertical line */}
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: 0,
                bottom: 0,
                width: 1,
                background: "rgba(201,168,76,0.2)",
                transform: "translateX(-50%)",
              }}
            />
            {milestones.map((m, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent: i % 2 === 0 ? "flex-end" : "flex-start",
                  marginBottom: 40,
                  position: "relative",
                }}
              >
                {/* Dot */}
                <div
                  style={{
                    position: "absolute",
                    left: "50%",
                    top: 16,
                    width: 10,
                    height: 10,
                    background: GOLD,
                    transform: "translate(-50%, -50%) rotate(45deg)",
                    zIndex: 1,
                  }}
                />
                <div
                  style={{
                    width: "42%",
                    padding: "20px 24px",
                    background: SURFACE2,
                    border: "1px solid rgba(201,168,76,0.12)",
                    marginLeft: i % 2 === 0 ? 0 : "8%",
                    marginRight: i % 2 === 0 ? "8%" : 0,
                  }}
                >
                  <p
                    style={{
                      fontSize: 11,
                      letterSpacing: 3,
                      color: GOLD,
                      textTransform: "uppercase",
                      marginBottom: 8,
                    }}
                  >
                    {m.year}
                  </p>
                  <p style={{ fontSize: 14, color: WHITE, lineHeight: 1.6 }}>
                    {m.event}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section" style={{ background: BLACK }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <p
              style={{
                fontSize: 11,
                letterSpacing: 5,
                color: GOLD,
                textTransform: "uppercase",
                marginBottom: 16,
              }}
            >
              The Experts
            </p>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(32px, 4vw, 52px)",
                fontWeight: 300,
                color: WHITE,
              }}
            >
              Meet Our <span className="gold-text">Team</span>
            </h2>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 28,
            }}
          >
            {team.map((t, i) => (
              <div
                key={i}
                className="card-hover"
                style={{
                  background: SURFACE,
                  border: "1px solid rgba(201,168,76,0.1)",
                  overflow: "hidden",
                }}
              >
                <div style={{ height: 300, overflow: "hidden" }}>
                  <img
                    src={t.img}
                    alt={t.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transition: "transform 0.5s",
                    }}
                    onMouseOver={(e) =>
                      (e.target.style.transform = "scale(1.05)")
                    }
                    onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
                  />
                </div>
                <div style={{ padding: "28px 24px" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      marginBottom: 8,
                    }}
                  >
                    <div>
                      <h3
                        style={{ fontSize: 18, color: WHITE, fontWeight: 400 }}
                      >
                        {t.name}
                      </h3>
                      <p
                        style={{
                          fontSize: 11,
                          color: GOLD,
                          letterSpacing: 1.5,
                          textTransform: "uppercase",
                          marginTop: 4,
                        }}
                      >
                        {t.role}
                      </p>
                    </div>
                    <span
                      style={{
                        fontSize: 11,
                        color: MUTED,
                        background: "rgba(201,168,76,0.1)",
                        padding: "4px 10px",
                        borderRadius: 2,
                      }}
                    >
                      {t.exp}
                    </span>
                  </div>
                  <p
                    style={{
                      fontSize: 13,
                      color: MUTED,
                      lineHeight: 1.8,
                      marginTop: 12,
                    }}
                  >
                    {t.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        style={{
          padding: "100px 40px",
          background: SURFACE,
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontSize: 11,
            letterSpacing: 5,
            color: GOLD,
            textTransform: "uppercase",
            marginBottom: 24,
          }}
        >
          Ready to Experience Us?
        </p>
        <h2
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(32px, 4vw, 52px)",
            fontWeight: 300,
            color: WHITE,
            marginBottom: 40,
          }}
        >
          Your Royal Journey <span className="gold-text">Awaits</span>
        </h2>
        <div
          style={{
            display: "flex",
            gap: 20,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <Link to="/booking" className="btn-solid">
            Book Your Visit
          </Link>
          <Link to="/services" className="btn-gold">
            View Services
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
