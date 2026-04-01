const { Post } = require("../models/schema");

// CREATE POST
exports.createPost = async (req, res) => {
    try {
        const { title, body } = req.body;

        const post = await Post.create({ title, body });

        res.status(200).json({
            success: true,
            post
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// GET ALL POSTS
exports.getPosts = async (req, res) => {
    try {
        const posts = await Post.find()
            .populate("comments")
            .populate("likes");

        res.status(200).json({
            success: true,
            posts
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


// GET SINGLE POST
exports.getPostById = async (req, res) => {
    try {
        const { id } = req.params;

        const post = await Post.findById(id)
            .populate("comments")
            .populate("likes");

        // ❌ Important check (many people skip this)
        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found"
            });
        }

        res.status(200).json({
            success: true,
            post
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};