// src/pages/ContactPage.jsx
import { useState } from "react";
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
    value: "12A, Park Street, Kolkata - 700016, West Bengal",
  },
  { icon: "✦", label: "Phone", value: "+91 98765 43210 · +91 33 4000 1234" },
  {
    icon: "❋",
    label: "Email",
    value: "info@theroyalspa.in · bookings@theroyalspa.in",
  },
  {
    icon: "◈",
    label: "Hours",
    value:
      "Monday – Sunday: 10:00 AM – 8:00 PM\nAll Major Holidays: 11:00 AM – 6:00 PM",
  },
];

const FAQ = [
  {
    q: "How far in advance should I book?",
    a: "We recommend booking at least 3–5 days in advance for weekday appointments and 1–2 weeks for weekends. Bridal packages should be booked 2–4 months ahead.",
  },
  {
    q: "Do I need to arrive early?",
    a: "Please arrive 10–15 minutes before your appointment to complete your wellness consultation form and enjoy our welcome tea ritual.",
  },
  {
    q: "What should I wear?",
    a: "We provide complimentary robes, slippers, and towels. Wear comfortable clothing you can easily change out of. Remove jewellery before your treatment.",
  },
  {
    q: "Can I request a specific therapist?",
    a: "Absolutely. We encourage you to note your preferred therapist in the booking form. We'll do our best to accommodate your request, subject to availability.",
  },
  {
    q: "What is your cancellation policy?",
    a: "We require 24 hours notice for cancellation or rescheduling. Late cancellations or no-shows may be charged 50% of the treatment cost.",
  },
  {
    q: "Do you offer gift vouchers?",
    a: "Yes! Our luxury gift vouchers are available in any denomination and can be redeemed for any service. They make the perfect thoughtful gift. Contact us to purchase.",
  },
];

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState(null); // null | 'loading' | 'success' | 'error'
  const [openFaq, setOpenFaq] = useState(null);

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
      <section className="section" style={{ background: SURFACE }}>
        <div
          className="container"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.6fr",
            gap: 80,
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
                fontSize: "clamp(28px, 3vw, 42px)",
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
              padding: "48px 44px",
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
                    gridTemplateColumns: "1fr 1fr",
                    gap: 16,
                  }}
                >
                  <input
                    placeholder="Full Name *"
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                  />
                  <input
                    type="email"
                    placeholder="Email Address *"
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                  />
                </div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 16,
                  }}
                >
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={form.phone}
                    onChange={(e) => update("phone", e.target.value)}
                  />
                  <select
                    value={form.subject}
                    onChange={(e) => update("subject", e.target.value)}
                    style={{ color: form.subject ? WHITE : MUTED }}
                  >
                    <option value="">Subject</option>
                    {[
                      "General Inquiry",
                      "Booking Query",
                      "Bridal Package",
                      "Corporate Booking",
                      "Gift Voucher",
                      "Feedback",
                      "Other",
                    ].map((o) => (
                      <option key={o}>{o}</option>
                    ))}
                  </select>
                </div>
                <textarea
                  placeholder="Your message *"
                  rows={5}
                  value={form.message}
                  onChange={(e) => update("message", e.target.value)}
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
      <section style={{ height: 420 }}>
        <iframe
          title="The Royal Salon & Spa Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3684.3!2d88.3476!3d22.5571!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjLCsDMzJzI1LjYiTiA4OMKwMjAnNTEuNCJF!5e0!3m2!1sen!2sin!4v1700000000000"
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
      <section className="section" style={{ background: BLACK }}>
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
                fontSize: "clamp(28px, 4vw, 48px)",
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
                    fontSize: 16,
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
                  maxHeight: openFaq === i ? 200 : 0,
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
