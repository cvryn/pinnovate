import './DeleteBoardModal.css'

const DeleteBoardModal = ({ onDelete, onClose }) => {
    const handleDelete = async () => {
      try {
        await onDelete();
        onClose();
      } catch (error) {
        console.error("Failed to delete board:", error);
      }
    };

    return (
      <div id="delete-board-modal-container">
        <h1>Confirm Board Deletion</h1>
        <p>Are you sure you want to delete this board?</p>
        <div className='delete-boards-modal-buttons'>
        <button onClick={handleDelete}>Yes, Delete</button>
        <button onClick={onClose}>No, Cancel</button>

        </div>
      </div>
    );
  };

  export default DeleteBoardModal;
