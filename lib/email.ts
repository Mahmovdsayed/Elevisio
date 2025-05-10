/**
 * The function `sendEmailService` sends an email using Nodemailer with specified parameters like
 * recipient, subject, message, and attachments.
 * @param  - The `sendEmailService` function is designed to send an email using Nodemailer. Here's an
 * explanation of the parameters it accepts:
 * @returns The `sendEmailService` function is returning a boolean value. It returns `true` if the
 * email was accepted for delivery (if `info.accepted.length` is greater than 0), otherwise it returns
 * `false`.
 */
import nodemailer from "nodemailer";

const sendEmailService = async ({
  to = "",
  subject = "no-reply",
  message = "<h1>no-message</h1>",
  attachments = [],
}) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    secure: true,
    requireTLS: true,
    tls: {
      rejectUnauthorized: true,
    },
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const info = await transporter.sendMail({
    from: `Elevisio  <${process.env.EMAIL}>`,
    to,
    subject,
    html: message,
    attachments,
  });

  return info.accepted.length ? true : false;
};

export default sendEmailService;
