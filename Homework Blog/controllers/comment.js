const { Post, Comment } = require("../models/schema");

// ADD COMMENT
exports.createComment = async (req, res) => {
    try {
        const { postId, body } = req.body;

        const comment = await Comment.create({
            post: postId,
            body
        });

        await Post.findByIdAndUpdate(postId, {
            $push: { comments: comment._id }
        });

        res.status(200).json({
            success: true,
            comment
        });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};