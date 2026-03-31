import { useState, useEffect } from "react";
import { bookingAPI, serviceAPI } from "./src/Services/api.js";

// Design tokens (import from your shared theme file in real project)
const GOLD = "#C9A84C";
const GOLD_LIGHT = "#E8C97A";
const BLACK = "#0A0A0A";
const SURFACE2 = "#1A1A1A";
const WHITE = "#F5F0E8";
const MUTED = "#9A9080";
const DANGER = "#E05050";

export default function BookingSection() {
  const [services, setServices] = useState([]);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    clientName: "",
    clientEmail: "",
    clientPhone: "",
    service: "",
    bookingDate: "",
    timeSlot: "",
    notes: "",
  });

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

  // Load services on mount
  useEffect(() => {
    serviceAPI
      .getAll()
      .then((data) => setServices(data.services || []))
      .catch(() => {
        // Fallback static data if API not available
        setServices([
          { _id: "s1", name: "Royal Signature Facial" },
          { _id: "s2", name: "Hot Stone Therapy" },
          { _id: "s3", name: "Aromatherapy Massage" },
          { _id: "s4", name: "Bridal Package" },
          { _id: "s5", name: "Hair Spa Ritual" },
          { _id: "s6", name: "Gold Leaf Body Wrap" },
        ]);
      });
  }, []);

  // Fetch available slots when date changes
  useEffect(() => {
    if (!form.bookingDate) {
      setAvailableSlots(ALL_SLOTS);
      return;
    }

    setLoadingSlots(true);
    bookingAPI
      .getAvailableSlots(form.bookingDate)
      .then((data) => {
        setAvailableSlots(data.available || ALL_SLOTS);
        // If currently selected slot is no longer available, reset it
        if (form.timeSlot && !data.available.includes(form.timeSlot)) {
          setForm((f) => ({ ...f, timeSlot: "" }));
        }
      })
      .catch(() => setAvailableSlots(ALL_SLOTS))
      .finally(() => setLoadingSlots(false));
  }, [form.bookingDate]);

  const update = (key, value) => {
    setForm((f) => ({ ...f, [key]: value }));
    setError("");
  };

  const validate = () => {
    if (!form.clientName.trim()) return "Please enter your name.";
    if (!form.clientEmail.trim() || !/\S+@\S+\.\S+/.test(form.clientEmail))
      return "Please enter a valid email.";
    if (!form.clientPhone.trim()) return "Please enter your phone number.";
    if (!form.service) return "Please select a service.";
    if (!form.bookingDate) return "Please select a date.";
    if (!form.timeSlot) return "Please select a time slot.";

    const selected = new Date(form.bookingDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selected < today) return "Please choose a future date.";

    return null;
  };

  const handleSubmit = async () => {
    const err = validate();
    if (err) {
      setError(err);
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      await bookingAPI.create(form);
      setSubmitted(true);
    } catch (e) {
      setError(e.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setForm({
      clientName: "",
      clientEmail: "",
      clientPhone: "",
      service: "",
      bookingDate: "",
      timeSlot: "",
      notes: "",
    });
    setSubmitted(false);
    setError("");
  };

  // Minimum date = today
  const today = new Date().toISOString().split("T")[0];

  return (
    <section id="booking" style={{ padding: "100px 60px", background: BLACK }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <p
            style={{
              fontSize: 11,
              letterSpacing: 5,
              textTransform: "uppercase",
              color: GOLD,
              fontWeight: 400,
              marginBottom: 16,
            }}
          >
            Reserve Your Ritual
          </p>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              margin: "0 auto 32px",
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
              fontFamily: "Cormorant Garamond, serif",
              fontSize: "clamp(36px, 5vw, 60px)",
              fontWeight: 300,
              color: WHITE,
            }}
          >
            Book Your{" "}
            <span
              style={{
                background: `linear-gradient(135deg, #8B6914, ${GOLD}, ${GOLD_LIGHT}, ${GOLD})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Royal Experience
            </span>
          </h2>
        </div>

        {submitted ? (
          /* ── Success State ───────────────────────────────────────── */
          <div
            style={{
              textAlign: "center",
              padding: "80px 40px",
              border: `1px solid rgba(201,168,76,0.3)`,
              animation: "fadeIn 0.6s ease",
            }}
          >
            <div style={{ fontSize: 48, color: GOLD, marginBottom: 24 }}>✦</div>
            <h3
              style={{
                fontFamily: "Cormorant Garamond, serif",
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
                margin: "0 auto 12px",
              }}
            >
              Thank you,{" "}
              <strong style={{ color: WHITE }}>{form.clientName}</strong>. Your{" "}
              <span style={{ color: GOLD }}>
                {services.find((s) => s._id === form.service)?.name ||
                  "session"}
              </span>{" "}
              is reserved for{" "}
              {new Date(form.bookingDate).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}{" "}
              at {form.timeSlot}.
            </p>
            <p style={{ color: MUTED, fontSize: 14, marginBottom: 36 }}>
              A confirmation will be sent to{" "}
              <span style={{ color: WHITE }}>{form.clientEmail}</span>.
            </p>
            <button
              onClick={resetForm}
              style={{
                background: "transparent",
                border: `1px solid ${GOLD}`,
                color: GOLD,
                padding: "14px 40px",
                fontFamily: "Jost, sans-serif",
                fontSize: 12,
                letterSpacing: 3,
                textTransform: "uppercase",
                cursor: "pointer",
              }}
            >
              Book Another
            </button>
          </div>
        ) : (
          /* ── Booking Form ─────────────────────────────────────────── */
          <div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 16,
              }}
            >
              {/* Full name */}
              <div style={{ gridColumn: "1 / -1" }}>
                <input
                  type="text"
                  placeholder="Full Name *"
                  value={form.clientName}
                  onChange={(e) => update("clientName", e.target.value)}
                  style={{
                    background: SURFACE2,
                    border: "1px solid rgba(201,168,76,0.25)",
                    color: WHITE,
                    padding: "14px 18px",
                    fontFamily: "Jost, sans-serif",
                    fontSize: 14,
                    fontWeight: 300,
                    width: "100%",
                    outline: "none",
                  }}
                />
              </div>

              {/* Email */}
              <input
                type="email"
                placeholder="Email Address *"
                value={form.clientEmail}
                onChange={(e) => update("clientEmail", e.target.value)}
                style={{
                  background: SURFACE2,
                  border: "1px solid rgba(201,168,76,0.25)",
                  color: WHITE,
                  padding: "14px 18px",
                  fontFamily: "Jost, sans-serif",
                  fontSize: 14,
                  fontWeight: 300,
                  width: "100%",
                  outline: "none",
                }}
              />

              {/* Phone */}
              <input
                type="tel"
                placeholder="Phone Number *"
                value={form.clientPhone}
                onChange={(e) => update("clientPhone", e.target.value)}
                style={{
                  background: SURFACE2,
                  border: "1px solid rgba(201,168,76,0.25)",
                  color: WHITE,
                  padding: "14px 18px",
                  fontFamily: "Jost, sans-serif",
                  fontSize: 14,
                  fontWeight: 300,
                  width: "100%",
                  outline: "none",
                }}
              />

              {/* Service */}
              <select
                value={form.service}
                onChange={(e) => update("service", e.target.value)}
                style={{
                  background: SURFACE2,
                  border: "1px solid rgba(201,168,76,0.25)",
                  color: form.service ? WHITE : MUTED,
                  padding: "14px 18px",
                  fontFamily: "Jost, sans-serif",
                  fontSize: 14,
                  fontWeight: 300,
                  width: "100%",
                  outline: "none",
                }}
              >
                <option value="" disabled>
                  Select Service *
                </option>
                {services.map((s) => (
                  <option key={s._id} value={s._id}>
                    {s.name}
                  </option>
                ))}
              </select>

              {/* Date */}
              <input
                type="date"
                min={today}
                value={form.bookingDate}
                onChange={(e) => update("bookingDate", e.target.value)}
                style={{
                  background: SURFACE2,
                  border: "1px solid rgba(201,168,76,0.25)",
                  color: WHITE,
                  padding: "14px 18px",
                  fontFamily: "Jost, sans-serif",
                  fontSize: 14,
                  fontWeight: 300,
                  width: "100%",
                  outline: "none",
                  colorScheme: "dark",
                }}
              />

              {/* Time slot */}
              <select
                value={form.timeSlot}
                onChange={(e) => update("timeSlot", e.target.value)}
                disabled={loadingSlots || !form.bookingDate}
                style={{
                  background: SURFACE2,
                  border: "1px solid rgba(201,168,76,0.25)",
                  color: form.timeSlot ? WHITE : MUTED,
                  padding: "14px 18px",
                  fontFamily: "Jost, sans-serif",
                  fontSize: 14,
                  fontWeight: 300,
                  width: "100%",
                  outline: "none",
                  opacity: loadingSlots || !form.bookingDate ? 0.5 : 1,
                }}
              >
                <option value="" disabled>
                  {loadingSlots
                    ? "Checking availability..."
                    : !form.bookingDate
                      ? "Select date first"
                      : "Select Time *"}
                </option>
                {availableSlots.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>

              {/* Notes */}
              <div style={{ gridColumn: "1 / -1" }}>
                <textarea
                  placeholder="Special requests or notes..."
                  rows={4}
                  value={form.notes}
                  onChange={(e) => update("notes", e.target.value)}
                  style={{
                    background: SURFACE2,
                    border: "1px solid rgba(201,168,76,0.25)",
                    color: WHITE,
                    padding: "14px 18px",
                    fontFamily: "Jost, sans-serif",
                    fontSize: 14,
                    fontWeight: 300,
                    width: "100%",
                    outline: "none",
                    resize: "vertical",
                  }}
                />
              </div>

              {/* Error */}
              {error && (
                <div
                  style={{
                    gridColumn: "1 / -1",
                    padding: "12px 16px",
                    background: "rgba(224,80,80,0.1)",
                    border: "1px solid rgba(224,80,80,0.3)",
                  }}
                >
                  <p style={{ color: DANGER, fontSize: 13 }}>{error}</p>
                </div>
              )}

              {/* Submit */}
              <div
                style={{
                  gridColumn: "1 / -1",
                  textAlign: "center",
                  marginTop: 16,
                }}
              >
                <button
                  onClick={handleSubmit}
                  disabled={submitting}
                  style={{
                    background: GOLD,
                    border: `1px solid ${GOLD}`,
                    color: BLACK,
                    padding: "14px 40px",
                    fontFamily: "Jost, sans-serif",
                    fontSize: 12,
                    fontWeight: 500,
                    letterSpacing: 3,
                    textTransform: "uppercase",
                    cursor: submitting ? "not-allowed" : "pointer",
                    opacity: submitting ? 0.7 : 1,
                    transition: "all 0.3s",
                  }}
                >
                  {submitting ? "Confirming..." : "Confirm Reservation"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
