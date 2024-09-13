import { Link } from "react-router-dom";

import './BoardPinItems.css'

const BoardPinItems = ({ boardPins }) => {
//   console.log("boardPins", boardPins);

  return (
    <>
      {/* <h1>ʕ*•͈ ﻌ •͈ʔฅ</h1> */}
      <div id="board-pins-container">
        {boardPins.length > 0 ? (
          boardPins.map((pin) => (
            <Link key={pin.id} to={`/pins/${pin.id}`} className='boardpin-item'>
              <img src={pin.image_url} alt={pin.title} />
            </Link>
          ))
        ) : (
          <p>No Pins in the board</p>
        )}
      </div>
    </>
  );
};

export default BoardPinItems;
