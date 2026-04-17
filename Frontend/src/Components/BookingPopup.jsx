import { useState, useEffect } from "react";

export default function BookingPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState("idle");

  const scriptUrl =
    "https://script.google.com/macros/s/AKfycbzUBpTyL1mn9MD0y6-cC82KkFnGHrnWgMTlJcEBsZ8-qK3WxgYzim4SfnIgNag7eGnT/exec";

  // Auto-show the popup ONCE when the website first loads
  useEffect(() => {
    const timer = setTimeout(() => setIsOpen(true), 3000);
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
      // Reset the form and close the modal after 3 seconds
      setTimeout(() => {
        setIsOpen(false);
        setStatus("idle");
        e.target.reset(); // Clears the form so it's fresh for the next booking
      }, 3000);
    } catch (error) {
      console.error("Submission failed", error);
      setStatus("idle");
    }
  };

  return (
    <>
      {/* 1. The Persistent Floating Button */}
      <button onClick={() => setIsOpen(true)} style={styles.floatingBtn}>
        Book Now
      </button>

      {/* 2. The Modal (Only renders if isOpen is true) */}
      {isOpen && (
        <div style={styles.overlay}>
          <div style={styles.modal}>
            <button style={styles.closeBtn} onClick={() => setIsOpen(false)}>
              ✕
            </button>

            <h2 style={{ color: "#C9A84C", marginBottom: "5px" }}>
              Book Your Session
            </h2>
            <p
              style={{ color: "#aaa", marginBottom: "20px", fontSize: "14px" }}
            >
              Experience luxury at The Royal Saloon & Spa
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
                  <option value="Classic Massage">Classic Massage</option>
                  <option value="Signature Massage">Signature Massage</option>
                  <option value="Women's 60 Min Offer - 2999">
                    Women's 60 Min Offer - ₹2,999
                  </option>
                  <option value="Special 90 Min Package - 3999">
                    Special 90 Min Package - ₹3,999
                  </option>
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
      )}
    </>
  );
}

const styles = {
  // New Floating Button Style
  floatingBtn: {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    backgroundColor: "#C9A84C",
    color: "black",
    padding: "15px 25px",
    borderRadius: "50px",
    border: "none",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    zIndex: 9998,
    boxShadow: "0 4px 10px rgba(0,0,0,0.5)",
  },
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
