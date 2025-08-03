import React, { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";

export default function CommentMessage({ comment, onEdit, onDelete }) {
  const userId = localStorage.getItem("userId");
  const isMyComment = comment.userId === userId;

  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(comment.text);

  const handleUpdate = () => {
    if (editedText.trim()) {
      onEdit(comment._id, editedText); 
      setIsEditing(false); 
    }
  };

  return (
    <div className="flex justify-between items-start gap-3 mb-4">
      <div className="flex-1">
        <p className="text-sm font-medium">{comment.userName}</p>

        {isEditing ? (
          <div className="flex flex-col gap-2 mt-1">
            <input
              type="text"
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
              className="px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              onClick={handleUpdate}
              className="self-start bg-blue-600 text-white text-xs px-3 py-1 rounded-md hover:bg-blue-700 transition"
            >
              Update
            </button>
          </div>
        ) : (
          <p className="text-sm text-gray-700 mt-1">{comment.text}</p>
        )}
      </div>

      {isMyComment && !isEditing && (
        <div className="flex gap-2 items-center">
          <button
            onClick={() => setIsEditing(true)}
            className="text-blue-600 cursor-pointer hover:text-white p-1 rounded-md hover:bg-blue-600 transition duration-200"
            title="Edit"
          >
            <Pencil size={18} />
          </button>
          <button
            onClick={() => onDelete(comment._id)}
            className="text-red-600 cursor-pointer hover:text-white p-1 rounded-md hover:bg-red-600 transition duration-200"
            title="Delete"
          >
            <Trash2 size={18} />
          </button>
        </div>
      )}
    </div>
  );
}
