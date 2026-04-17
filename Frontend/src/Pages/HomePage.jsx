// src/pages/HomePage.jsx
import Header, { RoyalLogo } from "../Components/Header.jsx";
import Footer from "../Components/Footer.jsx";
import {
  GOLD,
  GOLD_LIGHT,
  GOLD_DARK,
  BLACK,
  SURFACE,
  SURFACE2,
  WHITE,
  MUTED,
} from "../theme.js";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { serviceAPI } from "../Services/api.js";

// ─── HERO ─────────────────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section
      style={{
        minHeight: "100vh",
        background: `radial-gradient(ellipse at 20% 50%, rgba(139,105,20,0.13) 0%, transparent 60%),
                   radial-gradient(ellipse at 80% 20%, rgba(201,168,76,0.08) 0%, transparent 50%), ${BLACK}`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "120px 40px 80px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative rings */}
      {[600, 820].map((size) => (
        <div
          key={size}
          style={{
            position: "absolute",
            width: size,
            height: size,
            borderRadius: "50%",
            border: "1px solid rgba(201,168,76,0.05)",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            pointerEvents: "none",
          }}
        />
      ))}

      <p
        className="section-label fade-up"
        style={{ animationDelay: "0.1s", opacity: 0 }}
      >
        Welcome to Luxury
      </p>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          margin: "0 auto 28px",
          width: "fit-content",
        }}
      >
        <div style={{ width: 60, height: 1, background: GOLD, opacity: 0.5 }} />
        <div
          style={{
            width: 8,
            height: 8,
            background: GOLD,
            transform: "rotate(45deg)",
          }}
        />
        <div style={{ width: 60, height: 1, background: GOLD, opacity: 0.5 }} />
      </div>

      <div
        className="fade-up"
        style={{
          animationDelay: "0.25s",
          opacity: 0,
          marginBottom: 8,
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <RoyalLogo width={320} />
      </div>

      <p
        className="fade-up"
        style={{
          fontSize: 13,
          letterSpacing: 4,
          color: MUTED,
          textTransform: "uppercase",
          marginTop: 24,
          marginBottom: 16,
          fontWeight: 400,
          animationDelay: "0.45s",
          opacity: 0,
        }}
      >
        Hyderabad's Premier Luxury Experience
      </p>

      <p
        className="fade-up"
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontStyle: "italic",
          fontSize: "clamp(16px, 2.5vw, 22px)",
          color: "rgba(245,240,232,0.6)",
          maxWidth: 560,
          lineHeight: 1.7,
          animationDelay: "0.6s",
          opacity: 0,
        }}
      >
        "Where ancient rituals meet modern luxury — surrender to the art of pure
        relaxation"
      </p>

      <div
        className="fade-up"
        style={{
          display: "flex",
          gap: 20,
          marginTop: 48,
          flexWrap: "wrap",
          justifyContent: "center",
          animationDelay: "0.8s",
          opacity: 0,
        }}
      >
        <Link
          to="/booking"
          className="btn-solid"
          style={{ textDecoration: "none" }}
        >
          Reserve Your Visit
        </Link>
        <Link
          to="/services"
          className="btn-gold"
          style={{ textDecoration: "none" }}
        >
          Explore Services
        </Link>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 40,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
          animation: "float 2s ease-in-out infinite",
        }}
      >
        <p
          style={{
            fontSize: 10,
            letterSpacing: 3,
            color: MUTED,
            textTransform: "uppercase",
          }}
        >
          Scroll
        </p>
        <div
          style={{
            width: 1,
            height: 40,
            background: `linear-gradient(to bottom, ${GOLD}, transparent)`,
          }}
        />
      </div>
    </section>
  );
}

// ─── VISUAL BREAK ─────────────────────────────────────────────────────────────
function VisualBreakSection() {
  return (
    <section
      style={{
        height: 400,
        background: `linear-gradient(135deg, rgba(139,105,20,0.35) 0%, rgba(10,10,10,0.85) 50%, rgba(201,168,76,0.12) 100%),
                   url('https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=1600&q=80') center/cover no-repeat`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <p
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(26px, 5vw, 52px)",
            fontStyle: "italic",
            color: WHITE,
            fontWeight: 300,
          }}
        >
          "True luxury is the gift
        </p>
        <p
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(26px, 5vw, 52px)",
            fontStyle: "italic",
            color: GOLD,
            fontWeight: 300,
          }}
        >
          of time for oneself."
        </p>
        <p
          style={{
            fontSize: 12,
            letterSpacing: 4,
            color: MUTED,
            marginTop: 16,
            textTransform: "uppercase",
          }}
        >
          — The Royal Philosophy
        </p>
      </div>
    </section>
  );
}

// ─── SERVICES PREVIEW ─────────────────────────────────────────────────────────
function ServicesSection() {
  const [services, setServices] = useState([
    {
      _id: "s1",
      name: "Head Massage",
      category: "Massage",
      duration: 30,
      price: 500,
      icon: "✦",
      desc: "Professional head massage treatment by our expert therapists.",
    },
    {
      _id: "s2",
      name: "Foot Massage",
      category: "Massage",
      duration: 30,
      price: 700,
      icon: "◈",
      desc: "Relaxing foot massage to relieve stress and tension.",
    },
    {
      _id: "s3",
      name: "Legs and Hands Massage",
      category: "Massage",
      duration: 45,
      price: 1000,
      icon: "❋",
      desc: "Targeted professional treatment for legs and hands.",
    },
    {
      _id: "s4",
      name: "Back Massage",
      category: "Massage",
      duration: 45,
      price: 1000,
      icon: "◇",
      desc: "Relieve upper and lower back pain with expert therapy.",
    },
    {
      _id: "s5",
      name: "Basic Massage",
      category: "Massage",
      duration: 60,
      price: 1500,
      icon: "✿",
      desc: "A classic full body massage to melt away daily stress.",
    },
    {
      _id: "s6",
      name: "Body Polish",
      category: "Skin Care",
      duration: 45,
      price: 2500,
      icon: "✧",
      desc: "Our premium experience for glowing skin.",
    },
  ]);

  useEffect(() => {
    serviceAPI
      .getAll()
      .then((d) => {
        if (d.services?.length) setServices(d.services);
      })
      .catch(() => {});
  }, []);

  return (
    <section className="section" style={{ background: SURFACE }}>
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <p
            style={{
              fontSize: 11,
              letterSpacing: 5,
              color: GOLD,
              textTransform: "uppercase",
              marginBottom: 16,
            }}
          >
            Our Offerings
          </p>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              margin: "0 auto 28px",
              width: "fit-content",
            }}
          >
            <div
              style={{ width: 60, height: 1, background: GOLD, opacity: 0.5 }}
            />
            <div
              style={{
                width: 8,
                height: 8,
                background: GOLD,
                transform: "rotate(45deg)",
              }}
            />
            <div
              style={{ width: 60, height: 1, background: GOLD, opacity: 0.5 }}
            />
          </div>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(36px, 5vw, 60px)",
              fontWeight: 300,
              color: WHITE,
            }}
          >
            Curated <span className="gold-text">Experiences</span>
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 1,
            background: "rgba(201,168,76,0.1)",
            border: "1px solid rgba(201,168,76,0.08)",
          }}
        >
          {services.slice(0, 6).map((s, i) => (
            <div
              key={s._id || i}
              className="card-hover"
              style={{
                padding: "44px 36px",
                background: SURFACE,
                cursor: "pointer",
              }}
            >
              <div style={{ fontSize: 28, color: GOLD, marginBottom: 20 }}>
                {s.icon || "✦"}
              </div>
              <h3
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 22,
                  fontWeight: 400,
                  color: WHITE,
                  marginBottom: 10,
                }}
              >
                {s.name}
              </h3>
              <div
                style={{
                  display: "flex",
                  gap: 14,
                  marginBottom: 14,
                  alignItems: "center",
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
                <span style={{ fontSize: 16, color: GOLD }}>
                  ₹{s.price?.toLocaleString()}
                </span>
              </div>
              <p
                style={{
                  fontSize: 14,
                  color: MUTED,
                  lineHeight: 1.8,
                  marginBottom: 20,
                }}
              >
                {s.desc || s.description}
              </p>
              <Link
                to="/booking"
                style={{
                  color: GOLD,
                  fontSize: 12,
                  letterSpacing: 2,
                  textTransform: "uppercase",
                  textDecoration: "none",
                }}
              >
                Book This →
              </Link>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: 48 }}>
          <Link
            to="/services"
            className="btn-gold"
            style={{ textDecoration: "none" }}
          >
            View All Services
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─── ABOUT PREVIEW ────────────────────────────────────────────────────────────
function AboutSection() {
  const stats = [
    { num: "12+", label: "Years of Excellence" },
    { num: "8,000+", label: "Happy Clients" },
    { num: "45+", label: "Luxury Treatments" },
    { num: "98%", label: "Satisfaction Rate" },
  ];
  return (
    <section className="section" style={{ background: BLACK }}>
      <div
        className="container"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 80,
          alignItems: "center",
        }}
      >
        <div style={{ position: "relative" }}>
          <div
            style={{
              height: 520,
              background: `url('https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80') center/cover`,
              border: "1px solid rgba(201,168,76,0.2)",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: -28,
              right: -28,
              background: SURFACE2,
              border: "1px solid rgba(201,168,76,0.3)",
              padding: "24px 28px",
            }}
          >
            <p
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 48,
                color: GOLD,
                fontWeight: 300,
                lineHeight: 1,
              }}
            >
              12
            </p>
            <p
              style={{
                fontSize: 11,
                letterSpacing: 3,
                color: MUTED,
                textTransform: "uppercase",
                marginTop: 4,
              }}
            >
              Years Redefining
              <br />
              Luxury in Kolkata
            </p>
          </div>
        </div>
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
            Our Story
          </p>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(32px,4vw,52px)",
              fontWeight: 300,
              lineHeight: 1.2,
              color: WHITE,
              marginBottom: 24,
            }}
          >
            An Ode to
            <br />
            <span className="gold-text">Timeless Beauty</span>
          </h2>
          <p
            style={{
              color: MUTED,
              lineHeight: 1.9,
              fontSize: 15,
              marginBottom: 20,
            }}
          >
            Born from a passion for holistic wellness, The Royal Salon & Spa was
            founded with a singular vision: to create a sanctuary where every
            guest feels royally cared for.
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "24px 40px",
              marginBottom: 40,
            }}
          >
            {stats.map((s, i) => (
              <div key={i}>
                <p
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: 36,
                    color: GOLD,
                    fontWeight: 300,
                  }}
                >
                  {s.num}
                </p>
                <p
                  style={{
                    fontSize: 12,
                    color: MUTED,
                    letterSpacing: 1.5,
                    textTransform: "uppercase",
                    marginTop: 4,
                  }}
                >
                  {s.label}
                </p>
              </div>
            ))}
          </div>
          <Link
            to="/about"
            className="btn-gold"
            style={{ textDecoration: "none" }}
          >
            Our Full Story
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─── TESTIMONIALS ─────────────────────────────────────────────────────────────
function TestimonialsSection() {
  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Bridal Client",
      text: "The bridal package was an absolute dream. I felt like royalty on my wedding day. The team's attention to detail made it unforgettable.",
      rating: 5,
    },
    {
      name: "Ananya Bose",
      role: "Regular Member",
      text: "I've been coming here every month for two years. The gold facial is transformative — my skin has never looked better. Truly the finest spa in Kolkata.",
      rating: 5,
    },
    {
      name: "Ritika Dey",
      role: "First-time Guest",
      text: "From the moment I walked in, I was transported to a world of luxury. The hot stone massage melted every bit of tension. I'll be back.",
      rating: 5,
    },
  ];
  return (
    <section className="section" style={{ background: SURFACE2 }}>
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
            Client Stories
          </p>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(36px,5vw,60px)",
              fontWeight: 300,
              color: WHITE,
            }}
          >
            Words of <span className="gold-text">Delight</span>
          </h2>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 28,
          }}
        >
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="card-hover"
              style={{
                padding: "40px 32px",
                background: SURFACE,
                border: "1px solid rgba(201,168,76,0.1)",
                position: "relative",
              }}
            >
              <div
                style={{
                  fontSize: 56,
                  color: GOLD,
                  opacity: 0.15,
                  fontFamily: "Georgia",
                  lineHeight: 1,
                  position: "absolute",
                  top: 16,
                  left: 24,
                }}
              >
                "
              </div>
              <div style={{ display: "flex", gap: 2, marginBottom: 20 }}>
                {Array(t.rating)
                  .fill(null)
                  .map((_, j) => (
                    <span key={j} style={{ color: GOLD, fontSize: 14 }}>
                      ★
                    </span>
                  ))}
              </div>
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 16,
                  fontStyle: "italic",
                  color: WHITE,
                  lineHeight: 1.8,
                  marginBottom: 28,
                  opacity: 0.85,
                }}
              >
                "{t.text}"
              </p>
              <div
                style={{
                  borderTop: "1px solid rgba(201,168,76,0.12)",
                  paddingTop: 20,
                }}
              >
                <p style={{ fontSize: 14, fontWeight: 500, color: WHITE }}>
                  {t.name}
                </p>
                <p
                  style={{
                    fontSize: 11,
                    color: GOLD,
                    letterSpacing: 2,
                    textTransform: "uppercase",
                    marginTop: 4,
                  }}
                >
                  {t.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── WELLNESS JOURNAL ─────────────────────────────────────────────────────────
function WellnessJournalSection() {
  const posts = [
    {
      tag: "Skincare",
      date: "March 20, 2026",
      title: "The Ancient Art of 24K Gold Facial Therapy",
      excerpt:
        "Gold has been revered for its beautifying properties since Cleopatra's era. Discover how this precious metal transforms skin at the cellular level...",
      img: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&q=80",
      readTime: "5 min read",
    },
    {
      tag: "Wellness",
      date: "March 14, 2026",
      title: "Ayurvedic Rituals for Modern Stress Relief",
      excerpt:
        "The ancient wisdom of Ayurveda offers profound tools for navigating the chaos of contemporary life. Learn how daily abhyanga can transform your wellbeing...",
      img: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&q=80",
      readTime: "7 min read",
    },
    {
      tag: "Beauty",
      date: "March 7, 2026",
      title: "Pre-Bridal Skin Prep: The 30-Day Royal Ritual",
      excerpt:
        "Your wedding day deserves radiant skin. Our expert aestheticians reveal the month-long regimen that has transformed hundreds of brides...",
      img: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600&q=80",
      readTime: "6 min read",
    },
  ];
  return (
    <section className="section" style={{ background: SURFACE }}>
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <p
            style={{
              fontSize: 11,
              letterSpacing: 5,
              color: GOLD,
              textTransform: "uppercase",
              marginBottom: 16,
            }}
          >
            Wellness Journal
          </p>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(36px,5vw,60px)",
              fontWeight: 300,
              color: WHITE,
            }}
          >
            Insights & <span className="gold-text">Rituals</span>
          </h2>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 32,
          }}
        >
          {posts.map((p, i) => (
            <Link key={i} to="/journal" style={{ textDecoration: "none" }}>
              <article
                className="card-hover"
                style={{
                  background: SURFACE2,
                  border: "1px solid rgba(201,168,76,0.1)",
                  overflow: "hidden",
                  cursor: "pointer",
                }}
              >
                <div style={{ height: 220, overflow: "hidden" }}>
                  <img
                    src={p.img}
                    alt={p.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transition: "transform 0.5s",
                    }}
                    onMouseOver={(e) =>
                      (e.target.style.transform = "scale(1.06)")
                    }
                    onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
                  />
                </div>
                <div style={{ padding: "28px 24px" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: 14,
                    }}
                  >
                    <span
                      style={{
                        fontSize: 10,
                        letterSpacing: 3,
                        color: GOLD,
                        textTransform: "uppercase",
                      }}
                    >
                      {p.tag}
                    </span>
                    <span style={{ fontSize: 11, color: MUTED }}>
                      {p.readTime}
                    </span>
                  </div>
                  <h3
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: 20,
                      fontWeight: 400,
                      color: WHITE,
                      lineHeight: 1.35,
                      marginBottom: 12,
                    }}
                  >
                    {p.title}
                  </h3>
                  <p
                    style={{
                      fontSize: 13,
                      color: MUTED,
                      lineHeight: 1.8,
                      marginBottom: 18,
                    }}
                  >
                    {p.excerpt}
                  </p>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <span style={{ fontSize: 11, color: MUTED }}>{p.date}</span>
                    <span style={{ color: GOLD, fontSize: 12 }}>
                      Read More →
                    </span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: 48 }}>
          <Link
            to="/journal"
            className="btn-gold"
            style={{ textDecoration: "none" }}
          >
            View All Articles
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─── BOOKING CTA ──────────────────────────────────────────────────────────────
function BookingSection() {
  return (
    <section className="section" style={{ background: BLACK }}>
      <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
        <p
          style={{
            fontSize: 11,
            letterSpacing: 5,
            color: GOLD,
            textTransform: "uppercase",
            marginBottom: 20,
          }}
        >
          Reserve Your Ritual
        </p>
        <h2
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(36px,5vw,64px)",
            fontWeight: 300,
            color: WHITE,
            marginBottom: 20,
          }}
        >
          Book Your <span className="gold-text">Royal Experience</span>
        </h2>
        <p
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: "italic",
            fontSize: 20,
            color: "rgba(245,240,232,0.55)",
            lineHeight: 1.7,
            marginBottom: 48,
          }}
        >
          Surrender to an experience crafted entirely around you — your skin,
          your mood, your moment of peace.
        </p>
        <Link
          to="/booking"
          className="btn-solid"
          style={{ textDecoration: "none", fontSize: 13 }}
        >
          Reserve Your Visit
        </Link>
      </div>
    </section>
  );
}

// ─── INSTAGRAM ────────────────────────────────────────────────────────────────
function InstagramGallery() {
  const images = [
    {
      url: "https://images.unsplash.com/photo-1552693673-1bf958298935?w=400&q=80",
      col: "span 2",
    },
    {
      url: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=400&q=80",
    },
    {
      url: "https://images.unsplash.com/photo-1560750588-73207b1ef5b8?w=400&q=80",
    },
    {
      url: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=400&q=80",
    },
    {
      url: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=400&q=80",
      col: "span 2",
    },
    {
      url: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=400&q=80",
    },
  ];
  return (
    <section className="section" style={{ background: SURFACE }}>
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <p
            style={{
              fontSize: 11,
              letterSpacing: 5,
              color: GOLD,
              textTransform: "uppercase",
              marginBottom: 12,
            }}
          >
            Follow Our Journey
          </p>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(32px,4vw,52px)",
              fontWeight: 300,
              color: WHITE,
            }}
          >
            @TheRoyal<span className="gold-text">SalonSpa</span>
          </h2>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gridTemplateRows: "repeat(2, 220px)",
            gap: 4,
          }}
        >
          {images.map((img, i) => (
            <div
              key={i}
              style={{
                gridColumn: img.col,
                overflow: "hidden",
                position: "relative",
                cursor: "pointer",
              }}
            >
              <img
                src={img.url}
                alt={`Instagram ${i + 1}`}
                loading="lazy"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transition: "transform 0.5s",
                }}
                onMouseOver={(e) => (e.target.style.transform = "scale(1.06)")}
                onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "rgba(10,10,10,0.5)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  opacity: 0,
                  transition: "opacity 0.3s",
                }}
                onMouseOver={(e) => (e.currentTarget.style.opacity = 1)}
                onMouseOut={(e) => (e.currentTarget.style.opacity = 0)}
              >
                <span style={{ color: WHITE, fontSize: 28 }}>✦</span>
              </div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: 40 }}>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="btn-gold"
          >
            Follow on Instagram
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── HOME PAGE ────────────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <ServicesSection />
        <VisualBreakSection />
        <AboutSection />
        <TestimonialsSection />
        <WellnessJournalSection />
        <BookingSection />
        <InstagramGallery />
      </main>
      <Footer />
    </>
  );
}
