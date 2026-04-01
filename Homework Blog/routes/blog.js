const express = require("express");
const router = express.Router();

const { createPost, getPosts, getPostById } = require("../controllers/post");
const { createComment } = require("../controllers/comment");
const { likePost } = require("../controllers/likes");

// POST ROUTES
router.post("/createPost", createPost);
router.get("/getPosts", getPosts);


// Single Post req
router.get("/getPostById/:id", getPostById);


// COMMENT
router.post("/comment", createComment);

// LIKE
router.post("/like", likePost);

module.exports = router;