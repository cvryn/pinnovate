import { useState } from "react"
import { createComments } from "../../router/comment";
import './CommentForm.css';

const CommentForm = ({ pinId, onCommentSubmitted, canLeaveComment }) => {
  const [commentText, setCommentText] = useState("");
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    const commentData = {
      comment: commentText,
    };

    try {
      const newComment = await createComments(pinId, commentData);
      onCommentSubmitted(newComment);
      setCommentText("");
      setIsFormVisible(false);
    } catch (error) {
      console.error("Failed to submit comment:", error);
    }
  };

  return (
    <div style={{ marginTop: '20px' }}>
      {canLeaveComment && (
        <>
          <button
            className='leave-comment-button-pin-details'
            onClick={() => setIsFormVisible((prev) => !prev)}
          >
            {isFormVisible ? "Cancel" : "Leave a Comment"}
          </button>
          {isFormVisible && (
            <form onSubmit={handleCommentSubmit}>
              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Leave a comment!"
                required
                rows={4}
                style={{ width: '100%', resize: 'none', marginTop: '10px', padding: '10px' }}
              />

              <button
                className='leave-comment-submit-button'
                type="submit"
                style={{ marginTop: '10px' }}
              >
                Submit Comment
              </button>
            </form>
          )}
        </>
      )}
    </div>
  );
};

export default CommentForm;
