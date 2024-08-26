import { useState } from "react";
import { createComments } from "../../router/comment";
import './CommentForm.css';

const CommentForm = ({ pinId, onCommentSubmitted, canLeaveComment }) => {
  const [commentText, setCommentText] = useState("");

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    const commentData = {
      comment: commentText,
    };

    try {
      const newComment = await createComments(pinId, commentData);
      onCommentSubmitted(newComment); 
      setCommentText("");
    } catch (error) {
      console.error("Failed to submit comment:", error);
    }
  };

  if (!canLeaveComment) return null;

  return (
    <div className="comment-form-container">
      <form onSubmit={handleCommentSubmit} className="comment-form">
        <div className="textarea-container">
          <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Leave a comment!"
            rows={1}
            className="comment-textarea"
          />
          <button
            className='leave-comment-submit-button'
            type="submit"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default CommentForm;
