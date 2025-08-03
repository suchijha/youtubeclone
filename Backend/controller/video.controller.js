import Video from '../models/videoModel.js';
import Channel from '../models/channelModel.js';

// Upload a new video
export const uploadVideo = async (req, res) => {
  try {
    const {
      title,
      thumbnailUrl,
      videoUrl,
      description,
      category,
      channel
    } = req.body;
    console.log(req.body)

    

    const newVideo = new Video({
      title,
      thumbnailUrl,
      videoUrl,
      description,
      category,
      channel,
    });

    await newVideo.save();
    res.status(201).json({ message: 'Video uploaded successfully', video: newVideo });
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ message: 'Video upload failed', error: error.message });
  }
};

// Get all videos
export const getAllVideos = async (req, res) => {
  try {
    const videos = await Video.find({});
    res.status(200).json(videos);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch videos', error: error.message });
  }
};

// Get video by ID
export const getVideoById = async (req, res) => {
  try {
    console.log(req.params.id)
    const video = await Video.findOne({_id:req.params.id});
    console.log(video)
   

    res.status(200).json(video);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch video', error: error.message });
  }
};
// Get video by channel ID
export const getVideoByChannelId = async (req, res) => {
  try {
    console.log(req.params.channelId)
    const video = await Video.find({channel:req.params.channelId});
    console.log(video)
   

    res.status(200).json(video);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch video', error: error.message });
  }
};
export const getVideoByCategory = async (req, res) => {
  try {
    const video = await Video.find({category:req.params.category});

   

    res.status(200).json(video);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch video', error: error.message });
  }
};


// Search videos by title
export const searchVideosByTitle = async (req, res) => {
  console.log(req.query)
  try {
    const { title } = req.query;

    if (!title) {
      return res.status(400).json({ message: "Search query is required" });
    }

    // Case-insensitive partial match
    const videos = await Video.find({
      title: { $regex: title, $options: "i" }
    });

    res.status(200).json(videos);
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Failed to search videos", error: error.message });
  }
};


// Update a video
export const updateVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);

    if (!video) return res.status(404).json({ message: 'Video not found' });
    const updatedVideo = await Video.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    const updatedList = await Video.find({});
    res.status(200).json({ message: 'Video updated', videos: updatedList });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update video', error: error.message });
  }
};

// Delete a video
export const deleteVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);

    if (!video) return res.status(404).json({ message: 'Video not found' });
   

    await Video.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: 'Video deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete video', error: error.message });
  }
};

// Add a comment
export const addComment = async (req, res) => {
  try {
    const { text } = req.body;
    const videoId = req.params.id;

    const video = await Video.findById(videoId);
    if (!video) return res.status(404).json({ message: 'Video not found' });

    video.comments.push({
      userId: req.user.id, // from auth middleware
      text,
    });

    await video.save();
    res.status(201).json({ message: 'Comment added successfully', comments: video.comments });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add comment', error: error.message });
  }
};
