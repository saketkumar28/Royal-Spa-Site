// src/pages/MembershipsPage.jsx
import { useState, useEffect } from "react";
import Header from "../Components/Header.jsx";
import Footer from "../Components/Footer.jsx";
import PageHero from "../Components/PageHero.jsx";
import { Link } from "react-router-dom";
import { GOLD, WHITE, MUTED, SURFACE, SURFACE2, BLACK } from "../theme";

const MEMBERSHIPS = [
  {
    type: "Silver",
    amount: "10,000",
    coupons: 9,
    validity: "6 Months",
    description: "Ideal for the seasonal wellness seeker.",
    accent: "rgba(192, 192, 192, 0.1)", // Silver-ish tint
  },
  {
    type: "Gold",
    amount: "15,000",
    coupons: 13,
    validity: "12 Months",
    description: "Our most popular annual sanctuary pass.",
    popular: true,
    accent: "rgba(201, 168, 76, 0.15)",
  },
  {
    type: "Platinum",
    amount: "25,000",
    coupons: 25,
    validity: "18 Months",
    description: "Deeply committed to a lifestyle of serenity.",
    accent: "rgba(229, 228, 226, 0.1)", // Platinum-ish tint
  },
  {
    type: "Diamond",
    amount: "40,000",
    coupons: 50,
    validity: "24 Months",
    description: "The ultimate royal experience for connoisseurs.",
    accent: "rgba(185, 242, 255, 0.05)", // Diamond-ish tint
  },
];

export default function MembershipsPage() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 992);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <Header />

      <PageHero
        label="Exclusive Access"
        title="Royal"
        highlight="Memberships"
        subtitle="Secure your sanctuary with our tiered membership programs, designed for those who prioritize frequent rejuvenation."
      />

      {/* Membership Tiers Grid */}
      <section
        style={{
          padding: isMobile ? "60px 20px" : "100px 60px",
          background: BLACK,
        }}
      >
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile
                ? "1fr"
                : "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 30,
              alignItems: "stretch",
            }}
          >
            {MEMBERSHIPS.map((plan, i) => (
              <div
                key={i}
                style={{
                  background: SURFACE2,
                  border: plan.popular
                    ? `1px solid ${GOLD}`
                    : "1px solid rgba(201, 168, 76, 0.12)",
                  padding: "60px 40px",
                  textAlign: "center",
                  position: "relative",
                  transition: "transform 0.3s ease",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                {plan.popular && (
                  <span
                    style={{
                      position: "absolute",
                      top: 0,
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      background: GOLD,
                      color: BLACK,
                      padding: "4px 16px",
                      fontSize: 10,
                      letterSpacing: 2,
                      textTransform: "uppercase",
                      fontWeight: "bold",
                    }}
                  >
                    Recommended
                  </span>
                )}

                <div>
                  <h3
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: 32,
                      color: GOLD,
                      marginBottom: 10,
                      fontWeight: 300,
                    }}
                  >
                    {plan.type}
                  </h3>
                  <p
                    style={{
                      color: MUTED,
                      fontSize: 13,
                      marginBottom: 30,
                      minHeight: 40,
                    }}
                  >
                    {plan.description}
                  </p>

                  <div style={{ marginBottom: 40 }}>
                    <span
                      style={{
                        fontSize: 14,
                        color: MUTED,
                        verticalAlign: "super",
                      }}
                    >
                      ₹
                    </span>
                    <span
                      style={{ fontSize: 48, color: WHITE, fontWeight: 300 }}
                    >
                      {plan.amount}
                    </span>
                  </div>

                  <div style={{ textAlign: "left", marginBottom: 40 }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: 16,
                        borderBottom: "1px solid rgba(255,255,255,0.05)",
                        paddingBottom: 12,
                      }}
                    >
                      <span style={{ color: MUTED, fontSize: 13 }}>
                        Service Coupons
                      </span>
                      <span style={{ color: WHITE, fontWeight: "bold" }}>
                        {plan.coupons}
                      </span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: 16,
                        borderBottom: "1px solid rgba(255,255,255,0.05)",
                        paddingBottom: 12,
                      }}
                    >
                      <span style={{ color: MUTED, fontSize: 13 }}>
                        Validity Period
                      </span>
                      <span style={{ color: WHITE }}>{plan.validity}</span>
                    </div>
                  </div>
                </div>

                <Link
                  to="/contact"
                  className={plan.popular ? "btn-solid" : "btn-gold"}
                  style={{
                    textDecoration: "none",
                    display: "block",
                    textAlign: "center",
                  }}
                >
                  Join Now
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Terms & Conditions Section */}
      <section
        style={{
          padding: isMobile ? "60px 20px" : "80px 60px",
          background: SURFACE,
          borderTop: "1px solid rgba(201, 168, 76, 0.1)",
        }}
      >
        <div className="container" style={{ maxWidth: 800 }}>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 32,
              color: WHITE,
              marginBottom: 30,
              textAlign: "center",
            }}
          >
            Membership <span className="gold-text">Policy</span>
          </h2>

          <div style={{ display: "grid", gap: 20 }}>
            <p style={{ color: MUTED, fontSize: 14, lineHeight: 1.8 }}>
              • All memberships are <strong>non-transferable</strong> and
              strictly limited to one individual[cite: 46].
            </p>
            <p style={{ color: MUTED, fontSize: 14, lineHeight: 1.8 }}>
              • Prior appointment is mandatory. We request you arrive 15 minutes
              before your scheduled time[cite: 42].
            </p>
            <p style={{ color: MUTED, fontSize: 14, lineHeight: 1.8 }}>
              • A maximum delay of 15 minutes is allowed; beyond this, the
              appointment is auto-cancelled and a coupon is deducted[cite: 43].
            </p>
            <p style={{ color: MUTED, fontSize: 14, lineHeight: 1.8 }}>
              • Cancellations must be communicated at least 1 hour in advance to
              avoid penalty[cite: 44].
            </p>
            <p style={{ color: MUTED, fontSize: 14, lineHeight: 1.8 }}>
              • Management is not responsible for loss or damage to personal
              belongings; please use the lockers provided[cite: 47].
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
