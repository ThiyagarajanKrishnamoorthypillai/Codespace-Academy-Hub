const mongoose = require('mongoose');

const tutorSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  course: {
    type: String,
    required: true
  }
});

tutorSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

tutorSchema.set('toJSON', {
  virtuals: true,
});

exports.Tutor = mongoose.model('Tutor', tutorSchema);
exports.tutorSchema = tutorSchema;
