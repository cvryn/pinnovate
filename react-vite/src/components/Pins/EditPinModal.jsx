import { useState } from "react";
import { updatePin } from "../../router/pin";
import './EditPinModal.css';

const EditPinModal = ({ pin, onEditComplete, onClose }) => {
  const [title, setTitle] = useState(pin?.title || "");
  const [description, setDescription] = useState(pin?.description || "");
  const [file, setFile] = useState(null);
  const [removeExistingImage, setRemoveExistingImage] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!title.trim()) {
      newErrors.title = "Title is required";
    }
    if (title.length < 2 || title.length > 100) {
      newErrors.title = "Title must be between 2 and 100 characters.";
    }
    if (description && description.length > 255) {
      newErrors.description = "Description cannot exceed 255 characters.";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);

    if (file) {
      formData.append("image_url", file);
    } else if (removeExistingImage) {
      formData.append("remove_image", "true");
    }

    try {
      const updatedPin = await updatePin(pin.id, formData);
      onEditComplete(updatedPin);
      onClose();
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        general: error?.response?.data?.errors || "Failed to update pin",
      }));
    }
  };

  const handleRemoveImage = () => {
    setFile(null);
    setRemoveExistingImage(true);
  };

  return (
    <div>
      <div id="edit-pin-modal-container">
        <h1>Edit Pin</h1>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div id="image-url-container-edit">
            <label htmlFor="image" className="upload-label-edit">
              {file ? (
                <div style={{ position: "relative" }}>
                  <img
                    src={URL.createObjectURL(file)}
                    alt="Image Preview"
                    className="image-preview-edit"
                  />
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="remove-image-btn-edit"
                  >
                    X
                  </button>
                </div>
              ) : pin?.image_url && !removeExistingImage ? (
                <div style={{ position: "relative" }}>
                  <img
                    src={pin.image_url}
                    alt="Existing Image"
                    className="image-preview-edit"
                  />
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="remove-image-btn-edit"
                  >
                    X
                  </button>
                </div>
              ) : (
                <div>
                  <p>Click To Upload Image</p>
                </div>
              )}
              <input
                type="file"
                id="image"
                onChange={(e) => setFile(e.target.files[0])}
                style={{ display: 'none' }}
              />
            </label>
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
            <div className="error-container-edit-pin">
              {errors.title && <p>{errors.title}</p>}
            </div>
          </div>
          <div id="creating-pin-description">
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <div className="error-container-edit-pin">
              {errors.description && <p>{errors.description}</p>}
            </div>
          </div>
          <button type="submit">Save Changes</button>
          {errors.general && <p>{errors.general}</p>}
        </form>
      </div>
    </div>
  );
};

export default EditPinModal;
