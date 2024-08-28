import { useModal } from "../../context/Modal";
import './DeletePinModal.css';

function DeletePinModal({ pinId, onDelete }) {
  const { closeModal } = useModal();

  const handleDelete = async () => {
    await onDelete(pinId);
    closeModal();
  };

  return (
    <div id="delete-pin-modal-container">
      <h1>Confirm Pin Deletion</h1>
      <p>Are you sure you want to delete this pin?</p>
      <div className="modal-buttons">
        <button className='delete-button-confirm' onClick={handleDelete}>Yes, Delete</button>
        <button className='delete-button-no' onClick={closeModal}>No, Cancel</button>
      </div>
    </div>
  );
}

export default DeletePinModal;
