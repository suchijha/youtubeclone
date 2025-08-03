import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UploadVideoPage = () => {
  const [title, setTitle] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [channelId, setChannelId] = useState("");
  const [myChannels, setMyChannels] = useState([]);
  const navigate = useNavigate();

  // ✅ Fetch user's channels on load
  useEffect(() => {
    const fetchChannels = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:3000/api/channel", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(res.data)
        setMyChannels((res.data));
      } catch (err) {
       alert(err.message)
        console.error("Failed to load channels:", err.response?.data || err.message);
      }
    };

    fetchChannels();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const videoData = {
      title,
      thumbnailUrl,
      videoUrl,
      description,
      category,
      channel: channelId,
    };

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post("http://localhost:3000/api/video", videoData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      console.log("✅ Video Uploaded:", res.data);
      alert("Video uploaded successfully!");
      // Clear form
      setTitle("");
      setThumbnailUrl("");
      setVideoUrl("");
      setDescription("");
      setCategory("");
      setChannelId("");
    } catch (err) {
      console.error("❌ Upload Failed:", err.response?.data || err.message);
      alert("Failed to upload video.");
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-100 p-6 flex justify-center items-center">
      <div className="bg-white rounded-xl shadow-md p-6 w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-center text-red-600 mb-6">Upload New Video</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              value={title}
              
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border px-3 py-2 rounded-md outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>

          {/* Thumbnail URL */}
          <div>
            <label className="block text-sm font-medium mb-1">Thumbnail URL</label>
            <input
              type="url"
              value={thumbnailUrl}
              placeholder="https://www.youtube.com/embed/channelId"
              onChange={(e) => setThumbnailUrl(e.target.value)}
              className="w-full border px-3 py-2 rounded-md outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>

          {/* Video URL */}
          <div>
            <label className="block text-sm font-medium mb-1">Video URL</label>
            <input
              type="url"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              className="w-full border px-3 py-2 rounded-md outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border px-3 py-2 rounded-md outline-none focus:ring-2 focus:ring-red-500"
              rows={4}
            />
          </div>

          {/* Category Select */}
          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border px-3 py-2 rounded-md outline-none focus:ring-2 focus:ring-red-500"
              required
            >
              <option value="">-- Select a category --</option>
              <option value="Bhajan">Bhajan</option>
              <option value="Education">Education</option>
              <option value="Exercise">Exercise</option>
            </select>
          </div>


          {/* Channel Select */}
          <div>
            <label className="block text-sm font-medium mb-1">Select Channel</label>

            <select
              value={channelId}
              onChange={(e) => {
                setChannelId(e.target.value);
                console.log("Selected:", e.target.value); // ✅ Debug
              }}
              className="w-full border px-3 py-2 rounded-md outline-none focus:ring-2 focus:ring-red-500"
              required
            >
              <option value="">-- Select a channel --</option> {/* ✅ This line is must */}
              {myChannels.map((ch) => (
                <option key={ch._id} value={ch._id}>
                  {ch.channelName}
                </option>
              ))}
            </select>

          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-red-600 text-white py-2 rounded-md font-semibold hover:bg-red-700 transition duration-200"
          >
            Upload Video
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadVideoPage;
