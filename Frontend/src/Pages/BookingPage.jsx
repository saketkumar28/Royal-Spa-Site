// src/pages/BookingPage.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../Components/Header.jsx";
import Footer from "../Components/Footer.jsx";
import { bookingAPI, serviceAPI } from "../Services/api.js";
import {
  GOLD,
  GOLD_LIGHT,
  WHITE,
  MUTED,
  SURFACE,
  SURFACE2,
  BLACK,
  DANGER,
} from "../theme";

const ALL_SLOTS = [
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

const STEPS = ["Your Details", "Choose Service", "Date & Time", "Confirm"];

const STATIC_SERVICES = [
  {
    _id: "s1",
    name: "Royal Signature Facial",
    category: "Facial",
    duration: 90,
    price: 4500,
  },
  {
    _id: "s2",
    name: "Hot Stone Therapy",
    category: "Massage",
    duration: 75,
    price: 3800,
  },
  {
    _id: "s3",
    name: "Aromatherapy Massage",
    category: "Massage",
    duration: 60,
    price: 3200,
  },
  {
    _id: "s4",
    name: "Bridal Package",
    category: "Bridal",
    duration: 240,
    price: 18000,
  },
  {
    _id: "s5",
    name: "Hair Spa Ritual",
    category: "Hair",
    duration: 45,
    price: 2500,
  },
  {
    _id: "s6",
    name: "Gold Leaf Body Wrap",
    category: "Body",
    duration: 120,
    price: 7500,
  },
  {
    _id: "s7",
    name: "Deep Tissue Massage",
    category: "Massage",
    duration: 90,
    price: 4200,
  },
  {
    _id: "s8",
    name: "Hydra Glow Facial",
    category: "Facial",
    duration: 60,
    price: 3500,
  },
  {
    _id: "s9",
    name: "Keratin Hair Treatment",
    category: "Hair",
    duration: 120,
    price: 6500,
  },
];

export default function BookingPage() {
  const [step, setStep] = useState(0);
  const [services, setServices] = useState(STATIC_SERVICES);
  const [slots, setSlots] = useState(ALL_SLOTS);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    clientName: "",
    clientEmail: "",
    clientPhone: "",
    service: null,
    bookingDate: "",
    timeSlot: "",
    notes: "",
  });

  useEffect(() => {
    serviceAPI
      .getAll()
      .then((d) => {
        if (d.services?.length) setServices(d.services);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!form.bookingDate) {
      setSlots(ALL_SLOTS);
      return;
    }
    setLoadingSlots(true);
    bookingAPI
      .getAvailableSlots(form.bookingDate)
      .then((d) => setSlots(d.available || ALL_SLOTS))
      .catch(() => setSlots(ALL_SLOTS))
      .finally(() => setLoadingSlots(false));
  }, [form.bookingDate]);

  const set = (k, v) => {
    setForm((f) => ({ ...f, [k]: v }));
    setError("");
  };

  const validateStep = () => {
    if (step === 0) {
      if (!form.clientName.trim()) return "Please enter your name.";
      if (!form.clientEmail.trim() || !/\S+@\S+\.\S+/.test(form.clientEmail))
        return "Please enter a valid email.";
      if (!form.clientPhone.trim()) return "Please enter your phone number.";
    }
    if (step === 1 && !form.service) return "Please select a service.";
    if (step === 2) {
      if (!form.bookingDate) return "Please select a date.";
      if (!form.timeSlot) return "Please select a time slot.";
      const d = new Date(form.bookingDate);
      const t = new Date();
      t.setHours(0, 0, 0, 0);
      if (d < t) return "Please choose a future date.";
    }
    return null;
  };

  const next = () => {
    const err = validateStep();
    if (err) {
      setError(err);
      return;
    }
    setError("");
    setStep((s) => s + 1);
  };

  const submit = async () => {
    setSubmitting(true);
    setError("");
    try {
      await bookingAPI.create({ ...form, service: form.service._id });
      setSubmitted(true);
    } catch (e) {
      setError(e.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const today = new Date().toISOString().split("T")[0];

  if (submitted)
    return (
      <>
        <Header />
        <div
          style={{
            minHeight: "100vh",
            background: BLACK,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "120px 40px 80px",
            textAlign: "center",
          }}
        >
          <div style={{ maxWidth: 520 }}>
            <div style={{ fontSize: 56, color: GOLD, marginBottom: 32 }}>✦</div>
            <h1
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(32px, 5vw, 52px)",
                fontWeight: 300,
                color: WHITE,
                marginBottom: 20,
              }}
            >
              Reservation Confirmed
            </h1>
            <p
              style={{
                color: MUTED,
                fontSize: 15,
                lineHeight: 1.8,
                marginBottom: 8,
              }}
            >
              Thank you,{" "}
              <strong style={{ color: WHITE }}>{form.clientName}</strong>.
            </p>
            <p
              style={{
                color: MUTED,
                fontSize: 15,
                lineHeight: 1.8,
                marginBottom: 8,
              }}
            >
              Your <span style={{ color: GOLD }}>{form.service?.name}</span> is
              booked for{" "}
              {new Date(form.bookingDate).toLocaleDateString("en-IN", {
                weekday: "long",
                day: "numeric",
                month: "long",
              })}{" "}
              at {form.timeSlot}.
            </p>
            <p style={{ color: MUTED, fontSize: 14, marginBottom: 48 }}>
              A confirmation will be sent to{" "}
              <span style={{ color: WHITE }}>{form.clientEmail}</span>.
            </p>
            <div
              style={{
                display: "flex",
                gap: 16,
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <Link
                to="/"
                className="btn-solid"
                style={{ textDecoration: "none" }}
              >
                Back to Home
              </Link>
              <Link
                to="/services"
                className="btn-gold"
                style={{ textDecoration: "none" }}
              >
                Explore More Services
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );

  return (
    <>
      <Header />
      <div style={{ minHeight: "100vh", background: BLACK, paddingTop: 100 }}>
        {/* Progress bar */}
        <div
          style={{
            background: SURFACE,
            borderBottom: "1px solid rgba(201,168,76,0.1)",
            padding: "24px 60px",
          }}
        >
          <div
            style={{
              maxWidth: 700,
              margin: "0 auto",
              display: "flex",
              alignItems: "center",
              gap: 0,
            }}
          >
            {STEPS.map((s, i) => (
              <div
                key={i}
                style={{ flex: 1, display: "flex", alignItems: "center" }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 8,
                    flex: "0 0 auto",
                  }}
                >
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: "50%",
                      background: i <= step ? GOLD : "transparent",
                      border: `1px solid ${i <= step ? GOLD : "rgba(201,168,76,0.3)"}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 12,
                      color: i <= step ? BLACK : MUTED,
                      fontWeight: 500,
                      transition: "all 0.3s",
                    }}
                  >
                    {i < step ? "✓" : i + 1}
                  </div>
                  <span
                    style={{
                      fontSize: 10,
                      color: i <= step ? GOLD : MUTED,
                      letterSpacing: 1.5,
                      textTransform: "uppercase",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {s}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div
                    style={{
                      flex: 1,
                      height: 1,
                      background: i < step ? GOLD : "rgba(201,168,76,0.2)",
                      margin: "0 12px",
                      marginBottom: 20,
                      transition: "background 0.4s",
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step content */}
        <div style={{ maxWidth: 700, margin: "0 auto", padding: "60px 40px" }}>
          {/* Step 0: Details */}
          {step === 0 && (
            <div style={{ animation: "fadeUp 0.4s ease" }}>
              <h2
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(28px, 4vw, 44px)",
                  fontWeight: 300,
                  color: WHITE,
                  marginBottom: 8,
                }}
              >
                Your Details
              </h2>
              <p style={{ color: MUTED, marginBottom: 40 }}>
                Tell us a little about yourself so we can personalise your
                experience.
              </p>
              <div
                style={{ display: "flex", flexDirection: "column", gap: 16 }}
              >
                <input
                  placeholder="Full Name *"
                  value={form.clientName}
                  onChange={(e) => set("clientName", e.target.value)}
                />
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 16,
                  }}
                >
                  <input
                    type="email"
                    placeholder="Email Address *"
                    value={form.clientEmail}
                    onChange={(e) => set("clientEmail", e.target.value)}
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number *"
                    value={form.clientPhone}
                    onChange={(e) => set("clientPhone", e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 1: Service */}
          {step === 1 && (
            <div style={{ animation: "fadeUp 0.4s ease" }}>
              <h2
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(28px, 4vw, 44px)",
                  fontWeight: 300,
                  color: WHITE,
                  marginBottom: 8,
                }}
              >
                Choose Your Service
              </h2>
              <p style={{ color: MUTED, marginBottom: 40 }}>
                Select the treatment you'd like to book.
              </p>
              <div
                style={{ display: "flex", flexDirection: "column", gap: 12 }}
              >
                {services.map((s) => (
                  <div
                    key={s._id}
                    onClick={() => set("service", s)}
                    style={{
                      padding: "20px 24px",
                      background:
                        form.service?._id === s._id
                          ? "rgba(201,168,76,0.08)"
                          : SURFACE,
                      border: `1px solid ${form.service?._id === s._id ? GOLD : "rgba(201,168,76,0.12)"}`,
                      cursor: "pointer",
                      transition: "all 0.3s",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div>
                      <p
                        style={{ fontSize: 16, color: WHITE, fontWeight: 400 }}
                      >
                        {s.name}
                      </p>
                      <p style={{ fontSize: 12, color: MUTED, marginTop: 4 }}>
                        {s.category} · {s.duration} min
                      </p>
                    </div>
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 16 }}
                    >
                      <span style={{ fontSize: 18, color: GOLD }}>
                        ₹{s.price?.toLocaleString()}
                      </span>
                      {form.service?._id === s._id && (
                        <span style={{ color: GOLD, fontSize: 20 }}>✓</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Date & Time */}
          {step === 2 && (
            <div style={{ animation: "fadeUp 0.4s ease" }}>
              <h2
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(28px, 4vw, 44px)",
                  fontWeight: 300,
                  color: WHITE,
                  marginBottom: 8,
                }}
              >
                Date & Time
              </h2>
              <p style={{ color: MUTED, marginBottom: 40 }}>
                Choose when you'd like to come in.
              </p>
              <div
                style={{ display: "flex", flexDirection: "column", gap: 20 }}
              >
                <input
                  type="date"
                  min={today}
                  value={form.bookingDate}
                  onChange={(e) => set("bookingDate", e.target.value)}
                  style={{ colorScheme: "dark" }}
                />
                {form.bookingDate && (
                  <>
                    <p
                      style={{
                        fontSize: 12,
                        letterSpacing: 2,
                        color: GOLD,
                        textTransform: "uppercase",
                      }}
                    >
                      {loadingSlots
                        ? "Checking availability..."
                        : `${slots.length} slots available`}
                    </p>
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(3, 1fr)",
                        gap: 10,
                      }}
                    >
                      {ALL_SLOTS.map((t) => {
                        const available = slots.includes(t);
                        const selected = form.timeSlot === t;
                        return (
                          <button
                            key={t}
                            onClick={() => available && set("timeSlot", t)}
                            style={{
                              padding: "14px 8px",
                              fontSize: 13,
                              background: selected ? GOLD : "transparent",
                              border: `1px solid ${selected ? GOLD : available ? "rgba(201,168,76,0.3)" : "rgba(201,168,76,0.08)"}`,
                              color: selected
                                ? BLACK
                                : available
                                  ? WHITE
                                  : MUTED,
                              cursor: available ? "pointer" : "not-allowed",
                              opacity: available ? 1 : 0.4,
                              transition: "all 0.2s",
                              textDecoration: !available
                                ? "line-through"
                                : "none",
                            }}
                          >
                            {t}
                          </button>
                        );
                      })}
                    </div>
                  </>
                )}
                <textarea
                  placeholder="Special requests or notes (optional)"
                  rows={3}
                  value={form.notes}
                  onChange={(e) => set("notes", e.target.value)}
                />
              </div>
            </div>
          )}

          {/* Step 3: Confirm */}
          {step === 3 && (
            <div style={{ animation: "fadeUp 0.4s ease" }}>
              <h2
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(28px, 4vw, 44px)",
                  fontWeight: 300,
                  color: WHITE,
                  marginBottom: 8,
                }}
              >
                Confirm Your Booking
              </h2>
              <p style={{ color: MUTED, marginBottom: 40 }}>
                Please review your details before confirming.
              </p>
              <div
                style={{
                  background: SURFACE,
                  border: "1px solid rgba(201,168,76,0.2)",
                  padding: "36px",
                }}
              >
                {[
                  {
                    label: "Client",
                    value: `${form.clientName} · ${form.clientEmail} · ${form.clientPhone}`,
                  },
                  { label: "Service", value: form.service?.name },
                  {
                    label: "Duration",
                    value: `${form.service?.duration} minutes`,
                  },
                  {
                    label: "Date",
                    value: new Date(form.bookingDate).toLocaleDateString(
                      "en-IN",
                      {
                        weekday: "long",
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      },
                    ),
                  },
                  { label: "Time", value: form.timeSlot },
                  {
                    label: "Amount",
                    value: `₹${form.service?.price?.toLocaleString()}`,
                  },
                  ...(form.notes
                    ? [{ label: "Notes", value: form.notes }]
                    : []),
                ].map((row, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      gap: 24,
                      padding: "16px 0",
                      borderBottom: "1px solid rgba(201,168,76,0.08)",
                    }}
                  >
                    <span
                      style={{
                        fontSize: 11,
                        letterSpacing: 2,
                        color: GOLD,
                        textTransform: "uppercase",
                        minWidth: 80,
                      }}
                    >
                      {row.label}
                    </span>
                    <span style={{ fontSize: 14, color: WHITE }}>
                      {row.value}
                    </span>
                  </div>
                ))}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingTop: 24,
                  }}
                >
                  <span style={{ fontSize: 13, color: MUTED }}>
                    Total Amount
                  </span>
                  <span
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: 32,
                      color: GOLD,
                      fontWeight: 300,
                    }}
                  >
                    ₹{form.service?.price?.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Error */}
          {error && (
            <p style={{ color: DANGER, fontSize: 13, marginTop: 20 }}>
              {error}
            </p>
          )}

          {/* Navigation */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 40,
            }}
          >
            {step > 0 ? (
              <button
                onClick={() => {
                  setStep((s) => s - 1);
                  setError("");
                }}
                className="btn-gold"
              >
                ← Back
              </button>
            ) : (
              <div />
            )}
            {step < STEPS.length - 1 ? (
              <button onClick={next} className="btn-solid">
                Continue →
              </button>
            ) : (
              <button
                onClick={submit}
                disabled={submitting}
                className="btn-solid"
                style={{
                  opacity: submitting ? 0.7 : 1,
                  cursor: submitting ? "wait" : "pointer",
                }}
              >
                {submitting ? "Confirming..." : "Confirm Booking"}
              </button>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
