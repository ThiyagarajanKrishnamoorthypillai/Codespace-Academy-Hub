const mongoose = require('mongoose');

// vendoremail  useremail  complaint mobile lat long status
const feedbackSchema = mongoose.Schema({

    useremail: {
        type: String,
        required: true,    
    },
    name: {
        type: String,
        required: true,    
    },
    feedback: {
        type: String,
        required: true,    
    },

     image: {
  type: [String],
  required: true,
  default: [],
},
pdf: {
  type: [String],
  required: true,
  default: [],
},

    course: {
        type: String,
        required: true,    
    },
status: {
  type: String,
  default: 'Pending'
},
userFeedbackdateCreated: {
  type: String,
  default: new Date().toISOString()
},
    dateCreated: {
        type: String, // Store as string to prevent automatic conversion to local time in MongoDB
        default: new Date().toISOString(),
    },
    explanation: {
  type: String,
  default: ""
},
adminFeedbackdateCreated: {
  type: String,
  default: ""
}

})


feedbackSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

feedbackSchema.set('toJSON', {
    virtuals: true,
});


exports.Feedback = mongoose.model('Feedback', feedbackSchema);
