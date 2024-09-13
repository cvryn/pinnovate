import { Link } from "react-router-dom";
import { FaLock, FaPen } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";
import { useModal } from "../../context/Modal";
import EditBoardModal from "./EditBoardModal";
import DeleteBoardModal from "./DeleteBoardModal";
import defaultboardimg from "../../../public/blank-board-default-image.png";

import "./BoardItems.css";

function BoardItems({ boards, onEdit, onDelete }) {
  const { setModalContent, closeModal } = useModal();

//   console.log(boards)

  const handleEditClick = (board) => {
    setModalContent(
      <EditBoardModal
        board={board}
        onEditComplete={(updatedBoard) => {
          onEdit(updatedBoard);
          closeModal();
        }}
        onClose={closeModal}
      />
    );
  };

  const handleDeleteClick = (boardId) => {
    setModalContent(
      <DeleteBoardModal
        onDelete={async () => {
          try {
            await onDelete(boardId);
            closeModal();
          } catch (error) {
            console.error("Failed to delete board:", error);
          }
        }}
        onClose={closeModal}
      />
    );
  };

  return (
    <div id="board-items-container">
      {boards.map((board) => (
        <div key={board.id} className="board-item">
          <Link to={`/boards/${board.id}`}>
            <img
              src={board.board_image_url || defaultboardimg }
              alt={board.name}
              className="board-image"
            />
            <div className="board-name">
              <h3>{board.name}</h3>
              {board.private && (
                <FaLock
                  className="board-private-icon"
                  onClick={() => handleEditClick(board)}
                />
              )}
            </div>
          </Link>
          <div className="board-actions-buttons">
            <button onClick={() => handleEditClick(board)}>
              <FaPen className='board-icons' />
            </button>
            <button onClick={() => handleDeleteClick(board.id)}>
              <FaTrashCan  className='board-icons'/>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default BoardItems;
