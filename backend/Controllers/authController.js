const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Admin = require('../Models/Admin');
const Patient = require('../Models/Patient');
const Doctor = require('../Models/Doctor');

const findByUsername = async username => {
  let user;

  user = await Admin.findOne({ username });
  if (user) return { user, role: 'admin' };

  user = await Patient.findOne({ username });
  if (user) return { user, role: 'patient' };

  user = await Doctor.findOne({ username });
  if (user) return { user, role: 'doctor' };

  return {};
};

exports.generateToken = (id, role) => {
  return jwt.sign({ id: id, role: role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN * 24 * 60 * 60 * 1000,
  });
};

exports.sendToken = (user, role, res) => {
  const token = this.generateToken(user._id, role);
  const cookieOptions = {
    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };

  res.cookie('jwt', token, cookieOptions);
  res.status(200).json({
    status: `success`,
    role,
    token,
    user,
  });
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  const { user, role } = await findByUsername(username);

  if (!username || !password) {
    res.status(401).json({
      status: 'failed',
      message: 'missing fields',
    });
    return;
  }

  if (!user || !(await bcrypt.compare(password, user.password))) {
    res.status(404).json({
      status: 'failed',
      message: !user ? 'this user does not exist' : 'incorrect username or password',
    });
    return;
  }
  this.sendToken(user, role, res);
};

// for testing purposes not a requirement
exports.getMe = async (req, res) => {
  res.status(200).json({
    loggedIn: req.user,
  });
};

exports.logout = (req, res) => {
  res.clearCookie('jwt');
  res.status(200).json({ status: 'logged out successfully' });
};

exports.forgotPassword = (req, res) => {};

exports.resetPassword = (req, res) => {};
