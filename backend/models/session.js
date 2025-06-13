const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  course: { type: String, required: true },
  batch: { type: String, required: true },
  users: [{ type: String }],
  fromDate: { type: Date, required: true },
  toDate: { type: Date, required: true },
  durationHours: { type: Number, required: true },  // total planned hours
  datewise: [{
    date: { type: Date },
    todayHour: { type: Number }  // store in minutes always
  }],
  status: { type: String, default: 'On-Going' }
}, { timestamps: true });

module.exports = mongoose.model('Session', sessionSchema);
