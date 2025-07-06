const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.error("❌ MongoDB Error:", err));

// ROUTES
app.use("/api/responses", require("./routes/ResponseRoutes"));  // ✅ this one
app.use("/api/questions", require("./routes/QuestionRoutes"));  // ✅ if you have questions route
const feedbackRoutes = require("./routes/FeedbackRoutes");
app.use("/api/feedback", feedbackRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
