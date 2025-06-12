const mongoose = require('mongoose');

const questionSchema = mongoose.Schema({
  adminemail: { type: String },  // ✅ old logic untouched
  committeeemail: { type: String },  // ✅ new field
  course: { type: String, required: true },
  image: { type: [String], required: true },
  pdf: { type: [String] }, // ✅ ADD PDF support
  status: { type: String, default: 'pending' },
  dateCreated: { type: Date, default: Date.now },  // ✅ old
  committedate: { type: Date }  // ✅ new field
});

questionSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

questionSchema.set('toJSON', { virtuals: true });

exports.Question = mongoose.model('Question', questionSchema);
