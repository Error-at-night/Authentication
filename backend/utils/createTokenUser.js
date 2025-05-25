const createTokenUser = (user) => {
  return { fullName: user.fullName, userId: user._id, email: user.email };
};

module.exports = createTokenUser;
