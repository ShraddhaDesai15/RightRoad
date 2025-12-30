const express = require('express');
const router = express.Router();
const { getRecentFeedback, submitFeedback } = require('../controllers/FeedbackController');

router.get('/', getRecentFeedback);
router.post('/', submitFeedback);

module.exports = router;
// const express = require('express');
// const router = express.Router();
// const { getRecentFeedback, submitFeedback } = require('../controllers/FeedbackController');

// router.get('/', getRecentFeedback);   // GET /api/feedback
// router.post('/', submitFeedback);     // POST /api/feedback

// module.exports = router;