import { useModal } from "../../context/Modal";
import './DeleteCommentModal.css';

function DeleteCommentModal({ onDelete }) {
  const { closeModal } = useModal();

  const handleDelete = async () => {
    await onDelete();
    closeModal();
  };

  return (
    <div id="container-delete-comment-modal">
      <h1>Confirm Comment Deletion</h1>
      <p>Are you sure you want to delete this comment?</p>
      <div className="modal-buttons">
        <button className='delete-button-confirm' onClick={handleDelete}>Yes, Delete</button>
        <button className='delete-button-no' onClick={closeModal}>No, Cancel</button>
      </div>
    </div>
  );
}

export default DeleteCommentModal;
