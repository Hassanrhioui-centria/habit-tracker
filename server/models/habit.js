const mongoose = require('mongoose');

const habitSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  },
  completed: {
    type: Boolean,
    default: false
  },
  streak: {
    type: Number,
    default: 0
  },
  completionHistory: [{
    date: {
      type: Date,
      default: Date.now
    },
    completed: {
      type: Boolean,
      default: true
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  // Add this to transform _id to id in responses
  toJSON: {
    transform: function(doc, ret) {
      ret.id = ret._id.toString();
      delete ret._id;
      delete ret.__v;
      return ret;
    }
  }
});

module.exports = mongoose.model('Habit', habitSchema);
