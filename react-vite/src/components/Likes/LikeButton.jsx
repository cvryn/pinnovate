import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addLike, removeLike, fetchLikedPins } from "../../redux/likeReducer";
import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";

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
    {/* <h1>ʕ*•͈ ﻌ •͈ʔฅ</h1> */}
    <div style={{ display: "flex", alignItems: "center" }}>
      <button
        onClick={handleLikeClick}
        style={{
          border: "none",
          background: "transparent",
          cursor: "pointer",
        }}
      >
        {liked ? (
          <IoMdHeart style={{ color: "rgb(208, 14, 35)", height: "30px", width: "30px" }} />
        ) : (
          <IoMdHeartEmpty style={{ height: "30px", width: "30px" }} />
        )}
      </button>
      {liked && <span style={{ marginLeft: "8px" }}>Liked!</span>}
    </div>
    </>
  );
};

export default LikeButton;
