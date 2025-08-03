import axios from "axios";
import React, { useEffect, useState } from "react";
import CommentMessage from "./CommentMessage";
import { deleteComment } from "../../../Backend/controller/comment.controller";

export default function Comment({ comments, videoId }) {
  const [commentData, setCommentData] = useState(comments)
  const [commentMessage, setCommentMessage] = useState('');

  const [loading, setLoading] = useState(false);
   useEffect(()=>{
   setCommentData(comments);
   },[comments]);

   



  async function addComment() {
    const token = localStorage.getItem('token')
    if (!commentMessage) {
      return alert("Please fill the comment input")
    }
    setLoading(true)
    const res = await axios.post(`http://localhost:3000/api/comment/${videoId}`, { text: commentMessage }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    setLoading(false);
    console.log(res)
    if (res.status != "201") {
      return alert(res.data.error);
    }
    setCommentData(res.data.comments)
    setCommentMessage('')

  }

  async function editComment(commentId, text) {
    const token = localStorage.getItem("token");
    if (!text.trim()) return alert("Comment cannot be empty");

    try {
      const res = await axios.put(
        `http://localhost:3000/api/comment/${videoId}/${commentId}`,
        { text },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status !== 200) return alert(res.data.error || "Failed to update");

      setCommentData(res.data.comments);
    } catch (err) {
      console.error("Edit comment error:", err);
      alert("Failed to edit comment");
    }
  }

  async function DeleteComment(commentId) {
    const token = localStorage.getItem('token')
    const res = await axios.delete(`http://localhost:3000/api/comment/${videoId}/${commentId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (res.status != "200") {
      return alert(res.data.message)
    }
    setCommentData(res.data.comments);
  }
  return (
    <div>
      <div className="flex items-center gap-3 mt-6">
        <input
          type="text"
          value={commentMessage}
          onChange={(e) => setCommentMessage(e.target.value)}
          placeholder="Write your comment..."
          className="flex-1 border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 px-4 py-2 rounded-md text-sm shadow-sm transition duration-300 ease-in-out outline-none"
        />
        <button
          onClick={addComment}
          className="bg-blue-600 cursor-pointer hover:bg-blue-700 active:scale-95 transition-all text-white text-sm font-medium px-4 py-2 rounded-md shadow-md hover:shadow-lg"
        >
          {(loading ? "Adding" : "+ Add")}
        </button>
      </div>


      {commentData.map(comment => {
        return <CommentMessage comment={comment} onEdit={editComment} onDelete={DeleteComment} />
      })}



    </div>
  )
}