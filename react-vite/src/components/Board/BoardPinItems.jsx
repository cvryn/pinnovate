import { Link } from "react-router-dom";
import { FaTrashCan } from "react-icons/fa6";
import { useModal } from "../../context/Modal";
import DeletePinFromBoardModal from "../Pins/DeletePinFromBoardModal";
import './BoardPinItems.css';

const BoardPinItems = ({ boardPins, onDelete }) => {
  const { setModalContent, closeModal } = useModal();

  const handleDeleteClick = (pinId) => {
    setModalContent(
      <DeletePinFromBoardModal
        onDelete={async () => {
          try {
            await onDelete(pinId);
            closeModal();
          } catch (error) {
            console.error("Failed to delete pin:", error);
          }
        }}
        onClose={closeModal}
      />
    );
  };

  return (
    <div id="board-pins-container">
      {boardPins.length > 0 ? (
        boardPins.map((pin) => (
          <div key={pin.id} className='boardpin-item-container'>
            <Link to={`/pins/${pin.id}`} className='boardpin-item'>
              <img src={pin.image_url} alt={pin.title} />
            </Link>
            <button className='delete-pin-button' onClick={() => handleDeleteClick(pin.id)}>
              <FaTrashCan className='board-icons' />
            </button>
          </div>
        ))
      ) : (
        <div>
        <p>No Pins In This Board.</p>
        <Link to="/">
          <div className="no-boards-container">Add Some Pins</div>
        </Link>
      </div>
      )}
    </div>
  );
};

export default BoardPinItems;
