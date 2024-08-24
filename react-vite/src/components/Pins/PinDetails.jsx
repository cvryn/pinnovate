import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { IoMdArrowBack } from "react-icons/io";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoMdHeart } from "react-icons/io";

import PinItems from "./PinItems";

import { fetchPins } from "../../redux/pinReducer";
import { useParams } from "react-router-dom";
import "./PinDetails.css";

function PinDetails() {
  const { pinId } = useParams();
  // console.log(pinId)

  const dispatch = useDispatch();

  // Get all the pins
  useEffect(() => {
    dispatch(fetchPins());
  }, [dispatch]);

  const pin = useSelector((state) => state.pin.allPins[pinId]);
  console.log("all pins", pin);


  return (
    <>
      <h1>ʕ*•ﻌ•ʔฅ</h1>
      <div id="pin-details-main-container">
        <section id="left-section-container-pin-details">
          <div>
            <IoMdArrowBack />
          </div>
        </section>
        <section id="middle-main-content-section">
          <div id="main-left-container">
            <img
              className="pin-details-image-display"
              src={pin.image_url}
              alt="pin image"
            ></img>
          </div>
          <div id="main-right-container">
            <section id="top-section-likes-pin-container">
              <div id="left-section-likes-pin">
                <button>
                <IoMdHeartEmpty />
                {/* <IoMdHeart /> */}
                </button>
              </div>
              <div id="right-section-likes-pin">
                <button>Save or Pin Button</button>
              </div>
            </section>
            <section id='left-section-middle-pin-creator-follow'>
                <div id='pin-creator-details'>
                {pin.user_username}
                </div>
                {/* <div id='pin-creator-follow-button'>
                ʕ*•ﻌ•ʔฅ Follow Button
                </div> */}
            </section>
            <section id="left-section-more-like-this">
              <div id="more-like-this-by-tags">
              More like this
              </div>
              <div id="more-like-this-by-tags-pins">
              {/* <PinItems /> */}
              </div>
            </section>
            <section id="left-section-comments-container">
              <div id="show-comments">
              ʕ*•ﻌ•ʔฅ
              </div>
              <div id="add-comment">
              ʕ*•ﻌ•ʔฅ
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
