// Backend/services/email.service.js
// Uses Resend (HTTPS API) instead of SMTP — works on Render free tier

const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL =
  process.env.FROM_EMAIL || "The Royal Salon & Spa <onboarding@resend.dev>";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@theroyalspa.in";

// ─── BRAND TEMPLATE ───────────────────────────────────────────────────────────
const brandWrap = (content) => `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width"></head>
<body style="margin:0;padding:0;background:#0A0A0A;font-family:Arial,sans-serif;">
  <div style="max-width:580px;margin:0 auto;background:#0A0A0A;">

    <!-- Header -->
    <div style="padding:28px 36px;border-bottom:1px solid rgba(201,168,76,0.3);">
      <p style="font-size:9px;letter-spacing:6px;color:#C9A84C;text-transform:uppercase;margin:0 0 4px;">The Royal</p>
      <h1 style="font-family:Georgia,serif;font-size:22px;color:#F5F0E8;font-weight:300;margin:0;letter-spacing:3px;">Salon & Spa</h1>
    </div>

    <!-- Content -->
    <div style="padding:40px 36px;background:#111111;">
      ${content}
    </div>

    <!-- Footer -->
    <div style="padding:20px 36px;border-top:1px solid rgba(201,168,76,0.15);text-align:center;background:#0A0A0A;">
      <p style="font-size:12px;color:#9A9080;margin:0 0 4px;">12A Park Street, Kolkata &nbsp;·&nbsp; +91 98765 43210 &nbsp;·&nbsp; info@theroyalspa.in</p>
      <p style="font-size:11px;color:#555;margin:0;">© 2026 The Royal Salon & Spa. All rights reserved.</p>
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
  if (!process.env.RESEND_API_KEY) {
    console.warn("⚠️  RESEND_API_KEY not set — skipping confirmation email");
    return;
  }

  const dateStr = new Date(bookingDate).toLocaleDateString("en-IN", {
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

    <!-- Booking details table -->
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

    <!-- Reminders -->
    <div style="padding:20px 24px;background:#1A1A1A;border-left:2px solid #C9A84C;margin-bottom:28px;">
      <p style="font-family:Georgia,serif;font-style:italic;font-size:15px;color:#F5F0E8;margin:0 0 10px;">
        A few reminders:
      </p>
      <ul style="color:#9A9080;font-size:13px;line-height:1.9;padding-left:18px;margin:0;">
        <li>Please arrive 10–15 minutes before your appointment</li>
        <li>Robes, slippers and towels are provided</li>
        <li>Cancellations require 24 hours notice</li>
      </ul>
    </div>

    <p style="font-size:13px;color:#9A9080;line-height:1.8;margin:0;">
      Questions? Call us at <span style="color:#C9A84C;">+91 98765 43210</span> 
      or reply to this email.
    </p>
  `;

  try {
    const result = await resend.emails.send({
      from: FROM_EMAIL,
      to: clientEmail,
      subject: `✦ Booking Confirmed — ${serviceName} on ${dateStr}`,
      html: brandWrap(content),
    });
    console.log(
      "✅ Confirmation email sent to",
      clientEmail,
      "| ID:",
      result.data?.id,
    );
    return result;
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

  const dateStr = new Date(bookingDate).toLocaleDateString("en-IN", {
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
    await resend.emails.send({
      from: FROM_EMAIL,
      to: ADMIN_EMAIL,
      subject: `New Booking: ${serviceName} — ${dateStr} at ${timeSlot}`,
      html: brandWrap(content),
    });
    console.log("✅ Admin notification sent");
  } catch (err) {
    console.error("❌ FAILED to send admin notification:", err.message);
  }
}

module.exports = { sendBookingConfirmation, sendAdminNotification };
