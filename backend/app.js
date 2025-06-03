const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
mongoose.pluralize(null);
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser');
const fs = require('fs').promises;
const machineId = require('node-machine-id');

// ENV
require('dotenv/config');

// Static uploads
//app.use('/uploads', express.static('./public/uploads'));
app.use('/uploads', (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin");

  next();
}, express.static(path.join(__dirname, 'public/uploads')));

// Body & Cookie parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging
app.use(morgan('tiny'));
app.options('*', cors()); // handle preflight requests

// CORS: Allow localhost + Vercel
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://codespace-academy-hub.vercel.app'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization','x-auth-token']
}));

// License verification
const configPath = path.resolve(__dirname, 'helpers', 'config.json');
let machineID;
let license = "u3Y65£,;7Y#I";

machineId.machineId()
  .then(id => {
    machineID = id;
  })
  .catch(error => {
    console.error('Error getting machine ID:', error);
  });

app.use(async (req, res, next) => {
  try {
    const configData = await fs.readFile(configPath, 'utf-8');
    const config = JSON.parse(configData);
    const storedLicense = config.license;

    if (
      storedLicense.licenseCode === license &&
      storedLicense.deviceId === machineID
    ) {
      console.log('✅ Valid license');
      next();
    } else {
      console.error('❌ Invalid license info. Bypassing in production.');
      if (process.env.NODE_ENV === 'production') return next();
      process.exit(1);
    }
  } catch (error) {
    console.error('⚠️ License file missing or unreadable:', error.message);
    if (process.env.NODE_ENV === 'production') return next();
    process.exit(1);
  }
});

// API Routes
const answerRoutes = require('./routes/answer');
const questionRoutes = require('./routes/question');
const userRoutes = require('./routes/user');
const adminRoutes = require('./routes/admin');
const feedbackRoutes = require('./routes/feedback');
const markRoutes = require('./routes/mark');
const sessionRoutes = require('./routes/session');

const api = process.env.API_URL;

app.use(`${api}/question`, questionRoutes);
app.use(`${api}/answer`, answerRoutes);
app.use(`${api}/user`, userRoutes);
app.use(`${api}/admin`, adminRoutes);
app.use(`${api}/feedback`, feedbackRoutes);
app.use(`${api}/mark`, markRoutes);
app.use(`${api}/session`, sessionRoutes);

// MongoDB Atlas Connection
mongoose.connect(process.env.CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'college'
})
.then(() => {
  console.log('✅ Connected to MongoDB Atlas');
})
.catch(err => {
  console.error('❌ MongoDB connection error:', err);
});

// Server Listen
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
