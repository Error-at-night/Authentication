const sendEmail = require('./sendEmail');

const sendResetPassswordEmail = async ({ fullName, email, token, origin }) => {
  const resetURL = `${origin}/reset-password/${token}`;
  const message = `<p>Please reset password by clicking on the following link : 
    <a href="${resetURL}">Reset Password</a></p>
    <p>This link will expire in 10 minutes</p>
  `;

  return sendEmail({
    to: email,
    subject: 'Reset Password',
    html: `<h4>Hello, ${fullName}</h4>
   ${message}
   `,
  });
};

module.exports = sendResetPassswordEmail;
