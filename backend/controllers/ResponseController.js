const Response = require("../models/Response");
const questionsData = require("../data/Question.json");
const autoCleanupIfNeeded = require("../Cleanup"); // ✅ Make sure the file is named cleanup.js

// 🔽 Flatten all questions into a flat array for scoring
const flattenQuestions = () => {
  const flatList = [];
  for (const [stream, questions] of Object.entries(questionsData)) {
    for (const q of questions) {
      flatList.push({
        stream,
        question: q.question,
        answer: q.answer || null,
        options: q.options,
      });
    }
  }
  return flatList;
};

// 🧠 Score regular and compatibility questions
const evaluateStream = (responses, flatQuestions) => {
  const scores = { Science: 0, Commerce: 0, Arts: 0 };
  const compatibility = { Science: 0, Commerce: 0, Arts: 0 };
  const normalize = (str) => String(str).trim().toLowerCase();

  for (const r of responses) {
    const qObj = flatQuestions.find((q) => q.question === r.question);
    if (!qObj || !r.selected) continue;

    // ✅ Regular MCQs with correct answers
    if (qObj.answer) {
      const match = normalize(r.selected) === normalize(qObj.answer);
      if (match) {
        scores[qObj.stream]++;
        console.log(`✅ ${qObj.stream} +1 for: "${qObj.question}"`);
      } else {
        console.log(`❌ Incorrect: "${r.selected}" (Expected: "${qObj.answer}")`);
      }
    }

    // 🎯 Compatibility-based questions
    else if (qObj.stream === "Compatibility") {
      const matched = qObj.options.find(
        (opt) => normalize(opt.option) === normalize(r.selected)
      );
      if (matched && matched.stream) {
        compatibility[matched.stream]++;
        console.log(`🎯 Compatibility: ${r.selected} → ${matched.stream}`);
      }
    }
  }

  // 🧮 Combine subject and compatibility scores
  const totalScores = {
    Science: scores.Science + compatibility.Science,
    Commerce: scores.Commerce + compatibility.Commerce,
    Arts: scores.Arts + compatibility.Arts,
  };

  const recommendedStream = Object.entries(totalScores).reduce(
    (max, [stream, score]) => (score > max.score ? { stream, score } : max),
    { stream: null, score: -1 }
  ).stream;

  return {
    scores: totalScores,
    recommendedStream,
  };
};

// 📥 Handles /api/responses POST
const submitResponse = async (req, res) => {
  try {
    const { responses } = req.body;
    console.log("📨 Received:", responses.length, "responses");

    const flatQuestions = flattenQuestions();

    // 💾 Save response
    const response = new Response({ answers: responses });
    await response.save();

    // 🧹 Auto-cleanup if disk size > 450MB
    await autoCleanupIfNeeded();

    // 🧠 Evaluate result
    const result = evaluateStream(responses, flatQuestions);

    // 🚀 Return to frontend
    res.json({
      scores: result.scores,
      recommendedStream: result.recommendedStream,
    });

  } catch (err) {
    console.error("❌ Error evaluating test:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { submitResponse };

