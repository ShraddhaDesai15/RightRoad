const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

router.get('/', (req, res) => {
  const filePath = path.join(__dirname, '../data/Question.json');
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Failed to load questions' });
    try {
      res.json(JSON.parse(data));
    } catch {
      res.status(500).json({ error: 'Invalid JSON format' });
    }
  });
});

module.exports = router;

// const express = require("express");
// const router = express.Router();
// const path = require("path");
// const fs = require("fs");

// // GET /api/questions
// router.get("/", (req, res) => {
//   const filePath = path.join(__dirname, "../data/Question.json");

//   fs.readFile(filePath, "utf8", (err, data) => {
//     if (err) return res.status(500).json({ error: "Failed to load questions" });
//     try {
//       res.json(JSON.parse(data));
//     } catch (e) {
//       res.status(500).json({ error: "Invalid JSON format" });
//     }
//   });
// });

// module.exports = router;