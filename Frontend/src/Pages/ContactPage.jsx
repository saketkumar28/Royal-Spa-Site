// src/pages/ContactPage.jsx
import { useState, useEffect } from "react";
import Header from "../Components/Header.jsx";
import Footer from "../Components/Footer.jsx";
import PageHero from "../Components/PageHero.jsx";
import { contactAPI } from "../Services/api.js";
import {
  GOLD,
  WHITE,
  MUTED,
  SURFACE,
  SURFACE2,
  BLACK,
  SUCCESS,
  DANGER,
} from "../theme";

const INFO = [
  {
    icon: "◉",
    label: "Address",
    value: "Kothaguda, Hyderabad - 500081, Telangana",
  },
  { icon: "✦", label: "Phone", value: "+91 9392211285\nCall or WhatsApp" },
  {
    icon: "❋",
    label: "Email",
    value: "info@theroyalspa.in",
  },
  {
    icon: "◈",
    label: "Hours",
    value: "Open Daily\n10:00 AM – 9:00 PM",
  },
];

const FAQ = [
  {
    q: "How do I book a session?",
    a: "Prior appointment is necessary for all our treatments. You can request a booking through our website or reach out to us via WhatsApp.",
  },
  {
    q: "Do I need to arrive early?",
    a: "Yes, please arrive 15 minutes before your scheduled time. Please note we have a strict policy: a maximum 15-minute delay will result in auto-cancellation of your appointment and deduction of your coupon (if applicable).",
  },
  {
    q: "What is your cancellation policy?",
    a: "Please inform us at least 1 hour in advance if you need to cancel or reschedule your appointment to avoid any penalties.",
  },
  {
    q: "Are there any health guidelines I should follow?",
    a: "Yes, please inform our therapists of any skin disease, infection, or medical problem before your service begins so we can ensure a safe and comfortable experience.",
  },
  {
    q: "What should I wear?",
    a: "We provide complimentary robes, slippers, and towels. Wear comfortable clothing you can easily change out of. We recommend removing jewelry and using the lockers provided, as management is not responsible for loss or damages.",
  },
];

export default function ContactPage() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState(null);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 992);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) {
      setStatus("error");
      return;
    }
    setStatus("loading");
    try {
      await contactAPI.send(form);
      setStatus("success");
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  const inputStyle = {
    background: "transparent",
    border: `1px solid rgba(201,168,76,0.2)`,
    padding: "14px",
    color: WHITE,
    fontSize: "14px",
    width: "100%",
    outline: "none",
    transition: "border-color 0.3s",
  };

  return (
    <>
      <Header />

      <PageHero
        label="Get in Touch"
        title="We'd Love to"
        highlight="Hear from You"
        subtitle="Whether you have a question, a special request, or simply want to say hello"
      />

      {/* Info + Form */}
      <section
        style={{
          padding: isMobile ? "60px 20px" : "100px 60px",
          background: SURFACE,
        }}
      >
        <div
          className="container"
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1.6fr",
            gap: isMobile ? 60 : 80,
            alignItems: "start",
          }}
        >
          {/* Info */}
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
              Find Us
            </p>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: isMobile ? 32 : 42,
                fontWeight: 300,
                color: WHITE,
                marginBottom: 40,
                lineHeight: 1.2,
              }}
            >
              Visit Our <span className="gold-text">Sanctuary</span>
            </h2>
            {INFO.map((item, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  gap: 20,
                  marginBottom: 32,
                  paddingBottom: 32,
                  borderBottom:
                    i < INFO.length - 1
                      ? "1px solid rgba(201,168,76,0.1)"
                      : "none",
                }}
              >
                <div
                  style={{
                    fontSize: 20,
                    color: GOLD,
                    marginTop: 2,
                    flexShrink: 0,
                  }}
                >
                  {item.icon}
                </div>
                <div>
                  <p
                    style={{
                      fontSize: 11,
                      letterSpacing: 2,
                      color: GOLD,
                      textTransform: "uppercase",
                      marginBottom: 8,
                    }}
                  >
                    {item.label}
                  </p>
                  <p
                    style={{
                      fontSize: 14,
                      color: WHITE,
                      lineHeight: 1.8,
                      whiteSpace: "pre-line",
                    }}
                  >
                    {item.value}
                  </p>
                </div>
              </div>
            ))}

            {/* Social */}
            <div style={{ marginTop: 8 }}>
              <p
                style={{
                  fontSize: 11,
                  letterSpacing: 2,
                  color: GOLD,
                  textTransform: "uppercase",
                  marginBottom: 16,
                }}
              >
                Follow Us
              </p>
              <div style={{ display: "flex", gap: 16 }}>
                {["Instagram", "Facebook", "Pinterest"].map((s) => (
                  <a
                    key={s}
                    href="#"
                    style={{
                      fontSize: 12,
                      color: MUTED,
                      letterSpacing: 1.5,
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
          </div>

          {/* Form */}
          <div
            style={{
              background: SURFACE2,
              border: "1px solid rgba(201,168,76,0.12)",
              padding: isMobile ? "30px 20px" : "48px 44px",
            }}
          >
            <p
              style={{
                fontSize: 11,
                letterSpacing: 5,
                color: GOLD,
                textTransform: "uppercase",
                marginBottom: 8,
              }}
            >
              Send a Message
            </p>
            <h3
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 30,
                fontWeight: 300,
                color: WHITE,
                marginBottom: 36,
              }}
            >
              How can we help you?
            </h3>

            {status === "success" ? (
              <div style={{ textAlign: "center", padding: "48px 20px" }}>
                <div style={{ fontSize: 40, color: GOLD, marginBottom: 20 }}>
                  ✦
                </div>
                <h4
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: 26,
                    color: WHITE,
                    fontWeight: 300,
                    marginBottom: 12,
                  }}
                >
                  Message Received
                </h4>
                <p style={{ color: MUTED, lineHeight: 1.8, marginBottom: 32 }}>
                  Thank you for reaching out. Our team will be in touch within
                  24 hours.
                </p>
                <button className="btn-gold" onClick={() => setStatus(null)}>
                  Send Another
                </button>
              </div>
            ) : (
              <div
                style={{ display: "flex", flexDirection: "column", gap: 16 }}
              >
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                    gap: 16,
                  }}
                >
                  <input
                    placeholder="Full Name *"
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                    style={inputStyle}
                  />
                  <input
                    type="email"
                    placeholder="Email Address *"
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    style={inputStyle}
                  />
                </div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                    gap: 16,
                  }}
                >
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={form.phone}
                    onChange={(e) => update("phone", e.target.value)}
                    style={inputStyle}
                  />
                  <select
                    value={form.subject}
                    onChange={(e) => update("subject", e.target.value)}
                    style={{
                      ...inputStyle,
                      color: form.subject ? WHITE : MUTED,
                    }}
                  >
                    <option value="">Subject</option>
                    {[
                      "General Inquiry",
                      "Booking Query",
                      "Membership Details",
                      "Corporate Booking",
                      "Gift Voucher",
                      "Feedback",
                      "Other",
                    ].map((o) => (
                      <option key={o} style={{ background: BLACK }}>
                        {o}
                      </option>
                    ))}
                  </select>
                </div>
                <textarea
                  placeholder="Your message *"
                  rows={5}
                  value={form.message}
                  onChange={(e) => update("message", e.target.value)}
                  style={{ ...inputStyle, resize: "none" }}
                />

                {status === "error" && (
                  <p style={{ fontSize: 13, color: DANGER }}>
                    {!form.name || !form.email || !form.message
                      ? "Please fill in all required fields."
                      : "Something went wrong. Please try again."}
                  </p>
                )}

                <button
                  className="btn-solid"
                  onClick={handleSubmit}
                  disabled={status === "loading"}
                  style={{
                    padding: "16px",
                    opacity: status === "loading" ? 0.7 : 1,
                    cursor: status === "loading" ? "wait" : "pointer",
                  }}
                >
                  {status === "loading" ? "Sending..." : "Send Message"}
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Map embed */}
      <section style={{ height: isMobile ? 300 : 450 }}>
        <iframe
          title="The Royal Salon & Spa Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2918.857650402023!2d78.3677091!3d17.4638843!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb937acc3d7cd5%3A0xac4102eb56fa88e2!2sThe%20Royal%20Salon%20%26%20Spa!5e1!3m2!1sen!2sin!4v1776425855017!5m2!1sen!2sin"
          width="100%"
          height="100%"
          style={{
            border: 0,
            filter: "grayscale(100%) invert(90%) contrast(90%)",
          }}
          allowFullScreen
          loading="lazy"
        />
      </section>

      {/* FAQ */}
      <section
        style={{
          padding: isMobile ? "60px 20px" : "100px 60px",
          background: BLACK,
        }}
      >
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
              Common Questions
            </p>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: isMobile ? 32 : 48,
                fontWeight: 300,
                color: WHITE,
              }}
            >
              Frequently Asked <span className="gold-text">Questions</span>
            </h2>
          </div>
          {FAQ.map((item, i) => (
            <div
              key={i}
              style={{
                borderBottom: "1px solid rgba(201,168,76,0.1)",
                marginBottom: 4,
              }}
            >
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                style={{
                  width: "100%",
                  background: "none",
                  border: "none",
                  padding: "22px 0",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  textAlign: "left",
                  cursor: "pointer",
                }}
              >
                <span
                  style={{
                    fontSize: isMobile ? 14 : 16,
                    color: openFaq === i ? GOLD : WHITE,
                    fontWeight: 400,
                    transition: "color 0.3s",
                  }}
                >
                  {item.q}
                </span>
                <span
                  style={{
                    fontSize: 20,
                    color: GOLD,
                    flexShrink: 0,
                    marginLeft: 20,
                    transition: "transform 0.3s",
                    transform: openFaq === i ? "rotate(45deg)" : "rotate(0)",
                  }}
                >
                  +
                </span>
              </button>
              <div
                style={{
                  maxHeight: openFaq === i ? (isMobile ? 300 : 200) : 0,
                  overflow: "hidden",
                  transition: "max-height 0.4s ease",
                }}
              >
                <p
                  style={{
                    fontSize: 14,
                    color: MUTED,
                    lineHeight: 1.9,
                    paddingBottom: 20,
                  }}
                >
                  {item.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}
