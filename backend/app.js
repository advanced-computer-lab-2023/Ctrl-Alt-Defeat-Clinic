const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const connectToMongoDB = require('./DBConfig.js');
const port = process.env.PORT || 4000;

const app = express();

app.use(cors({ origin: '*', credentials: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

const patientRouter = require('./Routes/patientRoutes.js');
const doctorRouter = require('./Routes/doctorRoutes.js');
const adminRoutes = require('./Routes/adminRoutes');
const appointmentRouter = require('./Routes/appointmentRoutes.js');
const packageRouter = require('./Routes/packageRoutes');
const authRouter = require('./Routes/authRoutes');

app.use('/api/v1/patients', patientRouter);
app.use('/api/v1/doctors', doctorRouter);
app.use('/api/v1/admins', adminRoutes);
app.use('/api/v1/appointments', appointmentRouter);
app.use('/api/v1/packages', packageRouter);
app.use('/api/v1/auth', authRouter);

connectToMongoDB();
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
