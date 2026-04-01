const { Post, Like } = require("../models/schema");

// LIKE POST
exports.likePost = async (req, res) => {
    try {
        const { postId } = req.body;

        const like = await Like.create({
            post: postId
        });

        await Post.findByIdAndUpdate(postId, {
            $push: { likes: like._id }
        });

        res.status(200).json({
            success: true,
            like
        });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};