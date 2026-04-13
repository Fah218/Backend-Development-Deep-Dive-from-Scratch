const { Post, Comment } = require("../models/schema");

// ADD COMMENT
exports.createComment = async (req, res) => {
    try {
        const { post, postId, user, body } = req.body;
        // Accept either post or postId from request body
        const targetPost = post || postId;

        const comment = await Comment.create({
            post: targetPost,
            user,
            body
        });

        // Add the new comment ID to the Post's comments array
        const updatedPost = await Post.findByIdAndUpdate(targetPost, {
            $push: { comments: comment._id }
        }, { new: true })
            .populate("comments") // Populate with actual comment documents
            .exec();

        res.status(200).json({
            success: true,
            post: updatedPost
        });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};