const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String },
  message: { type: String, required: true },
  rating: { type: Number, min: 1, max: 5 },
}, { timestamps: true });

module.exports = mongoose.model('Feedback', feedbackSchema);
