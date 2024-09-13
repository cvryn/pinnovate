import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchBoards } from "../../router/boardLoader";
import { addPinToBoard, fetchBoardPins } from "../../router/boardPinLoader";
import { useModal } from "../../context/Modal";
import './AddPinToBoardModal.css'

const AddPinToBoardModal = ({ pinId, onClose }) => {
  const [boards, setBoards] = useState([]);
  const [selectedBoardId, setSelectedBoardId] = useState(null);
  const [errors, setErrors] = useState({});
  const currentUser = useSelector((state) => state.session.user);

  const { closeModal } = useModal();

  useEffect(() => {
    const loadBoards = async () => {
      if (currentUser) {
        const allBoards = await fetchBoards(currentUser.id);

        const updatedBoards = await Promise.all(
          allBoards.map(async (board) => {
            const pins = await fetchBoardPins(board.id);
            const isPinInBoard = pins.some((pin) => pin.id === pinId);
            return { ...board, isPinInBoard };
          })
        );

        const userBoards = updatedBoards.filter(
          (board) => board.user_id === currentUser.id
        );
        // console.log("Filtered boards:", userBoards);
        setBoards(userBoards);
      }
    };
    loadBoards();
  }, [currentUser, pinId]);

  const validateForm = () => {
    const newErrors = {};
    const selectedBoard = boards.find((board) => board.id === selectedBoardId);

    if (selectedBoard && selectedBoard.isPinInBoard) {
      newErrors.board = "This pin is already in the selected board.";
    }

    return newErrors;
  };

  const handleBoardSelect = (e) => {
    setSelectedBoardId(e.target.value);
    setErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    if (selectedBoardId) {
      try {
        await addPinToBoard(selectedBoardId, pinId);
        closeModal();
      } catch (error) {
        if (error.message.includes("Pin already exists")) {
          setErrors({ board: "This pin is already in the selected board." });
        } else {
          setErrors({
            general: "Failed to add pin to board. Please try again.",
          });
        }
      }
    }
  };

  return (
    <div>
      {/* <h1>ʕง•ᴥ•ʔง</h1> */}
      <div id='add-pin-to-board-modal-container'>

      <h2>Select a board to save this pin!</h2>

      <form onSubmit={handleSubmit}>
        <div className="board-selection">
          <select value={selectedBoardId || ""} onChange={handleBoardSelect}>
            <option value="" disabled>
              Select a board
            </option>
            {boards.map((board) => (
              <option
                key={board.id}
                value={board.id}
                disabled={board.isPinInBoard}
              >
                {board.name} {board.isPinInBoard && "(Already added)"}
              </option>
            ))}
          </select>
        </div>
        <div className="error-container-add-pin-to-board">
        {errors.board && <p>{errors.board}</p>}
      </div>

        <div className="add-pin-to-board-buttons">
          <button type="submit" disabled={!selectedBoardId}
          className='add-pin-to-board-save-button'>
            Save
          </button>
          <button type="button" onClick={onClose || closeModal}>
            Cancel
          </button>
        </div>
      </form>
      </div>
    </div>
  );
};

export default AddPinToBoardModal;
