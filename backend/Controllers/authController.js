const jwt = require('jsonwebtoken');

exports.generateToken = (id, role) => {
  return jwt.sign({ id: id, role: role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.login = (req, res) => {};

exports.logout = (req, res) => {};

exports.forgotPassword = (req, res) => {};

exports.resetPassword = (req, res) => {};
