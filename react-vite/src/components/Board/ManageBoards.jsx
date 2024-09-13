import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import BoardItems from "./BoardItems";
import catloading from "../../../public/cat-what.gif";
import { fetchBoards, deleteBoard } from "../../router/boardLoader";

const ManageBoards = () => {
  const [boards, setBoards] = useState([]);
  const [loading, setLoading] = useState(true);

  const currentUser = useSelector((state) => state.session.user);


  const fetchBoardsData = async () => {
    try {
      const data = await fetchBoards();
      setBoards(data);
    } catch (error) {
      console.error("Failed to fetch boards:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBoardsData();
  }, []);

  const handleDeleteBoard = async (boardId) => {
    try {
      await deleteBoard(boardId);
      setBoards((prevBoards) => prevBoards.filter((board) => board.id !== boardId));
    } catch (error) {
      console.error("Failed to delete board:", error);
    }
  };

  const handleEditBoard = (updatedBoard) => {
    setBoards((prevBoards) =>
      prevBoards.map((board) =>
        board.id === updatedBoard.id ? { ...board, ...updatedBoard } : board
      )
    );
  };

  const currentUserBoards = boards.filter((board) => board.user_id === currentUser.id);

  if (loading) {
    return (
      <div
        id="loading-screen"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <div className="loader">Loading pins right meow...</div>
        <div>
          <img src={catloading} alt="Loading" />
        </div>
      </div>
    );
  }

  return (
    <>
      {/* <h1>ʕง•ᴥ•ʔง</h1> */}
      <h1> Manage Boards</h1>
      {currentUserBoards.length > 0 ? (
        <BoardItems
          boards={currentUserBoards}
          onEdit={handleEditBoard}
          onDelete={handleDeleteBoard}
        />
      ) : (
        <p>No boards available.</p>
      )}
    </>
  );
};

export default ManageBoards;
