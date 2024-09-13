import './DeletePinFromBoard.css'

const DeletePinFromBoardModal = ({ onDelete, onClose }) => {
    const handleDelete = async () => {
      try {
        await onDelete();
        onClose();
      } catch (error) {
        console.error("Failed to delete board:", error);
      }
    };

    return (
      <div id="delete-pin-from-board-modal-container">
        <h1>Confirm Pin Removal</h1>
        <p>Are you sure you want to remove this pin from the board?</p>
        <div className='delete-pin-from-board-modal-buttons'>
        <button onClick={handleDelete}>Yes, Delete</button>
        <button onClick={onClose}>No, Cancel</button>

        </div>
      </div>
    );
  };

  export default DeletePinFromBoardModal;
