import { useState, useEffect } from "react";
import CommentForm from "./CommentForm";
import "./Comment.css";
import { getComments } from "../../router/comment";

function Comment({ pinId }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const loadComments = async () => {
      try {
        const loadedComments = await getComments(pinId);
        setComments(loadedComments);
      } catch (error) {
        console.error("Failed to load comments:", error);
      }
    };

    loadComments();
  }, [pinId]);

  const handleCommentSubmitted = (newComment) => {
    setComments((prevComments) => [...prevComments, newComment]);
    console.log("New comment added:", newComment);
  };

  return (
    <>
      <h1>ʕ*•ﻌ•ʔฅ</h1>
      <div id="comments-main-container">
        <div id="comments-shown-here">
          {comments.map((comment) => (
            <div key={comment.id} className="comment-item">
              {comment.comment}
            </div>
          ))}
        </div>
        <div id="post-comment-here">
          <CommentForm
            pinId={pinId}
            onCommentSubmitted={handleCommentSubmitted}
            canLeaveComment={true}
          />
        </div>
      </div>
    </>
  );
}

export default Comment;
