const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, "shubham", {
    expiresIn: "30d",
  });
};

module.exports = generateToken;
