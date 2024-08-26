import { useState } from "react";
import { useModal } from "../../context/Modal";
import { updateComment } from "../../router/comment"; 
import './EditCommentModal.css';

const EditCommentModal = ({ comment, onEditComplete }) => {
  const { closeModal } = useModal();
  const [updatedComment, setUpdatedComment] = useState(comment.comment);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedData = {
      comment: updatedComment,
    };

    try {
      const updatedCommentData = await updateComment(comment.id, updatedData);
      onEditComplete(updatedCommentData);
      closeModal();
    } catch (error) {
      console.error("Failed to update comment:", error);
    }
  };

  return (
    <div id="edit-comment-modal">
      <h1>Edit Comment</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Comment:</label>
          <textarea
            value={updatedComment}
            onChange={(e) => setUpdatedComment(e.target.value)}
            style={{ width: '100%', resize: 'none', marginTop: '10px', padding: '10px' }}
            required
          />
        </div>
        <div className="modal-buttons">
          <button type="submit">Save Changes</button>
          <button type="button" onClick={closeModal}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditCommentModal;
