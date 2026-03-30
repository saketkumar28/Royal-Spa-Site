import { useState, useEffect, useRef } from "react";

// ─── DESIGN TOKENS ───────────────────────────────────────────────────────────
const GOLD = "#C9A84C";
const GOLD_LIGHT = "#E8C97A";
const GOLD_DARK = "#8B6914";
const BLACK = "#0A0A0A";
const SURFACE = "#111111";
const SURFACE2 = "#1A1A1A";
const SURFACE3 = "#222222";
const WHITE = "#F5F0E8";
const MUTED = "#9A9080";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Jost:wght@200;300;400;500&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }
  
  body {
    background: ${BLACK};
    color: ${WHITE};
    font-family: 'Jost', sans-serif;
    font-weight: 300;
    overflow-x: hidden;
  }

  .serif { font-family: 'Cormorant Garamond', serif; }
  
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: ${BLACK}; }
  ::-webkit-scrollbar-thumb { background: ${GOLD_DARK}; border-radius: 2px; }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(32px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; } to { opacity: 1; }
  }
  @keyframes shimmer {
    0%   { background-position: -200% center; }
    100% { background-position: 200% center; }
  }
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50%       { transform: translateY(-8px); }
  }
  @keyframes linegrow {
    from { transform: scaleX(0); }
    to   { transform: scaleX(1); }
  }

  .fade-up { animation: fadeUp 0.9s ease forwards; }
  .fade-in { animation: fadeIn 1.2s ease forwards; }

  .gold-text {
    background: linear-gradient(135deg, ${GOLD_DARK}, ${GOLD}, ${GOLD_LIGHT}, ${GOLD});
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: shimmer 4s linear infinite;
  }

  .btn-gold {
    background: transparent;
    border: 1px solid ${GOLD};
    color: ${GOLD};
    padding: 14px 40px;
    font-family: 'Jost', sans-serif;
    font-size: 12px;
    font-weight: 400;
    letter-spacing: 3px;
    text-transform: uppercase;
    cursor: pointer;
    transition: all 0.4s ease;
    position: relative;
    overflow: hidden;
  }
  .btn-gold::before {
    content: '';
    position: absolute;
    inset: 0;
    background: ${GOLD};
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.4s ease;
    z-index: -1;
  }
  .btn-gold:hover { color: ${BLACK}; }
  .btn-gold:hover::before { transform: scaleX(1); }

  .btn-gold-solid {
    background: ${GOLD};
    border: 1px solid ${GOLD};
    color: ${BLACK};
    padding: 14px 40px;
    font-family: 'Jost', sans-serif;
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 3px;
    text-transform: uppercase;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  .btn-gold-solid:hover { background: ${GOLD_LIGHT}; border-color: ${GOLD_LIGHT}; }

  .divider-gold {
    display: flex;
    align-items: center;
    gap: 16px;
    margin: 0 auto 32px;
    width: fit-content;
  }
  .divider-gold .line { width: 60px; height: 1px; background: ${GOLD}; opacity: 0.5; }
  .divider-gold .diamond {
    width: 8px; height: 8px;
    background: ${GOLD};
    transform: rotate(45deg);
  }

  .section-label {
    font-size: 11px;
    letter-spacing: 5px;
    text-transform: uppercase;
    color: ${GOLD};
    font-weight: 400;
    margin-bottom: 16px;
  }

  .card-hover {
    transition: transform 0.4s ease, box-shadow 0.4s ease;
  }
  .card-hover:hover {
    transform: translateY(-6px);
    box-shadow: 0 20px 60px rgba(201,168,76,0.15);
  }

  .nav-link {
    color: ${MUTED};
    text-decoration: none;
    font-size: 12px;
    letter-spacing: 2px;
    text-transform: uppercase;
    font-weight: 400;
    transition: color 0.3s;
    cursor: pointer;
  }
  .nav-link:hover { color: ${GOLD}; }

  input, textarea, select {
    background: ${SURFACE2};
    border: 1px solid rgba(201,168,76,0.25);
    color: ${WHITE};
    padding: 14px 18px;
    font-family: 'Jost', sans-serif;
    font-size: 14px;
    font-weight: 300;
    width: 100%;
    outline: none;
    transition: border-color 0.3s;
  }
  input:focus, textarea:focus, select:focus {
    border-color: ${GOLD};
  }
  input::placeholder, textarea::placeholder { color: ${MUTED}; }
  select option { background: ${SURFACE2}; }

  .instagram-grid img {
    width: 100%; height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
    display: block;
  }
  .instagram-item:hover img { transform: scale(1.06); }
  .instagram-item {
    overflow: hidden;
    position: relative;
  }
  .instagram-overlay {
    position: absolute;
    inset: 0;
    background: rgba(10,10,10,0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.4s ease;
  }
  .instagram-item:hover .instagram-overlay { opacity: 1; }

  @media (max-width: 768px) {
    .hide-mobile { display: none !important; }
    .mobile-full { width: 100% !important; }
  }
`;

// ─── COMPONENTS ──────────────────────────────────────────────────────────────

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems = [
    "Home",
    "About",
    "Services",
    "Gallery",
    "Journal",
    "Contact",
  ];

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: "20px 60px",
        background: scrolled ? "rgba(10,10,10,0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? `1px solid rgba(201,168,76,0.15)` : "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        transition: "all 0.5s ease",
      }}
    >
      {/* Logo */}
      <div style={{ cursor: "pointer" }}>
        <p
          style={{
            fontSize: 10,
            letterSpacing: 6,
            color: GOLD,
            fontWeight: 400,
            textTransform: "uppercase",
            marginBottom: 2,
          }}
        >
          The Royal
        </p>
        <p
          className="serif"
          style={{
            fontSize: 22,
            fontWeight: 300,
            color: WHITE,
            letterSpacing: 3,
          }}
        >
          Salon & Spa
        </p>
      </div>

      {/* Nav */}
      <nav style={{ display: "flex", gap: 40 }} className="hide-mobile">
        {navItems.map((n) => (
          <a key={n} className="nav-link">
            {n}
          </a>
        ))}
      </nav>

      {/* CTA */}
      <button
        className="btn-gold hide-mobile"
        style={{ padding: "10px 28px", fontSize: 11 }}
      >
        Book Now
      </button>

      {/* Mobile burger */}
      <div
        onClick={() => setMenuOpen(!menuOpen)}
        style={{
          cursor: "pointer",
          display: "flex",
          flexDirection: "column",
          gap: 5,
          padding: 4,
        }}
        className="show-mobile"
      >
        {[0, 1, 2].map((i) => (
          <div key={i} style={{ width: 24, height: 1, background: GOLD }} />
        ))}
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(10,10,10,0.98)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 40,
            zIndex: 200,
          }}
        >
          <button
            onClick={() => setMenuOpen(false)}
            style={{
              position: "absolute",
              top: 30,
              right: 30,
              background: "none",
              border: "none",
              color: GOLD,
              fontSize: 24,
              cursor: "pointer",
            }}
          >
            ✕
          </button>
          {navItems.map((n) => (
            <a
              key={n}
              className="nav-link"
              style={{ fontSize: 20, letterSpacing: 4 }}
              onClick={() => setMenuOpen(false)}
            >
              {n}
            </a>
          ))}
          <button className="btn-gold" onClick={() => setMenuOpen(false)}>
            Book Now
          </button>
        </div>
      )}
    </header>
  );
}

function HeroSection() {
  return (
    <section
      style={{
        minHeight: "100vh",
        background: `radial-gradient(ellipse at 20% 50%, rgba(139,105,20,0.12) 0%, transparent 60%),
                   radial-gradient(ellipse at 80% 20%, rgba(201,168,76,0.08) 0%, transparent 50%),
                   ${BLACK}`,
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
      <div
        style={{
          position: "absolute",
          width: 600,
          height: 600,
          borderRadius: "50%",
          border: `1px solid rgba(201,168,76,0.06)`,
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 800,
          height: 800,
          borderRadius: "50%",
          border: `1px solid rgba(201,168,76,0.04)`,
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          pointerEvents: "none",
        }}
      />

      <p
        className="section-label fade-up"
        style={{ animationDelay: "0.1s", opacity: 0 }}
      >
        Welcome to Luxury
      </p>
      <div className="divider-gold">
        <div className="line" />
        <div className="diamond" />
        <div className="line" />
      </div>
      <h1
        className="serif fade-up"
        style={{
          fontSize: "clamp(52px, 8vw, 96px)",
          fontWeight: 300,
          lineHeight: 1.08,
          color: WHITE,
          marginBottom: 8,
          animationDelay: "0.25s",
          opacity: 0,
        }}
      >
        The Royal
        <br />
        <span className="gold-text">Salon & Spa</span>
      </h1>
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
        Kolkata's Premier Luxury Experience
      </p>
      <p
        className="serif fade-up"
        style={{
          fontSize: "clamp(16px, 2.5vw, 22px)",
          fontStyle: "italic",
          color: `rgba(245,240,232,0.6)`,
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
        <button className="btn-gold-solid">Reserve Your Visit</button>
        <button className="btn-gold">Explore Services</button>
      </div>

      {/* Scroll indicator */}
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

function VisualBreakSection() {
  return (
    <section
      style={{
        height: 400,
        background: `linear-gradient(135deg, rgba(139,105,20,0.3) 0%, rgba(10,10,10,0.9) 50%, rgba(201,168,76,0.1) 100%),
                   url('https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=1600&q=80') center/cover no-repeat`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <p
          className="serif"
          style={{
            fontSize: "clamp(28px, 5vw, 52px)",
            fontStyle: "italic",
            color: WHITE,
            fontWeight: 300,
          }}
        >
          "True luxury is the gift
        </p>
        <p
          className="serif"
          style={{
            fontSize: "clamp(28px, 5vw, 52px)",
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

function ServicesSection() {
  const services = [
    {
      icon: "✦",
      name: "Royal Signature Facial",
      duration: "90 min",
      price: "₹4,500",
      desc: "A bespoke facial using 24k gold serum and diamond dust to restore radiance and youthfulness.",
    },
    {
      icon: "◈",
      name: "Hot Stone Therapy",
      duration: "75 min",
      price: "₹3,800",
      desc: "Volcanic basalt stones melt away tension and restore your body's natural energy flow.",
    },
    {
      icon: "❋",
      name: "Aromatherapy Massage",
      duration: "60 min",
      price: "₹3,200",
      desc: "Custom blended essential oils with Swedish technique to rejuvenate mind, body and soul.",
    },
    {
      icon: "✿",
      name: "Bridal Package",
      duration: "4 hrs",
      price: "₹18,000",
      desc: "A complete head-to-toe bridal transformation including hair, makeup and relaxation rituals.",
    },
    {
      icon: "◉",
      name: "Hair Spa Ritual",
      duration: "45 min",
      price: "₹2,500",
      desc: "Premium Moroccan argan oil treatment that restores shine, strength and silkiness to hair.",
    },
    {
      icon: "✧",
      name: "Gold Leaf Body Wrap",
      duration: "120 min",
      price: "₹7,500",
      desc: "Indulge in a full-body detox wrap infused with 24k gold and rare botanical extracts.",
    },
  ];

  return (
    <section style={{ padding: "100px 60px", background: SURFACE }}>
      <div style={{ textAlign: "center", marginBottom: 64 }}>
        <p className="section-label">Our Offerings</p>
        <div className="divider-gold" />
        <h2
          className="serif"
          style={{
            fontSize: "clamp(36px, 5vw, 60px)",
            fontWeight: 300,
            color: WHITE,
          }}
        >
          Curated <span className="gold-text">Experiences</span>
        </h2>
        <p
          style={{
            color: MUTED,
            marginTop: 20,
            fontSize: 15,
            maxWidth: 500,
            margin: "20px auto 0",
            lineHeight: 1.8,
          }}
        >
          Each treatment is a bespoke ritual, designed to restore balance and
          nurture your essence.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: 1,
          background: `rgba(201,168,76,0.1)`,
          border: `1px solid rgba(201,168,76,0.1)`,
          maxWidth: 1200,
          margin: "0 auto",
        }}
      >
        {services.map((s, i) => (
          <div
            key={i}
            className="card-hover"
            style={{
              padding: "48px 40px",
              background: SURFACE,
              cursor: "pointer",
              borderBottom: `1px solid rgba(201,168,76,0.08)`,
            }}
          >
            <div
              style={{
                fontSize: 28,
                color: GOLD,
                marginBottom: 20,
                fontWeight: 300,
              }}
            >
              {s.icon}
            </div>
            <h3
              className="serif"
              style={{
                fontSize: 22,
                fontWeight: 400,
                color: WHITE,
                marginBottom: 8,
              }}
            >
              {s.name}
            </h3>
            <div
              style={{
                display: "flex",
                gap: 16,
                marginBottom: 16,
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
                {s.duration}
              </span>
              <span
                style={{
                  width: 4,
                  height: 4,
                  background: GOLD,
                  transform: "rotate(45deg)",
                  display: "inline-block",
                  opacity: 0.6,
                }}
              />
              <span style={{ fontSize: 16, color: GOLD, fontWeight: 400 }}>
                {s.price}
              </span>
            </div>
            <p style={{ fontSize: 14, color: MUTED, lineHeight: 1.8 }}>
              {s.desc}
            </p>
            <div
              style={{
                marginTop: 24,
                display: "flex",
                alignItems: "center",
                gap: 8,
                color: GOLD,
                fontSize: 12,
                letterSpacing: 2,
                textTransform: "uppercase",
              }}
            >
              <span>Book This</span>
              <span style={{ fontSize: 16 }}>→</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function AboutSection() {
  const stats = [
    { num: "12+", label: "Years of Excellence" },
    { num: "8,000+", label: "Happy Clients" },
    { num: "45+", label: "Luxury Treatments" },
    { num: "98%", label: "Satisfaction Rate" },
  ];

  return (
    <section
      style={{
        padding: "100px 60px",
        display: "flex",
        gap: 80,
        alignItems: "center",
        maxWidth: 1200,
        margin: "0 auto",
        flexWrap: "wrap",
      }}
    >
      <div style={{ flex: "1 1 400px" }}>
        <div
          style={{
            position: "relative",
            background: `url('https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80') center/cover`,
            height: 520,
            borderRadius: 0,
            border: `1px solid rgba(201,168,76,0.2)`,
          }}
        >
          <div
            style={{
              position: "absolute",
              bottom: -30,
              right: -30,
              background: SURFACE2,
              border: `1px solid rgba(201,168,76,0.3)`,
              padding: "28px 32px",
              minWidth: 180,
            }}
          >
            <p
              className="serif"
              style={{
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
      </div>
      <div style={{ flex: "1 1 380px" }}>
        <p className="section-label">Our Story</p>
        <div className="divider-gold" style={{ justifyContent: "flex-start" }}>
          <div className="line" />
          <div className="diamond" />
          <div className="line" />
        </div>
        <h2
          className="serif"
          style={{
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
          guest feels royally cared for. Our master therapists blend ancient
          Ayurvedic wisdom with contemporary techniques.
        </p>
        <p
          style={{
            color: MUTED,
            lineHeight: 1.9,
            fontSize: 15,
            marginBottom: 40,
          }}
        >
          Each visit is not merely a treatment — it's a transformative ritual
          crafted for your unique needs. We source only the finest ingredients:
          24k gold, Himalayan minerals, and rare botanical extracts.
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
                className="serif"
                style={{ fontSize: 36, color: GOLD, fontWeight: 300 }}
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
        <button className="btn-gold">Our Full Story</button>
      </div>
    </section>
  );
}

function BookingSection() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    date: "",
    time: "",
    notes: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const services = [
    "Royal Signature Facial",
    "Hot Stone Therapy",
    "Aromatherapy Massage",
    "Bridal Package",
    "Hair Spa Ritual",
    "Gold Leaf Body Wrap",
  ];
  const times = [
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM",
    "6:00 PM",
  ];

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.service || !form.date || !form.time)
      return;
    setSubmitted(true);
  };

  return (
    <section style={{ padding: "100px 60px", background: BLACK }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <p className="section-label">Reserve Your Ritual</p>
          <div className="divider-gold" />
          <h2
            className="serif"
            style={{
              fontSize: "clamp(36px, 5vw, 60px)",
              fontWeight: 300,
              color: WHITE,
            }}
          >
            Book Your <span className="gold-text">Royal Experience</span>
          </h2>
        </div>

        {submitted ? (
          <div
            style={{
              textAlign: "center",
              padding: "80px 40px",
              border: `1px solid rgba(201,168,76,0.3)`,
              animation: "fadeIn 0.6s ease",
            }}
          >
            <div style={{ fontSize: 48, marginBottom: 24 }}>✦</div>
            <h3
              className="serif"
              style={{
                fontSize: 36,
                color: WHITE,
                fontWeight: 300,
                marginBottom: 16,
              }}
            >
              Reservation Confirmed
            </h3>
            <p
              style={{
                color: MUTED,
                lineHeight: 1.8,
                fontSize: 15,
                maxWidth: 440,
                margin: "0 auto 32px",
              }}
            >
              Thank you, <span style={{ color: GOLD }}>{form.name}</span>. Your{" "}
              {form.service} session is reserved for {form.date} at {form.time}.
              We'll send a confirmation to {form.email}.
            </p>
            <button className="btn-gold" onClick={() => setSubmitted(false)}>
              Book Another
            </button>
          </div>
        ) : (
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}
          >
            {[
              { key: "name", placeholder: "Full Name *", type: "text" },
              { key: "email", placeholder: "Email Address *", type: "email" },
              { key: "phone", placeholder: "Phone Number", type: "tel" },
            ].map((f) => (
              <div
                key={f.key}
                style={{ gridColumn: f.key === "name" ? "1 / -1" : "auto" }}
              >
                <input
                  type={f.type}
                  placeholder={f.placeholder}
                  value={form[f.key]}
                  onChange={(e) =>
                    setForm({ ...form, [f.key]: e.target.value })
                  }
                />
              </div>
            ))}
            <div>
              <select
                value={form.service}
                onChange={(e) => setForm({ ...form, service: e.target.value })}
              >
                <option value="">Select Service *</option>
                {services.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <select
                value={form.time}
                onChange={(e) => setForm({ ...form, time: e.target.value })}
              >
                <option value="">Preferred Time *</option>
                {times.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <input
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                style={{ colorScheme: "dark" }}
              />
            </div>
            <div style={{ gridColumn: "1 / -1" }}>
              <textarea
                placeholder="Special requests or notes..."
                rows={4}
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
              />
            </div>
            <div
              style={{
                gridColumn: "1 / -1",
                textAlign: "center",
                marginTop: 16,
              }}
            >
              <button
                className="btn-gold-solid"
                onClick={handleSubmit}
                style={{ fontSize: 12 }}
              >
                Confirm Reservation
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

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
    <section style={{ padding: "100px 60px", background: SURFACE }}>
      <div style={{ textAlign: "center", marginBottom: 64 }}>
        <p className="section-label">Wellness Journal</p>
        <div className="divider-gold" />
        <h2
          className="serif"
          style={{
            fontSize: "clamp(36px, 5vw, 60px)",
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
          maxWidth: 1200,
          margin: "0 auto",
        }}
      >
        {posts.map((p, i) => (
          <article
            key={i}
            className="card-hover"
            style={{
              background: SURFACE2,
              border: `1px solid rgba(201,168,76,0.12)`,
              cursor: "pointer",
              overflow: "hidden",
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
                  transition: "transform 0.5s ease",
                }}
                onMouseOver={(e) => (e.target.style.transform = "scale(1.06)")}
                onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
              />
            </div>
            <div style={{ padding: "32px 28px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 16,
                }}
              >
                <span
                  style={{
                    fontSize: 10,
                    letterSpacing: 3,
                    color: GOLD,
                    textTransform: "uppercase",
                    fontWeight: 400,
                  }}
                >
                  {p.tag}
                </span>
                <span style={{ fontSize: 11, color: MUTED }}>{p.readTime}</span>
              </div>
              <h3
                className="serif"
                style={{
                  fontSize: 20,
                  fontWeight: 400,
                  color: WHITE,
                  lineHeight: 1.35,
                  marginBottom: 14,
                }}
              >
                {p.title}
              </h3>
              <p
                style={{
                  fontSize: 13,
                  color: MUTED,
                  lineHeight: 1.8,
                  marginBottom: 20,
                }}
              >
                {p.excerpt}
              </p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span style={{ fontSize: 11, color: MUTED }}>{p.date}</span>
                <span style={{ color: GOLD, fontSize: 12, letterSpacing: 1 }}>
                  Read More →
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
      <div style={{ textAlign: "center", marginTop: 48 }}>
        <button className="btn-gold">View All Articles</button>
      </div>
    </section>
  );
}

function InstagramGallery() {
  const images = [
    {
      url: "https://images.unsplash.com/photo-1552693673-1bf958298935?w=400&q=80",
      span: "1 / 3 / 2 / 4",
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
      span: "1 / 4 / 2 / 5",
    },
    {
      url: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=400&q=80",
    },
  ];

  return (
    <section style={{ padding: "100px 60px", background: BLACK }}>
      <div style={{ textAlign: "center", marginBottom: 48 }}>
        <p className="section-label">Follow Our Journey</p>
        <div className="divider-gold" />
        <h2
          className="serif"
          style={{
            fontSize: "clamp(32px, 4vw, 52px)",
            fontWeight: 300,
            color: WHITE,
          }}
        >
          @TheRoyal<span className="gold-text">SalonSpa</span>
        </h2>
        <p style={{ color: MUTED, marginTop: 12, fontSize: 14 }}>
          Join our royal community on Instagram
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gridTemplateRows: "repeat(2, 220px)",
          gap: 4,
          maxWidth: 1200,
          margin: "0 auto",
        }}
      >
        {images.map((img, i) => (
          <div
            key={i}
            className="instagram-item"
            style={{ gridArea: img.span }}
          >
            <img src={img.url} alt={`Gallery ${i + 1}`} loading="lazy" />
            <div className="instagram-overlay">
              <div style={{ textAlign: "center" }}>
                <p style={{ color: WHITE, fontSize: 24 }}>✦</p>
                <p
                  style={{
                    color: WHITE,
                    fontSize: 11,
                    letterSpacing: 2,
                    textTransform: "uppercase",
                    marginTop: 8,
                  }}
                >
                  View Post
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ textAlign: "center", marginTop: 40 }}>
        <button className="btn-gold">Follow on Instagram</button>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Bridal Client",
      text: "The bridal package was an absolute dream. I felt like royalty on my wedding day. The team's attention to detail and warmth made it unforgettable.",
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
      text: "From the moment I walked in, I was transported to a world of luxury. The hot stone massage melted every bit of tension. I'll be back without a doubt.",
      rating: 5,
    },
  ];

  return (
    <section style={{ padding: "100px 60px", background: SURFACE2 }}>
      <div style={{ textAlign: "center", marginBottom: 64 }}>
        <p className="section-label">Client Stories</p>
        <div className="divider-gold" />
        <h2
          className="serif"
          style={{
            fontSize: "clamp(36px, 5vw, 60px)",
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
          gap: 32,
          maxWidth: 1200,
          margin: "0 auto",
        }}
      >
        {testimonials.map((t, i) => (
          <div
            key={i}
            className="card-hover"
            style={{
              padding: "40px 36px",
              background: SURFACE,
              border: `1px solid rgba(201,168,76,0.12)`,
              position: "relative",
            }}
          >
            <div
              style={{
                fontSize: 56,
                color: GOLD,
                opacity: 0.2,
                fontFamily: "Georgia",
                lineHeight: 1,
                position: "absolute",
                top: 20,
                left: 28,
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
              className="serif"
              style={{
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
                borderTop: `1px solid rgba(201,168,76,0.15)`,
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
    </section>
  );
}

function Footer() {
  return (
    <footer
      style={{
        background: BLACK,
        borderTop: `1px solid rgba(201,168,76,0.15)`,
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
              className="serif"
              style={{
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
              Kolkata's most exclusive luxury wellness sanctuary. Where beauty
              rituals become transformative journeys.
            </p>
            <div style={{ display: "flex", gap: 16, marginTop: 28 }}>
              {["Instagram", "Facebook", "Pinterest"].map((s) => (
                <a
                  key={s}
                  style={{
                    fontSize: 11,
                    letterSpacing: 1.5,
                    color: MUTED,
                    textDecoration: "none",
                    textTransform: "uppercase",
                    cursor: "pointer",
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

          {/* Links */}
          {[
            {
              title: "Explore",
              links: ["Home", "About Us", "Services", "Gallery", "Journal"],
            },
            {
              title: "Services",
              links: [
                "Facials",
                "Massages",
                "Hair Spa",
                "Bridal",
                "Body Wraps",
              ],
            },
            {
              title: "Visit",
              links: [
                "Park Street, Kolkata",
                "+91 98765 43210",
                "info@theroyalspa.in",
                "Mon–Sun: 10AM–8PM",
              ],
            },
          ].map((col) => (
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
              {col.links.map((l) => (
                <p
                  key={l}
                  style={{
                    fontSize: 13,
                    color: MUTED,
                    marginBottom: 12,
                    cursor: "pointer",
                    transition: "color 0.3s",
                  }}
                  onMouseOver={(e) => (e.target.style.color = WHITE)}
                  onMouseOut={(e) => (e.target.style.color = MUTED)}
                >
                  {l}
                </p>
              ))}
            </div>
          ))}
        </div>

        <div
          style={{
            borderTop: `1px solid rgba(201,168,76,0.1)`,
            paddingTop: 32,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 16,
          }}
        >
          <p style={{ fontSize: 12, color: MUTED }}>
            © 2026 The Royal Salon & Spa. All rights reserved. Crafted by Asan
            Innovators.
          </p>
          <div className="divider-gold" style={{ margin: 0 }}>
            <div className="line" style={{ width: 30 }} />
            <div className="diamond" style={{ width: 6, height: 6 }} />
            <div className="line" style={{ width: 30 }} />
          </div>
          <p style={{ fontSize: 12, color: MUTED }}>
            Privacy Policy · Terms of Service
          </p>
        </div>
      </div>
    </footer>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <>
      <style>{styles}</style>
      <main style={{ minHeight: "100vh", background: BLACK }}>
        <Header />
        <HeroSection />
        <ServicesSection />
        <VisualBreakSection />
        <AboutSection />
        <TestimonialsSection />
        <WellnessJournalSection />
        <BookingSection />
        <InstagramGallery />
        <Footer />
      </main>
    </>
  );
}
