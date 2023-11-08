const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const { promisify } = require('util');
const Admin = require('../Models/Admin');
const Patient = require('../Models/Patient');
const Doctor = require('../Models/Doctor');

const findByUsername = async username => {
  let user;

  user = await Admin.findOne({ username });
  if (user) return { user, role: 'Admin' };

  user = await Patient.findOne({ username });
  if (user) return { user, role: 'Patient' };

  user = await Doctor.findOne({ username });
  if (user) return { user, role: 'doctor' };

  return null;
};

const findUserById = async id => {
  let user;

  user = await Admin.findById(id);
  if (user) return user;

  user = await Patient.findById(id);
  if (user) return user;

  user = await Doctor.findById(id);
  if (user) return user;

  return null;
};

exports.generateToken = (id, role) => {
  return jwt.sign({ id: id, role: role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.sendToken = (id, role, res) => {
  const token = this.generateToken(id, role);
  console.log(id);
  const cookieOptions = {
    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };

  res.cookie('jwt', token, cookieOptions);
  res.status(200).json({
    status: `success. welcome ${role}`,
    token,
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

  const validated = await bcrypt.compare(password, user.password);

  if (!user || !validated) {
    res.status(404).json({
      status: 'failed',
      message: !user ? 'this user does not exist' : 'incorrect username or password',
    });
    return;
  }

  this.sendToken(user._id, role, res);
  // console.log(req.cookies.jwt.id);
};

// for testing purposes not a requirement
exports.getMe = async (req, res) => {
  // console.log(req.cookies.jwt);
  const decoded = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRET);
  const loggedIn = await findUserById(decoded.id);

  res.status(200).json({
    loggedIn,
  });
};

exports.logout = (req, res) => {
  res.cookie('jwt', null, {
    expires: new Date(Date.now() + 1000),
    httpOnly: true,
  });
  res.status(200).json({ status: 'success' });
};

exports.forgotPassword = (req, res) => {};

exports.resetPassword = (req, res) => {};
