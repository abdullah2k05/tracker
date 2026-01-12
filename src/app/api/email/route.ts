
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const { type, data } = await request.json();

    if (!type || !data) {
      return NextResponse.json({ error: "Missing type or data" }, { status: 400 });
    }

    // Check availability of credentials
    const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, ADMIN_EMAIL } = process.env;
    
    // Mock Mode: If no credentials, just log and return success
    if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
      console.log(`[MOCK EMAIL] To: ${ADMIN_EMAIL || "Admin"} | Type: ${type} | Data:`, data);
      return NextResponse.json({ message: "Mock email logged (no credentials)" }, { status: 200 });
    }

    // Real Mode: Send email
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    });

    let subject = "";
    let html = "";
    const timestamp = new Date().toLocaleString();

    if (type === "mood") {
      subject = `Wellness Tracker: New Mood Log - ${data.mood}`;
      html = `
        <div style="font-family: sans-serif; padding: 20px; color: #444;">
          <h2 style="color: #ff6b81;">New Mood Logged 💕</h2>
          <p><strong>Mood:</strong> ${data.mood} (Emoji: ${data.emoji})</p>
          <p><strong>Time:</strong> ${timestamp}</p>
        </div>
      `;
    } else if (type === "gratitude") {
      subject = `Wellness Tracker: New Gratitude Entry`;
      html = `
        <div style="font-family: sans-serif; padding: 20px; color: #444;">
          <h2 style="color: #a29bfe;">New Gratitude Entry 🌸</h2>
          <p><strong>Entry:</strong> "${data.text}"</p>
          <p><strong>Time:</strong> ${timestamp}</p>
        </div>
      `;
    } else {
       return NextResponse.json({ error: "Invalid type" }, { status: 400 });
    }

    await transporter.sendMail({
      from: `"Wellness Tracker" <${SMTP_USER}>`,
      to: ADMIN_EMAIL || SMTP_USER,
      subject,
      html,
    });

    return NextResponse.json({ message: "Email sent successfully" }, { status: 200 });

  } catch (error) {
    console.error("Email API Error:", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
