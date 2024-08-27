import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import PinItems from "./PinItems";
import { removePin, fetchPins } from '../../redux/pinReducer';
import { fetchTags } from "../../redux/tagReducer";
import EditPinModal from "./EditPinModal";
import { useModal } from "../../context/Modal";

// import "./ManagePins.css";
import "./PinItems.css";

const ManagePins = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { setModalContent } = useModal();

  const currentUser = useSelector((state) => state.session.user);
  const pinsObject = useSelector((state) => state.pin.allPins);
  const pins = Object.values(pinsObject);

  const tagsObject = useSelector((state) => state.tag.allTags);
  const tags = Object.values(tagsObject);

  const currentUserId = currentUser?.id;

  const userPins = pins.filter((pin) => pin.user_id === currentUserId);

  useEffect(() => {
    if (!currentUser) {
      navigate("/");
    } else {
      dispatch(fetchPins());
      dispatch(fetchTags());
    }
  }, [currentUser, navigate, dispatch]);

  const handleDeletePin = async (pinId) => {
    try {
      await dispatch(removePin(pinId));
      dispatch(fetchPins());
    } catch (error) {
      console.error("Failed to delete pin:", error);
    }
  };

  const handleEditPin = (pin) => {
    setModalContent(
      <EditPinModal
        pin={pin}
        onEditComplete={(updatedPin) => {
          dispatch(fetchPins());
        }}
        onClose={() => setModalContent(null)}
      />
    );
  };

  return (
    <div style={{ minHeight: "1000px" }}>
      <br />
      <h1 style={{ padding: "10px" }}>Manage My Pins</h1>
      <br />
      <div id="pin-container-collection">
        {userPins.length > 0 ? (
          <PinItems
            pins={userPins}
            tags={tags}
            onDelete={handleDeletePin}
            onEdit={handleEditPin}
          />
        ) : (
          <div className="no-pins-container">
            <div>No pins found.</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManagePins;
