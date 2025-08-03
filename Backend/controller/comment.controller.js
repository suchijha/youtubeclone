// controllers/commentController.js
import Video from '../models/videoModel.js';
import mongoose from 'mongoose';

// 🔹 Add a new comment to a video
export const addComment = async (req, res) => {
  const { videoId } = req.params;
  const { text } = req.body;
  const userId = req.user.id;
  const userName = req.user.name
 
  try {
    const video = await Video.findById(videoId);
    if (!video) return res.status(404).json({ error: "Video not found" });

    video.comments.push({ userId, userName, text });
    await video.save();

    res.status(201).json({ message: "Comment added", comments: video.comments });
  } catch (err) {
    res.status(500).json({ error: "Failed to add comment" });
  }
};



// 🔹 Update a specific comment
export const updateComment = async (req, res) => {
  const { videoId, commentId } = req.params;
  const { text } = req.body;
  console.log(req.params,req.body)
  const userId = req.user.id; 

  if (!text || text.trim() === "") {
    return res.status(400).json({ error: "Comment text is required" });
  }

  try {
    const video = await Video.findOneAndUpdate(
      {
        _id: videoId,
        "comments._id": commentId,
        "comments.userId": userId, // ensure only owner can update
      },
      {
        $set: {
          "comments.$.text": text,
        },
      },
      {
        new: true, 
      }
    );

    if (!video) {
      return res.status(404).json({ error: "Comment not found or unauthorized" });
    }

    res.status(200).json({
      message: "Comment updated successfully",
      comments: video.comments,
    });
  } catch (err) {
    console.error("Comment update error:", err);
    res.status(500).json({ error: "Failed to update comment" });
  }
};

// 🔹 Delete a comment
export const deleteComment = async (req, res) => {
  try {
    const { videoId, commentId } = req.params;
    const userId = req.user.id; // should be set by auth middleware

    // Pull the comment if it belongs to the logged-in user
    const video = await Video.findOneAndUpdate(
      { _id: videoId, 'comments._id': commentId, 'comments.userId': userId },
      { $pull: { comments: { _id: commentId } } },
      { new: true } // return updated document
    );

    if (!video) {
      return res.status(404).json({ message: "Comment not found or unauthorized" });
    }

    res.status(200).json({
      message: "Comment deleted successfully",
      comments: video.comments, // send updated comment list
    });

  } catch (error) {
    console.error("Error deleting comment:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};