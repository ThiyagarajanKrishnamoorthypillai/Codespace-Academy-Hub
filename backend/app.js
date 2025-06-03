const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
mongoose.pluralize(null);
const cors = require('cors');
const bodyParser = require('body-parser'); // Import body-parser module
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies
const path = require('path');
const cookieParser = require('cookie-parser'); // ✅ Add this

app.use('/uploads', express.static('./public/uploads'));


// Static route for images with CORS
app.use('/uploads', (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
}, express.static('public/uploads'));



const fs = require('fs').promises;

const configPath = path.resolve(__dirname,    'helpers', 'config.json');

const machineId = require('node-machine-id');
let machineID; // Declare machineID variable
let license ="u3Y65£,;7Y#I";

// Get the machine ID
machineId.machineId()
  .then(id => {
    machineID = id;
    //console.log('Machine ID:', id);
    //console.log('license ID:', license);
  })
  .catch(error => {
    console.error('Error getting machine ID:', error);
  });

  

// Middleware to check for a valid license
app.use(async (req, res, next) => {
  try {
    const configData = await fs.readFile(configPath, 'utf-8');
    const config = JSON.parse(configData);
    const storedLicense = config.license;

    if (storedLicense.licenseCode === license && storedLicense.deviceId === machineID) {
      console.log('Valid license');
      next();
      // Send a success response
      //return res.json({ message: 'Valid license' });
    } 
    
  
  } catch (error) {
    console.error('Invalid or missing license information. Please verify the license.');
    process.exit(1); // Exit the application if the license is not valid
  }
});


app.use(cors({
  origin: ['http://localhost:5173','https://codespace-academy-hub.vercel.app'], // ✅ only your frontend
  credentials: true,                // ✅ allow cookies
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

require('dotenv/config');

//app.use(cors());
//app.options('*', cors())

//middleware
app.use(express.json());

//app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use(cookieParser()); // ✅ Enable this before routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//"email": "john.doe@example.com",
//"password": "yourpassword"

//Routes

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

//CONNECTION_STRING = 'mongodb://localhost:27017/';
//  http://localhost:4000/api/v1/business/


//Database
mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false, // Add this line
    dbName: 'college'
})
.then(()=>{
    console.log('Database Connection is ready...')
})
.catch((err)=> {
    console.log(err);
})

//Server
app.listen(4000, ()=>{

    console.log('server is running http://localhost:4000');
})

{/*
app.get("/message", (req, res) => {
    res.json({ message: "Hello from server!" });
  });
*/}