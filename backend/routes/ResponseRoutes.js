const express = require("express");
const router = express.Router();
const { submitResponse } = require("../controllers/ResponseController");

router.post("/", submitResponse);

module.exports = router;
