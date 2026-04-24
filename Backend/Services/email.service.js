// Backend/Services/email.service.js
// Uses Resend (https://resend.com) to send transactional emails.
//
// FREE TIER RULES (important):
//   • You MUST use "onboarding@resend.dev" as the FROM address until you
//     verify your own domain in the Resend dashboard.
//   • On the free tier, emails can only be sent TO your own verified email
//     address. Add recipients in Resend → Audiences → Contacts, or upgrade.
//   • Once your domain (e.g. theroyalspa.in) is verified in Resend, change
//     FROM_EMAIL to: "The Royal Salon & Spa <noreply@theroyalspa.in>"
//
// REQUIRED ENV VARS:
//   RESEND_API_KEY   — from https://resend.com/api-keys
//   ADMIN_EMAIL      — where new-booking alerts go (must be verified on free tier)
//   FROM_EMAIL       — (optional) defaults to onboarding@resend.dev until domain verified
//   FRONTEND_URL     — your Vercel URL e.g. https://royal-salon-spa.vercel.app

const { Resend } = require("resend");

// Fail loudly at startup if key is missing — better than silent failures later
if (!process.env.RESEND_API_KEY) {
  console.warn(
    "⚠️  RESEND_API_KEY is not set. Emails will be skipped. " +
      "Add it to your .env or Railway/Render environment variables.",
  );
}

const resend = new Resend(process.env.RESEND_API_KEY || "");

// Use onboarding@resend.dev until you verify your own domain in Resend dashboard
const FROM_EMAIL =
  process.env.FROM_EMAIL || "The Royal Salon & Spa <onboarding@resend.dev>";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "";

// ─── HELPER: Format date string safely (no UTC timezone shift) ─────────────────
function formatDate(dateValue, options) {
  // If it's already a string like "2024-12-25", parse as local to avoid
  // UTC-midnight shifting one day behind in IST (UTC+5:30)
  let d;
  if (typeof dateValue === "string" && /^\d{4}-\d{2}-\d{2}$/.test(dateValue)) {
    const [y, m, day] = dateValue.split("-").map(Number);
    d = new Date(y, m - 1, day);
  } else {
    d = new Date(dateValue);
  }
  return d.toLocaleDateString("en-IN", options);
}

// ─── BRAND TEMPLATE ───────────────────────────────────────────────────────────
const brandWrap = (content) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
</head>
<body style="margin:0;padding:0;background:#0A0A0A;font-family:Arial,sans-serif;">
  <div style="max-width:580px;margin:0 auto;background:#0A0A0A;">

    <!-- Header -->
    <div style="padding:28px 36px;border-bottom:1px solid rgba(201,168,76,0.3);">
      <p style="font-size:9px;letter-spacing:6px;color:#C9A84C;text-transform:uppercase;margin:0 0 4px;">The Royal</p>
      <h1 style="font-family:Georgia,serif;font-size:22px;color:#F5F0E8;font-weight:300;margin:0;letter-spacing:3px;">Salon &amp; Spa</h1>
    </div>

    <!-- Content -->
    <div style="padding:40px 36px;background:#111111;">
      ${content}
    </div>

    <!-- Footer -->
    <div style="padding:20px 36px;border-top:1px solid rgba(201,168,76,0.15);text-align:center;background:#0A0A0A;">
      <p style="font-size:12px;color:#9A9080;margin:0 0 4px;">Kothaguda, Hyderabad &nbsp;·&nbsp; +91 93922 11285 &nbsp;·&nbsp; info@theroyalspa.in</p>
      <p style="font-size:11px;color:#555;margin:0;">© 2026 The Royal Salon &amp; Spa. All rights reserved.</p>
    </div>

  </div>
</body>
</html>
`;

// ─── BOOKING CONFIRMATION → CLIENT ────────────────────────────────────────────
async function sendBookingConfirmation({
  clientName,
  clientEmail,
  serviceName,
  bookingDate,
  timeSlot,
  totalAmount,
}) {
  if (!process.env.RESEND_API_KEY) return;
  if (!clientEmail) {
    console.warn(
      "⚠️  sendBookingConfirmation: no clientEmail provided, skipping.",
    );
    return;
  }

  const dateStr = formatDate(bookingDate, {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const rows = [
    ["Service", serviceName],
    ["Date", dateStr],
    ["Time", timeSlot],
    ["Amount", `₹${Number(totalAmount).toLocaleString("en-IN")}`],
  ];

  const content = `
    <h2 style="font-family:Georgia,serif;font-size:26px;font-weight:300;color:#F5F0E8;margin:0 0 6px;">
      Reservation Confirmed ✦
    </h2>
    <p style="color:#9A9080;font-size:14px;margin:0 0 28px;">
      Dear ${clientName}, we look forward to welcoming you.
    </p>

    <div style="border:1px solid rgba(201,168,76,0.25);padding:24px;margin-bottom:28px;">
      ${rows
        .map(
          ([label, val]) => `
        <div style="display:flex;justify-content:space-between;padding:11px 0;border-bottom:1px solid rgba(201,168,76,0.08);">
          <span style="font-size:10px;letter-spacing:2px;color:#C9A84C;text-transform:uppercase;">${label}</span>
          <span style="font-size:14px;color:#F5F0E8;">${val}</span>
        </div>
      `,
        )
        .join("")}
    </div>

    <div style="padding:20px 24px;background:#1A1A1A;border-left:2px solid #C9A84C;margin-bottom:28px;">
      <p style="font-family:Georgia,serif;font-style:italic;font-size:15px;color:#F5F0E8;margin:0 0 10px;">
        A few reminders:
      </p>
      <ul style="color:#9A9080;font-size:13px;line-height:1.9;padding-left:18px;margin:0;">
        <li>Please arrive 10–15 minutes before your appointment</li>
        <li>Robes, slippers and towels are provided</li>
        <li>Cancellations require at least 1 hour's notice</li>
        <li>Please inform therapists of any medical conditions beforehand</li>
      </ul>
    </div>

    <p style="font-size:13px;color:#9A9080;line-height:1.8;margin:0;">
      Questions? Call us at <span style="color:#C9A84C;">+91 93922 11285</span>
      or reply to this email.
    </p>
  `;

  try {
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: clientEmail,
      subject: `✦ Booking Confirmed — ${serviceName} on ${dateStr}`,
      html: brandWrap(content),
    });

    if (error) {
      console.error(
        "❌ Resend returned error (confirmation):",
        JSON.stringify(error),
      );
      return;
    }

    console.log(
      "✅ Confirmation email sent to",
      clientEmail,
      "| ID:",
      data?.id,
    );
    return data;
  } catch (err) {
    console.error("❌ FAILED to send confirmation email:", err.message);
    // Don't throw — booking should succeed even if email fails
  }
}

// ─── NEW BOOKING ALERT → ADMIN ────────────────────────────────────────────────
async function sendAdminNotification({
  clientName,
  clientEmail,
  clientPhone,
  serviceName,
  bookingDate,
  timeSlot,
}) {
  if (!process.env.RESEND_API_KEY) return;
  if (!ADMIN_EMAIL) {
    console.warn("⚠️  ADMIN_EMAIL not set — skipping admin notification.");
    return;
  }

  const dateStr = formatDate(bookingDate, {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const rows = [
    ["Client", clientName],
    ["Email", clientEmail],
    ["Phone", clientPhone],
    ["Service", serviceName],
    ["Date", dateStr],
    ["Time", timeSlot],
  ];

  const content = `
    <h2 style="font-family:Georgia,serif;font-size:24px;font-weight:300;color:#F5F0E8;margin:0 0 6px;">
      New Booking Received
    </h2>
    <p style="color:#9A9080;font-size:14px;margin:0 0 28px;">
      A new appointment has been booked. Review and confirm below.
    </p>

    <div style="border:1px solid rgba(201,168,76,0.25);padding:24px;margin-bottom:28px;">
      ${rows
        .map(
          ([label, val]) => `
        <div style="display:flex;justify-content:space-between;padding:11px 0;border-bottom:1px solid rgba(201,168,76,0.08);">
          <span style="font-size:10px;letter-spacing:2px;color:#C9A84C;text-transform:uppercase;">${label}</span>
          <span style="font-size:14px;color:#F5F0E8;">${val}</span>
        </div>
      `,
        )
        .join("")}
    </div>

    <a href="${process.env.FRONTEND_URL || "https://your-site.vercel.app"}/admin"
      style="display:inline-block;background:#C9A84C;color:#0A0A0A;padding:12px 28px;
             font-size:11px;letter-spacing:3px;text-transform:uppercase;text-decoration:none;font-weight:500;">
      View in Admin Dashboard →
    </a>
  `;

  try {
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: ADMIN_EMAIL,
      subject: `New Booking: ${serviceName} — ${dateStr} at ${timeSlot}`,
      html: brandWrap(content),
    });

    if (error) {
      console.error(
        "❌ Resend returned error (admin alert):",
        JSON.stringify(error),
      );
      return;
    }

    console.log("✅ Admin notification sent | ID:", data?.id);
    return data;
  } catch (err) {
    console.error("❌ FAILED to send admin notification:", err.message);
  }
}

// ─── CONTACT FORM MESSAGE → ADMIN ─────────────────────────────────────────────
async function sendContactMessage({ name, email, phone, subject, message }) {
  if (!process.env.RESEND_API_KEY) return;
  if (!ADMIN_EMAIL) {
    console.warn("⚠️  ADMIN_EMAIL not set — skipping contact notification.");
    return;
  }

  const content = `
    <h2 style="font-family:Georgia,serif;font-size:24px;font-weight:300;color:#F5F0E8;margin:0 0 6px;">
      New Contact Form Message
    </h2>
    <p style="color:#9A9080;font-size:14px;margin:0 0 28px;">
      Someone reached out via the website contact form.
    </p>

    <div style="border:1px solid rgba(201,168,76,0.25);padding:24px;margin-bottom:28px;">
      ${[
        ["Name", name],
        ["Email", email],
        ["Phone", phone || "—"],
        ["Subject", subject || "—"],
      ]
        .map(
          ([label, val]) => `
        <div style="display:flex;justify-content:space-between;padding:11px 0;border-bottom:1px solid rgba(201,168,76,0.08);">
          <span style="font-size:10px;letter-spacing:2px;color:#C9A84C;text-transform:uppercase;">${label}</span>
          <span style="font-size:14px;color:#F5F0E8;">${val}</span>
        </div>
      `,
        )
        .join("")}
    </div>

    <div style="padding:20px 24px;background:#1A1A1A;border-left:2px solid #C9A84C;">
      <p style="font-size:10px;letter-spacing:2px;color:#C9A84C;text-transform:uppercase;margin:0 0 10px;">Message</p>
      <p style="font-size:14px;color:#F5F0E8;line-height:1.8;margin:0;">${message.replace(/\n/g, "<br>")}</p>
    </div>
  `;

  try {
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: ADMIN_EMAIL,
      reply_to: email,
      subject: `Contact Form: ${subject || "New message"} — from ${name}`,
      html: brandWrap(content),
    });

    if (error) {
      console.error(
        "❌ Resend returned error (contact):",
        JSON.stringify(error),
      );
      return;
    }

    console.log("✅ Contact message forwarded to admin | ID:", data?.id);
    return data;
  } catch (err) {
    console.error("❌ FAILED to forward contact message:", err.message);
  }
}

module.exports = {
  sendBookingConfirmation,
  sendAdminNotification,
  sendContactMessage,
};
