import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { IoMdArrowBack } from "react-icons/io";
// import { IoMdHeartEmpty } from "react-icons/io";
import { fetchPins } from "../../redux/pinReducer";
import { Link, useParams } from "react-router-dom";
import Comment from "../Comment/Comment";
import AddPinToBoardModal from "./AddPinToBoardModal";
import { useModal } from "../../context/Modal";

import "./PinDetails.css";


function PinDetails() {
  const { pinId } = useParams();
  const dispatch = useDispatch();
  const { setModalContent, closeModal } = useModal();

  useEffect(() => {
    dispatch(fetchPins(pinId));
  }, [dispatch, pinId]);

  const pin = useSelector((state) => state.pin.allPins[pinId]) || {};
  const currentUser = useSelector((state) => state.session.user);

  const handleAddPinClick = () => {
    setModalContent(
      <AddPinToBoardModal
        pinId={pinId}
        onClose={closeModal}
      />
    );
  };

  return (
    <>
      <div id="pin-details-main-container">
        <section id="left-section-container-pin-details">
          <Link to="/">
            <div>
              <IoMdArrowBack style={{ height: "30px", width: '30px' }} />
            </div>
          </Link>
        </section>
        <section id="middle-main-content-section">
          <div id="main-left-container">
            <img
              className="pin-details-image-display"
              src={pin?.image_url}
              alt="pin image"
            />
          </div>
          <div id="main-right-container">
            {currentUser &&
              <section id="top-section-likes-pin-container">
                <div id="left-section-likes-pin">
                  {/* <button>
                    <IoMdHeartEmpty />
                  </button> */}
                  Like
                </div>
                <div id="right-section-likes-pin">
                  <button onClick={handleAddPinClick} className='save-pin-button'>
                    Save Pin
                  </button>
                </div>
              </section>
            }
            <section id="title-description-pin-details-container">
              <div id="pin-title-description-container">
                <div>
                  <h1 style={{ fontSize: '30px' }} className='title-pin-details'>{pin?.title}</h1>
                </div>
                <div>
                  <div className='description-pin-details'>{pin?.description}</div>
                  <br />
                  <div className='pin-tags-pin-details'>{pin?.tags?.map(tag => `#${tag.name}`).join(", ")}</div>
                </div>
              </div>
            </section>
            <section id="left-section-middle-pin-creator-follow">
              <div id="pin-creator-details">
                <img src={pin?.user_profile_image_url} alt='pin creator profile pic' className='pin-creator-profile-pic'></img>
                <h2 className='pin-creator-username' style={{ fontWeight: 'bold' }}>
                  {pin?.user_username}
                </h2>
              </div>
            </section>
            <section id="left-section-comments-container">
              <div id="show-comments">
                {pin && <Comment pinId={pinId} pin={pin} currentUser={currentUser} />}
              </div>
            </section>
          </div>
        </section>
        <section id="right-section-container-pin-details"></section>
      </div>
    </>
  );
}

export default PinDetails;
