const express = require("express");   // FIXED
const router = express.Router();

const { imageUpload, videoUpload, imageReducerUpload, localFileUpload } = require("../controllers/fileUpload");

// api route
router.post("/localFileUpload", localFileUpload);

module.exports = router;