import { Link } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { FaPen } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";
import { FaHashtag } from "react-icons/fa";
import EditPinModal from "./EditPinModal";
import DeletePinModal from "./DeletePinModal";
import EditTagModal from "../Tags/EditTagModal";

import "./PinItemsManage.css";

function PinItemsManage({ pins, onDelete, onEdit }) {
  const { setModalContent, closeModal } = useModal();

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
              <img src={pin.image_url[0]} alt={pin.title} />
            </Link>
            <div className="pin-item-content">
              {pin.description !== "null" && (
                <p>{pin.description || "No description available"}</p>
              )}
              {pin.description === "null" && (
                <p>{"No description available"}</p>
              )}
              <p>
                {pin.tags && pin.tags.length > 0
                  ? pin.tags
                      .filter((tag) => tag?.name)
                      .map((tag) => `#${tag.name}`)
                      .join(", ")
                  : "No tags"}
              </p>
              </div>
              <div className="pin-actions-buttons">
                <button
                  className="edit-pin-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEditClick(pin);
                  }}
                >
                  <FaPen className='pin-icons' />
                </button>
                <button
                  className="edit-tags-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEditTagsClick(pin);
                  }}
                >
                  <FaHashtag className='pin-icons' />
                </button>
                <button
                  className="delete-pin-button-manage"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteClick(pin.id);
                  }}
                >
                  <FaTrashCan className='pin-icons' />
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

export default PinItemsManage;
