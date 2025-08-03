import React, { useEffect, useState } from "react";
import axios from "axios";

import { Link, useNavigate } from "react-router-dom";

const MyChannelPage = () => {
  const [channels, setChannels] = useState([]);
  const [loading, setLoading] = useState(true);
 
  const navigate = useNavigate();

 
  const fetchMyChannels = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get("http://localhost:3000/api/channel", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data)

      setChannels(response.data || []);
    } catch (error) {
      navigate('/login')
      console.error("❌ Failed to fetch channels:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyChannels();
  }, []);

  function handleChannel(channel) {
  
    navigate(`/channel/${channel._id}`)
  }

  return (
    <div className="min-h-screen overflow-auto w-full bg-gray-100 p-6">
      <div className="flex justify-between mb-8">
        <h1 className="text-3xl font-bold text-center text-red-600 ">Your Channels</h1>
        <Link to='/createchannel'>
          <button className="bg-black border cursor-pointer rounded transition-all duration-300 ease-in-out text-white p-2 hover:bg-white  hover:text-black">+ Create New</button>
        </Link>
      </div>

      {loading ? (
        <p className="text-center text-gray-600">Loading channels...</p>
      ) : channels.length === 0 ? (
        <p className="text-center text-gray-500">You haven't created any channels yet.</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {channels.map((channel) => (
            <div
              key={channel._id}
              className="bg-white cursor-pointer transform transition duration-300 ease-in-out hover:scale-95 rounded-xl shadow-md overflow-hidden"
              onClick={() => handleChannel(channel)}
            >
              {/* Channel Banner */}
              {channel.channelBanner && (
                <img
                  src={channel.channelBanner}
                  alt="Banner"
                  className="w-full h-32 object-cover"
                />
              )}

              <div className="p-4">
                {/* Profile + Name */}
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src={channel.channelImage}
                    alt="Profile"
                    className="w-12 h-12 rounded-full border"
                  />
                  <div>
                    <h3 className="text-lg font-semibold">{channel.channelName}</h3>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-700">{channel.description}</p>
              </div>
            </div>

          ))}

        </div>
      )}
    </div>
  );
};

export default MyChannelPage;
