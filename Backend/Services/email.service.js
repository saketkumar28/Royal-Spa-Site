// backend/services/email.service.js
const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // This MUST be true for port 465
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const brandHeader = `
  <div style="background:#0A0A0A;padding:32px 40px;border-bottom:1px solid rgba(201,168,76,0.3);">
    <p style="font-size:10px;letter-spacing:6px;color:#C9A84C;text-transform:uppercase;margin:0 0 4px;">The Royal</p>
    <h1 style="font-family:Georgia,serif;font-size:24px;color:#F5F0E8;font-weight:300;margin:0;letter-spacing:3px;">Salon & Spa</h1>
  </div>
`;

const brandFooter = `
  <div style="background:#111;padding:24px 40px;border-top:1px solid rgba(201,168,76,0.15);text-align:center;">
    <p style="font-size:12px;color:#9A9080;margin:0;">12A Park Street, Kolkata · +91 98765 43210 · info@theroyalspa.in</p>
    <p style="font-size:11px;color:#555;margin:8px 0 0;">© 2026 The Royal Salon & Spa</p>
  </div>
`;

// Booking confirmation to client
async function sendBookingConfirmation({
  clientName,
  clientEmail,
  serviceName,
  bookingDate,
  timeSlot,
  totalAmount,
}) {
  //if (!process.env.EMAIL_USER) return;

  const dateStr = new Date(bookingDate).toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const html = `
    <div style="background:#0A0A0A;font-family:Arial,sans-serif;max-width:580px;margin:0 auto;">
      ${brandHeader}
      <div style="padding:48px 40px;background:#111;">
        <h2 style="font-family:Georgia,serif;font-size:28px;font-weight:300;color:#F5F0E8;margin:0 0 8px;">Reservation Confirmed ✦</h2>
        <p style="color:#9A9080;font-size:14px;margin:0 0 32px;">We look forward to welcoming you.</p>

        <div style="border:1px solid rgba(201,168,76,0.2);padding:28px;">
          ${[
            ["Client", clientName],
            ["Service", serviceName],
            ["Date", dateStr],
            ["Time", timeSlot],
            ["Amount", `₹${totalAmount?.toLocaleString()}`],
          ]
            .map(
              ([label, val]) => `
            <div style="display:flex;justify-content:space-between;padding:12px 0;border-bottom:1px solid rgba(201,168,76,0.08);">
              <span style="font-size:11px;letter-spacing:2px;color:#C9A84C;text-transform:uppercase;">${label}</span>
              <span style="font-size:14px;color:#F5F0E8;">${val}</span>
            </div>
          `,
            )
            .join("")}
        </div>

        <div style="margin-top:32px;padding:24px;background:#1A1A1A;border-left:2px solid #C9A84C;">
          <p style="font-family:Georgia,serif;font-style:italic;font-size:16px;color:#F5F0E8;margin:0 0 8px;">A few reminders:</p>
          <ul style="color:#9A9080;font-size:13px;line-height:1.9;padding-left:20px;margin:0;">
            <li>Please arrive 10–15 minutes early</li>
            <li>Robes, slippers and towels are provided</li>
            <li>For cancellations, please notify us 24 hours in advance</li>
          </ul>
        </div>

        <p style="margin-top:32px;font-size:13px;color:#9A9080;line-height:1.8;">
          Questions? Call us at <span style="color:#C9A84C;">+91 98765 43210</span> or reply to this email.
        </p>
      </div>
      ${brandFooter}
    </div>
  `;

  try {
    const info = await transporter.sendMail({
      from: `"The Royal Salon & Spa" <${process.env.EMAIL_USER}>`,
      to: clientEmail,
      subject: `✦ Booking Confirmed — ${serviceName} on ${dateStr}`,
      html,
    });
    console.log("✅ Email sent successfully: ", info.response);
  } catch (error) {
    console.error("❌ FAILED to send email: ", error);
  }
}

// New booking notification to admin
// New booking notification to admin
async function sendAdminNotification({
  clientName,
  clientEmail,
  clientPhone,
  serviceName,
  bookingDate,
  timeSlot,
}) {
  if (!process.env.EMAIL_USER) return;

  const dateStr = new Date(bookingDate).toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  try {
    await transporter.sendMail({
      from: `"Booking System" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: `New Booking: ${serviceName} — ${dateStr} at ${timeSlot}`,
      html: `
        <div style="font-family:Arial,sans-serif;padding:20px;">
          <h2>New Booking Received</h2>
          <table style="border-collapse:collapse;width:100%;">
            ${[
              ["Client", clientName],
              ["Email", clientEmail],
              ["Phone", clientPhone],
              ["Service", serviceName],
              ["Date", dateStr],
              ["Time", timeSlot],
            ]
              .map(
                ([l, v]) =>
                  `<tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">${l}</td><td style="padding:8px;border:1px solid #ddd;">${v}</td></tr>`,
              )
              .join("")}
          </table>
          <p style="margin-top:16px;"><a href="${process.env.FRONTEND_URL}/admin">View in Admin Dashboard →</a></p>
        </div>
      `,
    });
    console.log("👑 Admin notification sent");
  } catch (error) {
    console.error("❌ FAILED to send admin email: ", error.message);
  }
}
module.exports = { sendBookingConfirmation, sendAdminNotification };
