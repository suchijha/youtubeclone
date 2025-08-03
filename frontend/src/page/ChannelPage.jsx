import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Bell, Share2, Pencil, Trash2 } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import VideoCard from "../components/VideoCard";
import EditVideoModal from "../components/EditVideoModal";

const ChannelPage = () => {
  const [data, setData] = useState({});
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false)
  const { id } = useParams();

  const channel = {
    banner: data.channelBanner,
    profile: data.channelImage,
    name: data.channelName,
    subscribers: `${data.subscribers} Subscribers`,
  };

  useEffect(() => {
    getVideos();
  }, []);

  async function getVideos() {

    const token = localStorage.getItem("token");
    try {
      setLoading(true)
      const response = await axios.get(`http://localhost:3000/api/channel/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data)
      setData(response.data)
      const res = await axios.get(
        `http://localhost:3000/api/video/channel/${response.data._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(res.data)
      setVideos(res.data);
      setLoading(false)
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  }

  // Optional edit handler
  const handleEdit = (video) => {

    setSelectedVideo(video)
    setIsModalOpen(true)

  };

  const handleSaveEdit = async (video) => {
    const token = localStorage.getItem("token");
    const res = await axios.put(
      `http://localhost:3000/api/video/${video._id}`, video,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (res.status == "200") {
      setVideos(res.data.videos)
    }
    alert(res.data.message)
  }

  // Delete handler
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (!confirmDelete) return;

    const token = localStorage.getItem("token");
    try {
      await axios.delete(`http://localhost:3000/api/video/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setVideos((prev) => prev.filter((video) => video._id !== id));
    } catch (error) {
      console.error("Error deleting video:", error);
    }
  };

  return (
    <>
    {loading ? (
        <div className="w-full flex justify-center items-center h-[97vh]">
          <h1>Loading...</h1>
        </div>
      ):(

      <div className="bg-gray-100 min-h-screen w-full overflow-auto">
        {/* Banner */}
        <div className="w-full h-52 sm:h-64 lg:h-80 overflow-hidden">
          <img
            src={channel.banner}
            alt="Channel Banner"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Channel Info */}
        <div className="px-6 mt-6 flex flex-col sm:flex-row items-center sm:items-start gap-4">
          <img
            src={channel.profile}
            alt="Channel"
            className="w-28 h-28 sm:w-32 sm:h-32 rounded-full border-4 border-white shadow-md"
          />
          <div className="flex-1 text-center sm:text-left">
            <h2 className="text-2xl font-bold">{channel.name}</h2>
            <p className="text-sm text-gray-600">{channel.subscribers}</p>
          </div>
          <div className="flex gap-2 mt-2 sm:mt-0">
            <button className="bg-red-600 text-white text-sm px-4 py-2 rounded-full hover:bg-red-700 transition">
              Subscribe
            </button>
            <button className="bg-gray-200 px-3 py-2 rounded-full hover:bg-gray-300 transition">
              <Bell size={18} />
            </button>
            <button className="bg-gray-200 px-3 py-2 rounded-full hover:bg-gray-300 transition">
              <Share2 size={18} />
            </button>
          </div>
        </div>

        {/* Videos Grid */}
        <div className="px-6 mt-10">
          <h3 className="text-xl font-semibold mb-4">Videos</h3>
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {videos.map((video, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow hover:shadow-md transition p-3 flex flex-col justify-between"
              >
                {/* VideoCard */}
                <VideoCard video={video} />

                {/* Action Buttons */}
                <div className="flex justify-end gap-2 mt-4">
                  <button
                    onClick={() => handleEdit(video)}
                    className="bg-yellow-500 cursor-pointer hover:bg-yellow-600 text-white p-2 rounded-full"
                    title="Edit"
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(video._id)}
                    className="bg-red-600 cursor-pointer hover:bg-red-700 text-white p-2 rounded-full"
                    title="Delete"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Edit Modal */}
        <EditVideoModal
          isOpen={isModalOpen}
          video={selectedVideo}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveEdit}
        />
      </div>
      )}
    </>
  );
};

export default ChannelPage;
