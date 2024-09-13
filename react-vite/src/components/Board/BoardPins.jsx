import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBoardPins,
  removeAPinFromBoard,
} from "../../redux/boardPinReducer";
import { useParams } from "react-router-dom";
import BoardPinItems from "./BoardPinItems";

const BoardPins = () => {
  const dispatch = useDispatch();
  const { boardId } = useParams();

  const boardPinsObj = useSelector((state) => state.boardPins.boardPins);
  const boardPins = Object.values(boardPinsObj);

  useEffect(() => {
    dispatch(fetchBoardPins(boardId));
  }, [dispatch, boardId]);

  const handleDeletePin = async (pinId) => {
    try {
      await dispatch(removeAPinFromBoard(boardId, pinId));
    } catch (error) {
      console.error("Failed to delete pin:", error);
    }
  };


  return (
    <div id="board-pins-main-container">
      <BoardPinItems boardPins={boardPins} onDelete={handleDeletePin} />
    </div>
  );
};

export default BoardPins;
