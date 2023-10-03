const randomNumber = (maxNumber = 5) => {
  return Math.round(Math.random() * maxNumber);
};

const randomPassword = () => {
  return Math.random().toString(36).slice(-8);
};

module.exports = {
  randomNumber,
  randomPassword,
};
