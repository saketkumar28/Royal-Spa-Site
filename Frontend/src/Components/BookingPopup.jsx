import { useState, useEffect } from "react";

export default function BookingPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState("idle");

  const scriptUrl =
    "https://script.google.com/macros/s/AKfycbzUBpTyL1mn9MD0y6-cC82KkFnGHrnWgMTlJcEBsZ8-qK3WxgYzim4SfnIgNag7eGnT/exec";

  // Auto-show the popup ONCE after 8 seconds (less intrusive)
  useEffect(() => {
    const shown = sessionStorage.getItem("bookingPopupShown");
    if (shown) return;
    const timer = setTimeout(() => {
      setIsOpen(true);
      sessionStorage.setItem("bookingPopupShown", "1");
    }, 8000);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
      await fetch(scriptUrl, {
        method: "POST",
        body: JSON.stringify(data),
        mode: "no-cors",
      });
      setStatus("success");
      setTimeout(() => {
        setIsOpen(false);
        setStatus("idle");
        e.target.reset();
      }, 3000);
    } catch (error) {
      console.error("Submission failed", error);
      setStatus("idle");
    }
  };

  // Only render the modal — no floating button (header already has Book Now)
  if (!isOpen) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <button
          style={styles.closeBtn}
          onClick={() => setIsOpen(false)}
          aria-label="Close"
        >
          ✕
        </button>

        <h2 style={{ color: "#C9A84C", marginBottom: "5px" }}>
          Book Your Session
        </h2>
        <p style={{ color: "#aaa", marginBottom: "20px", fontSize: "14px" }}>
          Experience luxury at The Royal Saloon &amp; Spa
        </p>

        {status === "success" ? (
          <div style={{ color: "#4CAF50", padding: "20px 0" }}>
            Booking request sent! We will call you shortly.
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={styles.form}>
            <input
              required
              name="name"
              type="text"
              placeholder="Your Name"
              style={styles.input}
            />
            <input
              required
              name="phone"
              type="tel"
              placeholder="Phone Number"
              style={styles.input}
            />

            <select required name="service" style={styles.input}>
              <option value="">Select a Service...</option>
              <optgroup label="Classic Massages">
                <option value="Head Massage - ₹500">Head Massage — ₹500</option>
                <option value="Foot Massage - ₹700">Foot Massage — ₹700</option>
                <option value="Legs and Hands Massage - ₹1000">
                  Legs and Hands Massage — ₹1,000
                </option>
                <option value="Back Massage - ₹1000">
                  Back Massage — ₹1,000
                </option>
                <option value="Basic Massage - ₹1500">
                  Basic Massage — ₹1,500
                </option>
              </optgroup>
              <optgroup label="Signature Massages">
                <option value="Normal Cream Massage">
                  Normal Cream Massage
                </option>
                <option value="Swedish Massage">Swedish Massage</option>
                <option value="Aroma Massage">Aroma Massage</option>
                <option value="Thai Massage">Thai Massage</option>
                <option value="Bellyness Massage">Bellyness Massage</option>
                <option value="Deep Tissue Massage">Deep Tissue Massage</option>
              </optgroup>
              <optgroup label="Body Polish">
                <option value="Body Polish (45 min) - ₹2500">
                  Body Polish 45 min — ₹2,500
                </option>
                <option value="Body Polish (60 min) - ₹3000">
                  Body Polish 60 min — ₹3,000
                </option>
                <option value="Body Polish (90 min) - ₹3500">
                  Body Polish 90 min — ₹3,500
                </option>
                <option value="Body Polish (120 min) - ₹4500">
                  Body Polish 120 min — ₹4,500
                </option>
              </optgroup>
              <optgroup label="Special Offers">
                <option value="Women's Special 60 Min - ₹2999">
                  Women's Special 60 Min — ₹2,999
                </option>
                <option value="Special Package 90 Min - ₹3999">
                  Special Package 90 Min — ₹3,999
                </option>
              </optgroup>
            </select>

            <input required name="date" type="date" style={styles.input} />

            <button
              type="submit"
              disabled={status === "submitting"}
              style={styles.submitBtn}
            >
              {status === "submitting" ? "Sending..." : "Request Booking"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.8)",
    zIndex: 9999,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  modal: {
    backgroundColor: "#0A0A0A",
    padding: "30px",
    borderRadius: "8px",
    border: "1px solid #C9A84C",
    width: "90%",
    maxWidth: "400px",
    position: "relative",
    textAlign: "center",
    color: "white",
    maxHeight: "90vh",
    overflowY: "auto",
  },
  closeBtn: {
    position: "absolute",
    top: "10px",
    right: "15px",
    background: "none",
    border: "none",
    color: "#C9A84C",
    fontSize: "20px",
    cursor: "pointer",
  },
  form: { display: "flex", flexDirection: "column", gap: "15px" },
  input: {
    padding: "12px",
    borderRadius: "4px",
    border: "1px solid #333",
    backgroundColor: "#1A1A1A",
    color: "white",
    fontSize: "16px",
  },
  submitBtn: {
    padding: "12px",
    backgroundColor: "#C9A84C",
    color: "black",
    border: "none",
    borderRadius: "4px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    marginTop: "10px",
  },
};
