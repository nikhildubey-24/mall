import nodemailer from "nodemailer";

export type EnquiryEmailData = {
  name: string;
  phone: string;
  email?: string | null;
  interestedIn: string;
  contactMethod: string;
  message?: string | null;
};

function getSmtpConfig() {
  return {
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: Number(process.env.SMTP_PORT || 465),
    user: process.env.SMTP_USER || "",
    appPassword: process.env.SMTP_APP_PASSWORD || "",
    from: process.env.SMTP_FROM || process.env.SMTP_USER || "",
    to: process.env.SMTP_TO || process.env.SMTP_USER || "",
  };
}

export async function sendEnquiryEmail(data: EnquiryEmailData): Promise<void> {
  const { host, port, user, appPassword, from, to } = getSmtpConfig();

  if (!user || !appPassword || !to) {
    console.error(
      "[mailer] SMTP not configured. Set SMTP_USER, SMTP_APP_PASSWORD and SMTP_TO."
    );
    return;
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass: appPassword },
    connectionTimeout: 15_000,
    greetingTimeout: 15_000,
    socketTimeout: 20_000,
  });

  const lines = [
    `New enquiry received via the Acropolis The Mall website.`,
    ``,
    `Name: ${data.name}`,
    `Phone: ${data.phone}`,
    data.email ? `Email: ${data.email}` : null,
    `Interested In: ${data.interestedIn}`,
    `Preferred Contact Method: ${data.contactMethod}`,
    data.message ? `Message: ${data.message}` : null,
  ].filter((line): line is string => line !== null);

  try {
    await transporter.sendMail({
      from,
      to,
      subject: `New Enquiry from ${data.name} — Acropolis The Mall`,
      text: lines.join("\n"),
    });
  } catch (error) {
    console.error("[mailer] Failed to send enquiry email:", error);
    throw error;
  }
}