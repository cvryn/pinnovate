import { useEffect, useState } from "react";
import { updatePin } from "../../router/pin";
import './EditPinModal.css';

const EditPinModal = ({ pin, onEditComplete, onClose }) => {
  const [title, setTitle] = useState(pin?.title || "");
  const [description, setDescription] = useState(pin?.description || "");
  const [file, setFile] = useState(null);
  const [imageURL, setImageURL] = useState(pin?.image_url || "");
  const [filename, setFilename] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!title.trim()) {
      newErrors.title = "Title is required";
    } else if (title.length < 2 || title.length > 100) {
      newErrors.title = "Title must be between 2 and 100 characters.";
    }

    if (description && description.length > 255) {
      newErrors.description = "Description cannot exceed 255 characters.";
    }

    if (!file && !imageURL) {
      newErrors.image = 'An image is required.';
    }

    return newErrors;
  };

  const fileWrap = (e) => {
    e.stopPropagation();

    const tempFile = e.target.files[0];

    // Check for max image size of 5Mb
    if (tempFile && tempFile.size > 5000000) {
      setErrors((prev) => ({ ...prev, image: "Selected image exceeds the maximum file size of 5Mb" }));
      return;
    }

    if (tempFile) {
      const newImageURL = URL.createObjectURL(tempFile); // Generate a local URL to render the image file inside of the <img> tag.
      setImageURL(newImageURL);
      setFile(tempFile);
      setFilename(tempFile.name);
      setErrors((prev) => ({ ...prev, image: null }));
    } else {
      setErrors((prev) => ({ ...prev, image: null }));
    }
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

    // Append image only if a new file is selected
    if (file) {
      formData.append("image_url", file);
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

  // Display the image file name of existing image when first editing
  useEffect(() => {
    if (pin?.image_url) {
      const urlParts = pin.image_url.split("/");
      setFilename(urlParts[urlParts.length - 1]);
    }
  }, [pin]);

  // Clear specific errors as conditions are met
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    if (e.target.value.trim() && e.target.value.length >= 2 && e.target.value.length <= 100) {
      setErrors((prev) => ({ ...prev, title: null }));
    } else if (!e.target.value.trim()) {
      setErrors((prev) => ({ ...prev, title: "Title is required" }));
    } else if (e.target.value.length < 2 || e.target.value.length > 100) {
      setErrors((prev) => ({ ...prev, title: "Title must be between 2 and 100 characters." }));
    }
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
    if (e.target.value.length <= 255) {
      setErrors((prev) => ({ ...prev, description: null }));
    } else {
      setErrors((prev) => ({ ...prev, description: "Description cannot exceed 255 characters." }));
    }
  };

  return (
    <div>
      <div id="edit-pin-modal-container">
        <h1>Edit Pin</h1>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div id="image-url-container-edit">
            <label htmlFor="image" className="upload-label-edit">
              {imageURL ? (
                <div style={{ position: "relative", textAlign: 'center' }}>
                  <img
                    src={imageURL}
                    alt="Image Preview"
                    className="image-preview-edit"
                  />
                  {filename && <div className="filename-edit">{filename}</div>}
                </div>
              ) : (
                <div>
                  <p>Click To Upload Image</p>
                </div>
              )}
              <input
                type="file"
                id="image"
                onChange={fileWrap}
                style={{ display: 'none' }}
              />
            </label>
            <div className="error-container-edit-pin">
              {errors.image && <p>{errors.image}</p>}
            </div>
          </div>
          <div id="creating-pin-title">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={handleTitleChange}
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
              onChange={handleDescriptionChange}
            />
            <div className="error-container-edit-pin">
              {errors.description && <p>{errors.description}</p>}
            </div>
          </div>
          <button type="submit" className='save-edit-button'>Save Changes</button>
          {errors.general && <p>{errors.general}</p>}
        </form>
      </div>
    </div>
  );
};

export default EditPinModal;
