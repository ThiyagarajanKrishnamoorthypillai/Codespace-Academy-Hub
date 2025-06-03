const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  course: String,
  batch: String,
  user: [String],
  durationHours: Number,
  startTime: Date,
  endTime: Date,
  isActive: { type: Boolean, default: false },
  status: { type: String, default: "Ongoing" } // ✅ NEW field
}, { timestamps: true });

module.exports = mongoose.model('Session', sessionSchema);
