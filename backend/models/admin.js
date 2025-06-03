const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: false
  },
  isAdmin: {
    type: Boolean,
    default: true
  }
});

adminSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

adminSchema.set('toJSON', {
  virtuals: true,
});

module.exports = mongoose.model('Admin', adminSchema);
