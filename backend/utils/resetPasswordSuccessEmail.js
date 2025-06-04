const sendEmail = require('./sendEmail');

const resetPasswordSuccessEmail = async ({ fullName, email }) => {
  const message = `<p>Your password has been reset</p>`

  return sendEmail({
    to: email,
    subject: 'Reset Password Successful',
    html: `<h4>Hello, ${fullName}</h4>
   ${message}
   `,
  });
};

module.exports = resetPasswordSuccessEmail;
