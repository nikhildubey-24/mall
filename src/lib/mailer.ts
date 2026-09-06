import nodemailer from "nodemailer";

const SMTP_HOST = process.env.SMTP_HOST || "smtp.gmail.com";
const SMTP_PORT = Number(process.env.SMTP_PORT || 465);
const SMTP_USER = process.env.SMTP_USER || "";
const SMTP_APP_PASSWORD = process.env.SMTP_APP_PASSWORD || "";
const SMTP_FROM = process.env.SMTP_FROM || SMTP_USER;
const SMTP_TO = process.env.SMTP_TO || SMTP_USER;

export type EnquiryEmailData = {
  name: string;
  phone: string;
  email?: string | null;
  interestedIn: string;
  contactMethod: string;
  message?: string | null;
};

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: SMTP_PORT === 465,
  auth: {
    user: SMTP_USER,
    pass: SMTP_APP_PASSWORD,
  },
});

export async function sendEnquiryEmail(data: EnquiryEmailData): Promise<void> {
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

  await transporter.sendMail({
    from: SMTP_FROM,
    to: SMTP_TO,
    subject: `New Enquiry from ${data.name} — Acropolis The Mall`,
    text: lines.join("\n"),
  });
}