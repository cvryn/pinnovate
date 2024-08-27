import { Link } from "react-router-dom";
import { useModal } from "../../context/Modal";
import EditPinModal from "./EditPinModal";
import DeletePinModal from "./DeletePinModal";
import "./PinItems.css";

function PinItems({ pins, onDelete, onEdit }) {
  const { setModalContent, closeModal } = useModal();

  console.log('!!!!!!!!!//', pins[0].tags[0].name);

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
              <p>{pin.description || "No description available"}</p>
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
