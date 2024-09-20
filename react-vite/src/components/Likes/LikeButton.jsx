import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addLike, removeLike, fetchLikedPins } from "../../redux/likeReducer";
import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";
import "./LikeButton.css";

const LikeButton = ({ currentUser, pinId }) => {
  const dispatch = useDispatch();
  const likedPins = useSelector((state) => state.like);
  const liked = likedPins[pinId];

  useEffect(() => {
    if (currentUser) {
      dispatch(fetchLikedPins());
    }
  }, [dispatch, currentUser]);

  const handleLikeClick = async () => {
    try {
      if (liked) {
        await dispatch(removeLike(pinId));
      } else {
        await dispatch(addLike(pinId));
      }
    } catch (error) {
      console.error("Error handling like/unlike:", error);
    }
  };

  if (!currentUser) return null;

  return (
    <>
      {/* <h1>ʕ•͈ ﻌ •͈ʔฅ</h1> */}
      <div className="like-button-container">
        <button onClick={handleLikeClick} className="like-button">
          {liked ? (
            <IoMdHeart className="heart-icon liked" />
          ) : (
            <IoMdHeartEmpty className="heart-icon empty" />
          )}
        </button>
        {liked && <span className="liked-text">Liked!</span>}
      </div>
    </>
  );
};

export default LikeButton;
