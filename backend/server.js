require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Routes
const feedbackRoutes = require('./routes/feedback');
const responseRoutes = require('./routes/responses');
const questionRoutes = require('./routes/questions');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/feedback', feedbackRoutes);
app.use('/api/responses', responseRoutes);
app.use('/api/questions', questionRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.error('❌ MongoDB connection error:', err));

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
// const express = require("express");
// const cors = require("cors");
// const mongoose = require("mongoose");
// require("dotenv").config();

// const app = express();

// app.use(cors());
// app.use(express.json());

// // Connect to MongoDB
// mongoose.connect(process.env.MONGO_URI)
//   .then(() => console.log("✅ Connected to MongoDB"))
//   .catch(err => console.error("❌ MongoDB Error:", err));

// // ROUTES
// app.use("/api/responses", require("./routes/ResponseRoutes"));  // ✅ this one
// app.use("/api/questions", require("./routes/QuestionRoutes"));  // ✅ if you have questions route
// const feedbackRoutes = require("./routes/FeedbackRoutes");
// app.use("/api/feedback", feedbackRoutes);


// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
