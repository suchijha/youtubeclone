import React from "react";
import { Eye } from "lucide-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { videosMethod } from "../State/Slice/Videos";

const VideoCard = ({ video }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function handleVideo(){
       dispatch(videosMethod(video));
       navigate(`/video/${video._id}`);
  }
  return (
    <div onClick={handleVideo} className="bg-white w-[300px] md:w-[350px] cursor-pointer rounded-xl h-fit shadow hover:shadow-md transition overflow-hidden">
      <img
        src={video.thumbnailUrl}
        alt={video.title}
        className="w-full h-44 object-cover"
      />
      <div className="p-3">
        <h3 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-2">{video.title}</h3>
        <div className="flex items-center text-xs text-gray-500">
          <Eye className="w-4 h-4 mr-1" />
          {video.views} views · {video.date}
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
