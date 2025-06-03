const mongoose = require('mongoose');

const markSchema = new mongoose.Schema({
  useremail: String,
  name: String,
  stdid: String,
  dpt: String,
  college: String,
  course: String,
  questionCourse: String,
  questionDateCreated: String,
  questionImages: [String],
  answerImages: [String],
  status: {
    type: String,
    enum: ['Pending', 'Completed', 'On-Progress'],
    default: 'Pending'
  },
  imageMark: String,       // Uploaded image path
  dateMark: {              // Mark posting date
    type: String,
    default: new Date().toISOString()
  },
  adminemail: String
}, {
  timestamps: true
});

module.exports = mongoose.model('Mark', markSchema);
