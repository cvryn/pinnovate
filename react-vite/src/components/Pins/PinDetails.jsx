import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { IoMdArrowBack, IoMdHeartEmpty } from "react-icons/io";
import { fetchPins } from "../../redux/pinReducer";
import { Link, useParams } from "react-router-dom";
import "./PinDetails.css";
import Comment from "../Comment/Comment";

function PinDetails() {
  const { pinId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPins(pinId));
  }, [dispatch, pinId]);

  const pin = useSelector((state) => state.pin.allPins[pinId]) || {};
  const currentUser = useSelector((state) => state.session.user)
  // console.log('CURRRRRRRR', currentUser)

  console.log("THIS PIN", pin);

  return (
    <>
      {/* <h1>ʕ*•ﻌ•ʔฅ</h1> */}
      <div id="pin-details-main-container">
        <section id="left-section-container-pin-details">
          <Link to="/">
            <div>
              <IoMdArrowBack style={{height: "30px", width: '30px'}}/>
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
            <section id="top-section-likes-pin-container">
              <div id="left-section-likes-pin">
                {/* <button>
                  <IoMdHeartEmpty />
                </button> */}
                Like
              </div>
              <div id="right-section-likes-pin">
                {/* <button>Save or Pin Button</button> */}
                <div>Save Pin</div>
              </div>
            </section>
            <section id="title-description-pin-details-container">
              <div id="pin-title-description-container">
                <div>
                  <h1 style={{fontSize: '30px'}}>{pin?.title}</h1>
                </div>
                <div>
                  <div>{pin.description}</div>
                  <br />
                  <div>{pin?.tags?.map(tag => `#${tag.name}`).join(", ")}</div>
                </div>
              </div>
            </section>
            <section id="left-section-middle-pin-creator-follow">
              <div id="pin-creator-details">
                <img src={pin?.user_profile_image_url} alt='pin creator profile pic' className='pin-creator-profile-pic'></img>
                <h2 className='pin-creator-username' style={{fontWeight: 'bold'}}>
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
