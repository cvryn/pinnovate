import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { fetchPins } from "../../redux/pinReducer";
import { Link, useParams } from "react-router-dom";
import Comment from "../Comment/Comment";
import AddPinToBoardModal from "./AddPinToBoardModal";
import { useModal } from "../../context/Modal";
import LikeButton from "../Likes/LikeButton";
import { fetchLikedPins } from "../../redux/likeReducer";

import "./PinDetails.css";

function PinDetails() {
  const { pinId } = useParams();
  const dispatch = useDispatch();
  const { setModalContent, closeModal } = useModal();

  const pin = useSelector((state) => state.pin.allPins[pinId]) || {};
  const currentUser = useSelector((state) => state.session.user);

  useEffect(() => {
    if (pinId) {
      dispatch(fetchPins(pinId));
    }
    if (currentUser) {
      dispatch(fetchLikedPins());
    }
  }, [dispatch, pinId, currentUser]);

  const handleAddPinClick = () => {
    setModalContent(<AddPinToBoardModal pinId={pinId} onClose={closeModal} />);
  };

  return (
    <div id="pin-details-main-container">
      <section id="left-section-container-pin-details">
        <Link to="/">
          <div>
            <IoMdArrowBack style={{ height: "30px", width: "30px" }} />
          </div>
        </Link>
      </section>
      <section id="middle-main-content-section">
        <div id="main-left-container">
          <img
           className="pin-details-image-display"
            src={
              Array.isArray(pin.image_url) ? pin.image_url[0] : pin.image_url
            }
            alt={pin.title}
          />
        </div>
        <div id="main-right-container">
          {currentUser && (
            <section id="top-section-likes-pin-container">
              <div id="left-section-likes-pin">
                <LikeButton currentUser={currentUser} pinId={pinId} />
              </div>
              <div id="right-section-likes-pin">
                <button
                  onClick={handleAddPinClick}
                  className="save-pin-button-details"
                >
                  Save Pin
                </button>
              </div>
            </section>
          )}
          <section id="title-description-pin-details-container">
            <div id="pin-title-description-container">
              <h1 style={{ fontSize: "30px" }} className="title-pin-details">
                {pin?.title}
              </h1>
              <div className="description-pin-details">{pin?.description}</div>
              <br />
              <div className="pin-tags-pin-details">
                {pin?.tags?.map((tag) => `#${tag.name}`).join(", ")}
              </div>
            </div>
          </section>
          <section id="left-section-middle-pin-creator-follow">
            <div id="pin-creator-details">
              <img
                src={pin?.user_profile_image_url}
                alt="pin creator profile pic"
                className="pin-creator-profile-pic"
              ></img>
              <h2
                className="pin-creator-username"
                style={{ fontWeight: "bold" }}
              >
                {pin?.user_username}
              </h2>
            </div>
          </section>
          <section id="left-section-comments-container">
            <div id="show-comments">
              {pin && (
                <Comment pinId={pinId} pin={pin} currentUser={currentUser} />
              )}
            </div>
          </section>
        </div>
      </section>
      <section id="right-section-container-pin-details"></section>
    </div>
  );
}

export default PinDetails;
