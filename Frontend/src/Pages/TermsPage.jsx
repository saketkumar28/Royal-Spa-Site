// src/pages/TermsPage.jsx
import Header from "../Components/Header.jsx";
import Footer from "../Components/Footer.jsx";
import { GOLD, WHITE, MUTED, BLACK } from "../theme";

export default function TermsPage() {
  const sections = [
    {
      title: "Appointments & Booking",
      body: `All treatments at The Royal Saloon & Spa require a prior appointment. Walk-ins are accommodated subject to therapist availability. We recommend booking in advance to secure your preferred time.`,
    },
    {
      title: "Arrival & Punctuality",
      body: `Please arrive at least 15 minutes before your scheduled appointment time. A maximum delay of 15 minutes is permitted. If you arrive more than 15 minutes late, your appointment may be cancelled and one coupon (if applicable) will be deducted. We appreciate your punctuality as it ensures the best experience for all guests.`,
    },
    {
      title: "Cancellation Policy",
      body: `Please inform us at least 1 hour in advance if you need to cancel or reschedule your appointment. Cancellations made less than 1 hour before the scheduled time may result in a coupon deduction for membership holders. We understand emergencies arise — please contact us and we will do our best to assist.`,
    },
    {
      title: "Health & Safety",
      body: `For your safety and the safety of our therapists, please inform us of any skin disease, infection, allergy, pregnancy, or medical condition before your service begins. Certain treatments may not be suitable for all guests. The Royal Saloon & Spa reserves the right to decline or modify a service if it may pose a risk to the guest or therapist.`,
    },
    {
      title: "Memberships",
      body: `Memberships are strictly non-transferable and are valid for a single individual only. One membership per person is permitted. Membership validity and coupon details are as outlined in your membership plan. Service charges and government taxes are applicable as per prevailing guidelines. Expired memberships cannot be extended or refunded.`,
    },
    {
      title: "Valuables & Liability",
      body: `The management is not responsible for the loss of or damage to personal belongings. Please use the locker facility provided for all valuables during your treatment. We strongly advise against bringing expensive jewellery or large amounts of cash.`,
    },
    {
      title: "Pricing & Taxes",
      body: `All prices displayed are in Indian Rupees (₹). Service charges and government taxes (GST) are applicable in addition to the stated treatment prices and will be reflected in your final bill.`,
    },
    {
      title: "Gift Vouchers",
      body: `Gift vouchers are non-refundable and cannot be exchanged for cash. They are valid for the period stated on the voucher. Lost or stolen gift vouchers will not be replaced.`,
    },
    {
      title: "Code of Conduct",
      body: `We are committed to providing a safe, respectful, and luxurious environment for all guests and staff. Any inappropriate behaviour — verbal or physical — will result in immediate termination of the service without refund, and the guest will be asked to leave the premises.`,
    },
    {
      title: "Contact Us",
      body: `The Royal Saloon & Spa\nKothaguda, Hyderabad – 500081\nPhone / WhatsApp: +91 9392211285\nOpen Daily: 10:00 AM – 9:00 PM`,
    },
  ];

  return (
    <>
      <Header />
      <div
        style={{ background: "#0A0A0A", minHeight: "100vh", paddingTop: 100 }}
      >
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
            Terms of Service
          </h1>
          <p
            style={{
              color: MUTED,
              fontSize: 14,
              maxWidth: 480,
              lineHeight: 1.8,
            }}
          >
            Effective date: January 1, 2025. By booking with us you agree to
            these terms.
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
