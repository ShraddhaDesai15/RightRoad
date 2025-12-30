const mongoose = require('mongoose');

const responseSchema = new mongoose.Schema(
  {
    answers: { type: Array, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Response', responseSchema);
// const mongoose = require('mongoose');

// const responseSchema = new mongoose.Schema(
//   {
//     answers: { type: Object, required: true },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model('Response', responseSchema);