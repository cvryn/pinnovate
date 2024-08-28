import { useState, useEffect } from "react";
import { updatePin } from "../../router/pin";
import './EditPinModal.css'

const EditPinModal = ({ pin, onEditComplete, onClose }) => {
  const [title, setTitle] = useState(pin?.title || "");
  const [description, setDescription] = useState(pin?.description || "");
  const [imageUrl, setImageUrl] = useState(pin?.image_url || "");
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const pinData = {
      title,
      description,
      image_url: imageUrl,
    };

    try {
      const updatedPin = await updatePin(pin.id, pinData);
      onEditComplete(updatedPin);
      onClose();
    } catch (error) {
      setErrors((prev) => ({ ...prev, general: "Failed to update pin" }));
    }
  };

  const handleImageUrlChange = (e) => {
    setImageUrl(e.target.value);
  };

  const handleRemoveImage = () => {
    setImageUrl("");
  };


  return (
    <div>
      <div id="edit-pin-modal-container">
      <h1>Edit Pin</h1>
        <form onSubmit={handleSubmit}>
          <div id="image-url-container">
            <label htmlFor="image_url">Image URL:</label>
            <input
              type="text"
              id="image_url"
              value={imageUrl}
              onChange={handleImageUrlChange}
              placeholder="Optional"
            />
            {imageUrl && (
              <div>
                <img
                  src={imageUrl}
                  alt="Image Preview"
                  style={{
                    maxWidth: "200px",
                    maxHeight: "200px",
                    marginTop: "10px",
                  }}
                />
                <button
                type="button"
                onClick={handleRemoveImage}
                className='remove-image-btn-edit'
              >
                X
              </button>
              </div>
            )}
            {errors.image_url && <p>{errors.image_url}</p>}
          </div>
          <div id="creating-pin-title">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            {errors.title && <p>{errors.title}</p>}
          </div>
          <div id="creating-pin-description">
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            {errors.description && <p>{errors.description}</p>}
          </div>

          <button type="submit">Save Changes</button>
          {errors.general && <p>{errors.general}</p>}
        </form>
      </div>
    </div>
  );
};

export default EditPinModal;
