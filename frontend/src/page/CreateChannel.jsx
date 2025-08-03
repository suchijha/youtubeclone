import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateChannel = () => {
  const [profilePic, setProfilePic] = useState("");
 
  const [channelName, setChannelName] = useState("");
  const [channelBanner, setChannelBanner] = useState("");
  const [channelDescription, setChannelDescription] = useState("");
  const navigate = useNavigate();
  useEffect(()=>{
      CheckChannelExist();
  },[])
  async function CheckChannelExist(){
    try {
      const response = await axios.get('http://localhost:3000/api/channel', {
        headers: {
          Authorization: `Bearer ${token}`, 
          "Content-Type": "application/json",
        },
      })
      if(response.status != "404"){
        navigate('/channel');
      }
    } catch (error) {
        console.error(" Error creating channel:", error.response?.data || error.message);
    }
  }

  const handleSubmit = async (e) => {
  e.preventDefault();

  const channelData = {
    profilePic,
    channelName,
    channelBanner,
    channelDescription,
  };
 

  try {
   
    const token = localStorage.getItem("token"); 
   
    const response = await axios.post(
      "http://localhost:3000/api/channel",
      channelData,
      {
        headers: {
          Authorization: `Bearer ${token}`, 
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response)
    if(response.status == "401" ){
         navigate('/login')
    }
    alert(response.data.message);
    if(response.status == "201"){
      setProfilePic('')
      setChannelBanner('')
      setChannelDescription('')
      setChannelName('')
    
    }

    
    console.log("✅ Channel Created Successfully:", response.data);

  } catch (error) {
     navigate('/login')
    console.error(" Error creating channel:", error.response?.data || error.message);
  }
};

  return (
    <div className="h-[97vh] overflow-auto w-full bg-gray-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-lg bg-white p-8 rounded-2xl shadow-lg">
        <br /><br /><br />
        <h2 className="text-3xl font-bold text-center text-red-600 mb-6">
          Create Your Channel
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">

          {profilePic && (
            <div className="flex justify-center">
              <img
                src={profilePic}
                alt="Profile Preview"
                className="w-24 h-24 rounded-full object-cover border-2 border-gray-300"
              />
            </div>
          )}

          {/* Profile Picture URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Profile Picture URL
            </label>
            <input
              type="url"
              placeholder="https://example.com/image.jpg"
              value={profilePic}
              onChange={(e) => setProfilePic(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
              required
            />
          </div>

         

          {/* Channel Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Channel Name
            </label>
            <input
              type="text"
              placeholder="Your Channel Name"
              value={channelName}
              onChange={(e) => setChannelName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
              required
            />
          </div>

          {/* Channel Banner */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Channel Banner URL
            </label>
            <input
              type="text"
              placeholder="Your Channel Banner"
              value={channelBanner}
              onChange={(e) => setChannelBanner(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
              required
            />
          </div>

          {/* Channel Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Channel Description
            </label>
            <textarea
              className="w-full border border-gray-300 outline-none rounded-lg p-2"
              placeholder="Write your channel description"
              value={channelDescription}
              onChange={(e) => setChannelDescription(e.target.value)}
              rows="4"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full cursor-pointer bg-red-600 text-white font-semibold py-2 rounded-lg hover:bg-red-700 transition duration-200"
          >
            Create Channel
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateChannel;
