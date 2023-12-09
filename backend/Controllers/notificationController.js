const Notification = require('../Models/Notification');

exports.addNotification = async (req, res) => {
  // const {content, username, role} = req.body;

  const newNotification = await Notification.create(req.body);

  res.status(201).json({
    status: 'success. notification sent.',
    newNotification,
  });
};

exports.getNotificationsByUsername = async (req, res) => {
  const username = req.params.username;
  //   console.log(username);
  const notifications = await Notification.find({ receiver: username });

  res.status(200).json({
    status: 'success. notifications retrieved.',
    notifications,
  });
};
