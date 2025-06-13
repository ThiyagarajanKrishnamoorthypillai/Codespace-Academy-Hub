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
  imageMark: {
  type: [String], // ✅ make it an array of strings
  required: true
},
  pdf: {
  type: [String], // ✅ make it an array of strings
  required: true
},
  // Uploaded image path
  dateMark: {              // Mark posting date
    type: String,
    default: new Date().toISOString()
  },
  adminemail: String,
  tutoremail: String  // ✅ ADD tutor field (new)
}, {
  timestamps: true
});

module.exports = mongoose.model('Mark', markSchema);
