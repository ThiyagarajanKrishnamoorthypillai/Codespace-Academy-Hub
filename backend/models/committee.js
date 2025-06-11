const mongoose = require('mongoose');

const committeeSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  passwordHash: {
    type: String,
    required: true,
  }
});

committeeSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

committeeSchema.set('toJSON', {
  virtuals: true,
});

exports.Committee = mongoose.model('Committee', committeeSchema);
exports.committeeSchema = committeeSchema;
