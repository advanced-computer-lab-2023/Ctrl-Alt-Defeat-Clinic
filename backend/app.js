const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const connectToMongoDB = require('./DBConfig.js');
const port = process.env.PORT || 4000;

const app = express();

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

const patientRouter = require('./Routes/patientRoutes.js');
const doctorRouter = require('./Routes/doctorRoutes.js');
const adminRoutes = require('./Routes/adminRoutes');
const appointmentRouter = require('./Routes/appointmentRoutes.js');
const packageRouter = require('./Routes/packageRoutes');
const authRouter = require('./Routes/authRoutes');
const chatRouter = require('./Routes/chatRoutes');
const notificationRouter = require('./Routes/notificationRoutes');

app.use('/api/v1/patients', patientRouter);
app.use('/api/v1/doctors', doctorRouter);
app.use('/api/v1/admins', adminRoutes);
app.use('/api/v1/appointments', appointmentRouter);
app.use('/api/v1/packages', packageRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/chats', chatRouter);
app.use('/api/v1/notifications', notificationRouter);

connectToMongoDB();
const server = app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:5173',
  },
});

io.on('connection', socket => {
  console.log('Connected to socket. congrats');
  socket.on('setup', userData => {
    console.log('setup completed. congrats');
    socket.join(userData);
    socket.emit('connected');
  });

  socket.on('join chat', room => {
    socket.join(room.chat);
    console.log(room.username + ' Joined chat with id: ' + room.chat);
  });
  // socket.on("typing", (room) => socket.in(room).emit("typing"));
  // socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.on('new message', newMessageRecieved => {
    if (newMessageRecieved.msg.sender === newMessageRecieved.loggedIn) return;
    socket.in(newMessageRecieved.msg.chat).emit('message recieved', newMessageRecieved.msg);
    console.log('Message Recieved: ' + newMessageRecieved.msg.content);
  });
});
