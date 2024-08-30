import { useState } from "react";
import { useModal } from "../../context/Modal";
import { updateComment } from "../../router/comment";
import './EditCommentModal.css';

const EditCommentModal = ({ comment, onEditComplete }) => {
  const { closeModal } = useModal();
  const [updatedComment, setUpdatedComment] = useState(comment.comment);
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Validate the updated comment text
  const validate = () => {
    const newErrors = {};

    if (!updatedComment.trim()) {
      newErrors.updatedComment = "Cannot edit to an empty comment";
    } else if (updatedComment.length > 225) {
      newErrors.updatedComment = "Comments cannot exceed 225 characters";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const updatedData = {
      comment: updatedComment.trim(),
    };

    try {
      const updatedCommentData = await updateComment(comment.id, updatedData);
      onEditComplete(updatedCommentData);
      closeModal();
    } catch (error) {
      console.error("Failed to update comment:", error);
    }
  };

  // Handle change in comment textarea
  const handleChange = (e) => {
    const newCommentText = e.target.value;
    setUpdatedComment(newCommentText);

    if (isSubmitted) {
      const newErrors = validate();
      setErrors(newErrors);
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
            onChange={handleChange}
            style={{ width: '100%', resize: 'none', marginTop: '10px', padding: '10px' }}
            required
          />
          {errors.updatedComment && (
            <div className="error-container-edit-comment">
              <p>{errors.updatedComment}</p>
            </div>
          )}
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
