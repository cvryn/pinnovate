import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBoardPins } from "../../redux/boardPinReducer"
import { useParams } from "react-router-dom";
import BoardPinItems from "./BoardPinItems";

const BoardPins = () => {
    const dispatch = useDispatch();
    const{ boardId } = useParams()

    // console.log('boardid', boardId)

    const boardPinsObj = useSelector((state) => state.boardPins.boardPins)
    console.log("boardpinsObj", boardPinsObj)

    const boardPins = Object.values(boardPinsObj)

    useEffect(() => {
        dispatch(fetchBoardPins(boardId));
    }, [dispatch, boardId])



    return (
        <>
          {/* <h1>ʕ*•͈ ﻌ •͈ʔฅ</h1> */}
          {/* <h1>{board?.name}</h1> */}
          <div id="board-pins-main-container">
            <BoardPinItems boardPins={boardPins}/>
          </div>
        </>
      );

}


export default BoardPins;
