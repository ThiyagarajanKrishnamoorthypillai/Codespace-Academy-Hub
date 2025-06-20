// ✅ Clean and correct schema
const mongoose = require('mongoose');

const answerSchema = mongoose.Schema({
  useremail: { type: String, required: true },
  name: { type: String, required: true },
  stdid: { type: String, required: true },
  dpt: { type: String, required: true },
  college: { type: String, required: true },
  course: { type: String, required: true },
  image: { type: [String], required: true },

 status: {
  type: String,
  enum: ['Pending', 'Completed', 'On-Progress', 'Submitted'],
  default: 'Pending'
},

  dateCreated: {
  type: String,
  default: () => {
    const dateIST = new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
    return new Date(dateIST).toISOString();
  }
},


  questionCourse: { type: String },
  questionDateCreated: { type: String },
  questionImages: { type: [String] },
   pdf: { type: [String] }
});

answerSchema.virtual('id').get(function () {
  return this._id.toHexString();
});
answerSchema.set('toJSON', { virtuals: true });

exports.Answer = mongoose.model('Answer', answerSchema);
