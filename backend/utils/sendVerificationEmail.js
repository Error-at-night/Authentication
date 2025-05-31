const sendEmail = require("./sendEmail")

const sendVerificationEmail = async ({ fullName, email, verificationCode }) => {
  const message = `Please confirm your email by entering this verification code ${verificationCode}.
    This code will expire in 5 minutes
  `
  return sendEmail({
    to: email,
    subject: "Email Confirmation",
    html: `<h4>Hello ${fullName}</h4>
      ${message}
    `
  })
}

module.exports = sendVerificationEmail