const Feedback = require('../models/Feedback');

// Get last 5 feedback entries
const getRecentFeedback = async (req, res) => {
  try {
    const feedbacks = await Feedback.find()
      .sort({ createdAt: -1 })
      .limit(5);
    res.json(feedbacks);
  } catch (err) {
    console.error("❌ Failed to fetch feedback:", err);
    res.status(500).json({ error: 'Failed to fetch feedback' });
  }
};

// Add new feedback
const submitFeedback = async (req, res) => {
  try {
    const { name, email, message, rating } = req.body;

    const newFeedback = new Feedback({ name, email, message, rating });
    await newFeedback.save();
    res.status(201).json({ success: true, message: 'Feedback submitted' });
  } catch (err) {
    console.error("❌ Failed to save feedback:", err);
    res.status(500).json({ error: 'Feedback submission failed' });
  }
};

module.exports = { getRecentFeedback, submitFeedback };
// const Feedback = require('../models/Feedback');

// // ✅ Get last 5 feedback entries
// const getRecentFeedback = async (req, res) => {
//   try {
//     const feedbacks = await Feedback.find()
//       .sort({ createdAt: -1 })
//       .limit(5);
//     res.json(feedbacks);
//   } catch (err) {
//     console.error("❌ Failed to fetch feedback:", err);
//     res.status(500).json({ error: 'Failed to fetch feedback' });
//   }
// };

// // ✅ Add new feedback
// const submitFeedback = async (req, res) => {
//   try {
//     const { name, email, message, rating } = req.body;

//     const newFeedback = new Feedback({
//       name,
//       email,
//       message,
//       rating,
//     });

//     await newFeedback.save();
//     res.status(201).json({ success: true, message: 'Feedback submitted' });
//   } catch (err) {
//     console.error("❌ Failed to save feedback:", err);
//     res.status(500).json({ error: 'Feedback submission failed' });
//   }
// };

// module.exports = { getRecentFeedback, submitFeedback };