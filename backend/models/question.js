const mongoose = require('mongoose');

const questionSchema = mongoose.Schema({
    adminemail: {
        type: String,
        required: true,    
    },
    course: {
        type: String,
        required: true,    
    },
    image: {
  type: [String],
  required: true
},

    status: {
  type: String,
  default: 'pending'
},

    
    dateCreated: {
        type: Date,
        default: Date.now
    }
})


questionSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

questionSchema.set('toJSON', {
    virtuals: true,
});


exports.Question = mongoose.model('Question', questionSchema);
