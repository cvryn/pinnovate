import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchPins } from "../../redux/pinReducer";
import catloading from "../../../public/cat-what.gif";
import "./PinItemsHomePage.css";
import { Link } from "react-router-dom";
import Masonry from "react-masonry-css";
import { useModal } from "../../context/Modal";
import AddPinToBoardModal from "./AddPinToBoardModal";
import LikeButton from "../Likes/LikeButton";

function PinItemsHomePage() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const { setModalContent } = useModal();
  const allPins = useSelector((state) => state.pin.allPins);
  const currentUser = useSelector((state) => state.session.user);
  const likedPins = useSelector((state) => state.like);
  const [hoveredPin, setHoveredPin] = useState(null);

  useEffect(() => {
    const loadPins = async () => {
      await dispatch(fetchPins());
      setLoading(false);
    };

    loadPins();
  }, [dispatch]);

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

  const pinsArray = Array.isArray(allPins) ? allPins : Object.values(allPins);
  const sortedPins = pinsArray.sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  );

  const handleSavePinClick = (pinId) => {
    setModalContent(
      <AddPinToBoardModal pinId={pinId} onClose={() => setModalContent(null)} />
    );
  };

  return (
    <div id="pin-items-container-hp">
      {sortedPins.length > 0 ? (
        <Masonry
          breakpointCols={{
            default: 6,
            1400: 5,
            1200: 4,
            900: 3,
            600: 2,
            500: 1,
          }}
          className="masonry-grid"
          columnClassName="masonry-grid-column"
        >
          {sortedPins.map((pin) => (
            <div
              key={pin.id}
              className="pin-item-hp"
              onMouseEnter={() => setHoveredPin(pin.id)}
              onMouseLeave={() => setHoveredPin(null)}
            >
              <Link to={`/pins/${pin.id}`}>
                <img
                  src={
                    Array.isArray(pin.image_url)
                      ? pin.image_url[1]
                      : pin.image_url
                  }
                  alt={pin.title}
                />
              </Link>
              <div className="like-button-container-hp">
                {likedPins[pin.id] || hoveredPin === pin.id ? (
                  <LikeButton
                    currentUser={currentUser}
                    pinId={pin.id}
                    className="heart-icon-hp"
                  />
                ) : null}
              </div>
              {currentUser && (
                <button
                  className="save-pin-button"
                  onClick={() => handleSavePinClick(pin.id)}
                >
                  Save Pin
                </button>
              )}
            </div>
          ))}
        </Masonry>
      ) : (
        <p>No pins available.</p>
      )}
    </div>
  );
}

export default PinItemsHomePage;
