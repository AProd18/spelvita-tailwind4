import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_FROM,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false, // ✅ dodaj OVO
  },
});

export const sendVerificationEmail = async (email, token) => {
  const verificationUrl = `${process.env.NEXTAUTH_URL}/verify-email?token=${token}`;
  console.log("NEXTAUTH_URL:", process.env.NEXTAUTH_URL);

  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: email,
    subject: "Verify your email",
    html: `
      <h1>Verify Your Email</h1>
      <p>Click below to verify your email address:</p>
      <a href="${verificationUrl}">${verificationUrl}</a>
    `,
  });
};
