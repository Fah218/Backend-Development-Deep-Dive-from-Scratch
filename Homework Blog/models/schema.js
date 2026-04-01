const mongoose = require("mongoose");

// POST
const postSchema = new mongoose.Schema({
    title: String,
    body: String,
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Like"
    }],
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    }]
}, { timestamps: true });


// COMMENT
const commentSchema = new mongoose.Schema({
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
    },
    body: String
}, { timestamps: true });


// LIKE
const likeSchema = new mongoose.Schema({
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
    }
}, { timestamps: true });


const Post = mongoose.model("Post", postSchema);
const Comment = mongoose.model("Comment", commentSchema);
const Like = mongoose.model("Like", likeSchema);

module.exports = { Post, Comment, Like };