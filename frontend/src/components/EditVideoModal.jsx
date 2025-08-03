import React, { useState, useEffect } from "react";

const EditVideoModal = ({ video, isOpen, onClose, onSave }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (video) {
      setTitle(video.title || "");
      setDescription(video.description || "");
    }
  }, [video]);

  if (!isOpen) return null;
  function handleEdit(){
    let cloneVideo = {...video};
    cloneVideo.title = title;
    cloneVideo.description = description;
    onSave(cloneVideo);
    onClose()
  }
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-[90%] max-w-md">
        <h2 className="text-lg font-semibold mb-4">Edit Video</h2>

        <input
          type="text"
          className="w-full p-2 border rounded mb-3"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="w-full p-2 border rounded mb-4"
          placeholder="Description"
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <div className="flex justify-end gap-3">
          <button
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={handleEdit}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditVideoModal;
