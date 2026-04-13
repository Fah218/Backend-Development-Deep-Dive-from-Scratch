const { Post, Like } = require("../models/schema");

// LIKE POST
exports.likePost = async (req, res) => {
    try {
        const { post, postId, user } = req.body;
        const targetPost = post || postId;

        const like = await Like.create({
            post: targetPost,
            user
        });

        const updatedPost = await Post.findByIdAndUpdate(targetPost, {
            $push: { likes: like._id }
        }, { new: true })
            .populate("likes")
            .exec();

        res.status(200).json({
            success: true,
            post: updatedPost
        });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// UNLIKE POST
exports.unlikePost = async (req, res) => {
    try {
        const { post, like } = req.body;

        // Find and delete the like collection entry
        const deletedLike = await Like.findOneAndDelete({ post: post, _id: like });

        // Update the post collection
        const updatedPost = await Post.findByIdAndUpdate(post, {
            $pull: { likes: deletedLike._id }
        }, { new: true })
            .populate("likes")
            .exec();

        res.status(200).json({
            success: true,
            post: updatedPost
        });
    } catch(error) {
        res.status(500).json({ success: false, message: error.message });
    }
};