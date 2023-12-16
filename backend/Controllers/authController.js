const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Admin = require('../Models/Admin');
const Patient = require('../Models/Patient');
const Doctor = require('../Models/Doctor');
const sendEmail = require('../Utils/email');

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
      message: 'Missing fields',
    });
    return;
  }

  if (!user || !(await bcrypt.compare(password, user.password))) {
    res.status(404).json({
      status: 'failed',
      message: 'Incorrect username or password',
    });
    return;
  }
  this.sendToken(user, role, res);
};

// for testing purposes not a requirement
exports.getMe = async (req, res) => {
  let user;
  if (req.role === 'doctor') {
    // console.log('find');
    user = await Doctor.findById(req.user._id).populate('registeredPatients');
  }
  // console.log(user);
  res.status(200).json({
    loggedIn: req.role === 'doctor' ? user : req.user,
  });
};

exports.logout = (req, res) => {
  res.clearCookie('jwt');
  res.status(200).json({ status: 'logged out successfully' });
};

exports.forgotPassword = async (req, res) => {
  const { user } = await findByUsername(req.body.username);
  console.log(user);
  if (!user) {
    return res.status(404).json({ status: 'failed' });
  }

  const resetURL = `http://localhost:5173/verifyOTP?username=${req.body.username}`;
  const otp = Math.floor(1000 + Math.random() * 9000);

  user.otp = otp + '';
  await user.save();
  const message = `this is your OTP to be used when resetting your password: \n ${otp}.
  \n you can reset your password through the following link: ${resetURL}`;

  try {
    await sendEmail({
      email: user.email,
      subject: 'reset password with OTP',
      message,
    });

    res.status(200).json({
      status: 'success',
      message: 'otp sent to email!',
    });
  } catch (err) {
    res.status(400).json({ status: 'error', message: err.message });
    await user.save({ validateBeforeSave: false });
    return;
  }
};

exports.verifyOTP = async (req, res) => {
  const otp = req.body.otp;
  const username = req.params.username;

  const { user } = await findByUsername(username);

  if (!user || !user.otp === otp) {
    return;
  }

  res.status(200).json({
    status: 'success',
    message: 'otp verified successfully',
  });
};

exports.resetPassword = async (req, res) => {
  const username = req.params.username;

  const { user } = await findByUsername(username);

  if (!user) {
    return res.status(401).json({ status: 'error', message: 'err' });
  }

  user.password = req.body.password;
  user.otp = undefined;

  await user.save();

  res.status(200).json({
    status: 'success',
    message: 'password reset successfully',
  });
};

exports.changePassword = async (req, res) => {
  const { user } = await findByUsername(req.user.username);

  const currentPassword = req.body.currentPassword;
  const newPassword = req.body.newPassword;

  if (!(await bcrypt.compare(currentPassword, req.user.password))) {
    res.status(400).json({ status: 'error' });
    return;
  }

  user.password = newPassword;
  await user.save();
  res.status(200).json({ status: 'success' });
};
