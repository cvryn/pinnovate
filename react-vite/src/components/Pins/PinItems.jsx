import { Link } from "react-router-dom";
import { useModal } from "../../context/Modal";
import EditPinModal from "./EditPinModal";
import DeletePinModal from "./DeletePinModal";
import EditTagModal from "../Tags/EditTagModal";

import "./PinItems.css";

function PinItems({ pins, onDelete, onEdit }) {
  const { setModalContent, closeModal } = useModal();

  console.log(pins)

  const handleEditClick = (pin) => {
    setModalContent(
      <EditPinModal
        pin={pin}
        onEditComplete={(updatedPin) => {
          onEdit(updatedPin);
          closeModal();
        }}
        onClose={closeModal}
      />
    );
  };

  const handleDeleteClick = (pinId) => {
    setModalContent(
      <DeletePinModal
        onDelete={async () => {
          try {
            await onDelete(pinId);
            closeModal();
          } catch (error) {
            console.error("Failed to delete pin:", error);
          }
        }}
      />
    );
  };

  const handleEditTagsClick = (pin) => {
    setModalContent(
      <EditTagModal
        pin={pin}
        onTagUpdate={async (pinId, updatedTags) => {
          try {
            await onEdit({ ...pin, tags: updatedTags });
            closeModal();
          } catch (error) {
            console.error("Failed to update tags:", error);
          }
        }}
      />
    );
  };

  return (
    <div id="pin-items-container">
      {pins && pins.length > 0 ? (
        pins.map((pin) => (
          <div key={pin.id} className="pin-item">
            <Link to={`/pins/${pin.id}`}>
              <img src={pin.image_url} alt={pin.title} />
            </Link>
            <div className="pin-item-content">
              <h3>{pin.title}</h3>
              {pin.description !== "null" && <p>{pin.description || "No description available"}</p>}
              {pin.description === "null" && <p>{"No description available"}</p>}
              <p>
                {pin.tags && pin.tags.length > 0
                  ? pin.tags.map(tag => `#${tag.name}`).join(", ")
                  : "No tags"}
              </p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleEditClick(pin);
                }}
              >
                Edit
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteClick(pin.id);
                }}
              >
                Delete
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleEditTagsClick(pin);
                }}
              >
                Edit Tags
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>No pins available.</p>
      )}
    </div>
  );
}

export default PinItems;
