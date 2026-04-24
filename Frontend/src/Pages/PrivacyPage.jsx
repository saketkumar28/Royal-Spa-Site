// src/pages/PrivacyPage.jsx
import Header from "../Components/Header.jsx";
import Footer from "../Components/Footer.jsx";
import { GOLD, WHITE, MUTED, BLACK, SURFACE } from "../theme";

export default function PrivacyPage() {
  const sections = [
    {
      title: "Information We Collect",
      body: `When you book an appointment or contact us, we collect your name, phone number, email address, and any notes you provide about your treatment preferences or health conditions. We collect only what is necessary to deliver your service.`,
    },
    {
      title: "How We Use Your Information",
      body: `Your information is used solely to confirm and manage your appointment, contact you regarding your booking, and send you relevant updates about our services or offers if you have opted in. We do not use your data for unrelated marketing.`,
    },
    {
      title: "Data Sharing",
      body: `We do not sell, trade, or rent your personal information to third parties. Your details are shared only with the therapists directly involved in your service, and only to the extent necessary.`,
    },
    {
      title: "Data Retention",
      body: `Booking records are retained for a period necessary for service delivery and legal compliance. You may request deletion of your personal data at any time by contacting us directly.`,
    },
    {
      title: "Cookies",
      body: `Our website may use essential cookies to ensure functionality. We do not use tracking or advertising cookies. You can disable cookies in your browser settings without affecting your ability to use the site.`,
    },
    {
      title: "Your Rights",
      body: `You have the right to access, correct, or delete your personal data held by us. To exercise these rights, please contact us at the details below. We will respond within 7 business days.`,
    },
    {
      title: "Contact Us",
      body: `The Royal Saloon & Spa\nKothaguda, Hyderabad – 500081\nPhone / WhatsApp: +91 9392211285\nInstagram: @theroyalsalonandspa_hyd`,
    },
    {
      title: "Policy Updates",
      body: `We may update this Privacy Policy from time to time. Any changes will be reflected on this page with the revised effective date. Continued use of our services after changes constitutes acceptance of the updated policy.`,
    },
  ];

  return (
    <>
      <Header />
      <div style={{ background: BLACK, minHeight: "100vh", paddingTop: 100 }}>
        {/* Hero */}
        <div
          className="page-hero"
          style={{ paddingBottom: 60, paddingTop: 120 }}
        >
          <span className="section-label">Legal</span>
          <h1
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(36px, 6vw, 64px)",
              fontWeight: 300,
              color: WHITE,
              letterSpacing: 3,
              marginBottom: 16,
            }}
          >
            Privacy Policy
          </h1>
          <p
            style={{
              color: MUTED,
              fontSize: 14,
              maxWidth: 480,
              lineHeight: 1.8,
            }}
          >
            Effective date: January 1, 2025. Your privacy matters to us.
          </p>
        </div>

        {/* Content */}
        <div
          style={{
            maxWidth: 820,
            margin: "0 auto",
            padding: "60px 40px 100px",
          }}
        >
          {sections.map((s, i) => (
            <div
              key={i}
              style={{
                marginBottom: 48,
                paddingBottom: 48,
                borderBottom:
                  i < sections.length - 1
                    ? "1px solid rgba(201,168,76,0.08)"
                    : "none",
              }}
            >
              <h2
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 24,
                  fontWeight: 400,
                  color: GOLD,
                  marginBottom: 16,
                  letterSpacing: 1,
                }}
              >
                {i + 1}. {s.title}
              </h2>
              <p
                style={{
                  fontSize: 15,
                  color: MUTED,
                  lineHeight: 1.9,
                  whiteSpace: "pre-line",
                }}
              >
                {s.body}
              </p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
