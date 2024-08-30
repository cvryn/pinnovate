import { useState, useEffect } from "react";
import { useModal } from "../../context/Modal";
import CommentForm from "./CommentForm";
import DeleteCommentModal from "./DeleteCommentModal";
import EditCommentModal from "./EditCommentModal";
import { deleteComment, getComments } from "../../router/comment";

import "./Comment.css";

function Comment({ pinId, pin, currentUser }) {
  const [comments, setComments] = useState([]);
  const { setModalContent, closeModal } = useModal();

  useEffect(() => {
    const loadComments = async () => {
      try {
        const loadedComments = await getComments(pinId);
        // Sort comments from newest to oldest
        const sortedComments = loadedComments.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
        setComments(sortedComments);
      } catch (error) {
        console.error("Failed to load comments:", error);
      }
    };

    loadComments();
  }, [pinId]);

  // Post comment
  const handleCommentSubmitted = (newComment) => {
    setComments((prevComments) => [
      newComment,
      ...prevComments,
    ]);
  };

  // Edit comment
  const handleEditClick = (comment) => {
    setModalContent(
      <EditCommentModal
        comment={comment}
        onEditComplete={(updatedComment) => {
          setComments((prevComments) =>
            prevComments.map((c) =>
              c.id === updatedComment.id ? updatedComment : c
            ).sort((a, b) => new Date(b.created_at) - new Date(a.created_at)) 
          );
        }}
      />
    );
  };

  // Delete comment
  const handleDeleteClick = (commentId) => {
    setModalContent(
      <DeleteCommentModal
        onDelete={async () => {
          try {
            await deleteComment(commentId);
            setComments((prevComments) =>
              prevComments.filter((comment) => comment.id !== commentId)
            );
            closeModal();
          } catch (error) {
            console.error("Failed to delete comment:", error);
          }
        }}
      />
    );
  };

  const filteredComments = comments.filter(
    (comment) => comment.pin_id === pin.id
  );

  function timeAgo(dateString) {
    const postDate = new Date(dateString);
    const now = new Date();
    const timeDifference = now - postDate;
    const minutesDifference = Math.floor(timeDifference / (1000 * 60));
    const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    if (daysDifference > 0) {
      return `${daysDifference} day${daysDifference > 1 ? "s" : ""} ago`;
    } else if (hoursDifference > 0) {
      return `${hoursDifference} hour${hoursDifference > 1 ? "s" : ""} ago`;
    } else if (minutesDifference > 0) {
      return `${minutesDifference} minute${
        minutesDifference > 1 ? "s" : ""
      } ago`;
    } else {
      return "Just now";
    }
  }

  return (
    <>
      <h1>Comments</h1>
      <div id="comments-main-container">
        <div id="comments-shown-here">
          {filteredComments.map((comment) => (
            <div key={comment.id}>
              <div className="comment-item">
                <img
                  src={comment.user.profile_image_url}
                  alt="User profile"
                  className="comments-user-profile-pic"
                />
                <div
                  className="comment-user-name"
                  style={{ fontWeight: "bold" }}
                >
                  {comment.user.first_name}
                </div>
                <div className="comment-content">{comment.comment}</div>
              </div>
              <div className="date-edit-and-delete-comment-buttons">
                {timeAgo(comment.created_at)}
                {currentUser && currentUser.id === comment.user.id && (
                  <button onClick={() => handleEditClick(comment)}>Edit</button>
                )}
                {currentUser && currentUser.id === comment.user.id && (
                  <button onClick={() => handleDeleteClick(comment.id)}>
                    Delete
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div id="post-comment-here">
        {currentUser ? (
          <CommentForm
            pinId={pinId}
            onCommentSubmitted={handleCommentSubmitted}
            canLeaveComment={true}
          />
        ) : (
          <p>You must be logged in to leave a comment.</p>
        )}
      </div>
    </>
  );
}

export default Comment;
