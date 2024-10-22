import { useEffect, useState } from "react";
import { updatePin } from "../../router/pin";
import "./EditPinModal.css";

const EditPinModal = ({ pin, onEditComplete, onClose }) => {
  const [title, setTitle] = useState(pin?.title || "");
  const [description, setDescription] = useState(
    pin?.description === "null" ? "" : pin?.description || ""
  );
  const [file, setFile] = useState(null);
  const [imageURL, setImageURL] = useState(
    Array.isArray(pin?.image_url) && pin.image_url.length > 0
      ? pin.image_url[0]
      : ""
  );
  const [filename, setFilename] = useState("");
  const [errors, setErrors] = useState({});

  const allowedExtensions = ["pdf", "png", "jpg", "jpeg", "gif"];

  const validateForm = () => {
    const newErrors = {};

    if (!title.trim()) {
      newErrors.title = "Title is required";
    } else if (title.length < 2 || title.length > 100) {
      newErrors.title = "Title must be between 2 and 100 characters.";
    }

    if (!description.trim()) {
      newErrors.description = "Description is required.";
    } else if (description.length < 2 || description.length > 255) {
      newErrors.description =
        "Description must be between 2 and 255 characters.";
    }

    if (!file && !imageURL) {
      newErrors.image = "An image is required.";
    }

    // If a new file is uploaded, validate its extension
    if (file) {
      const fileExtension = file.name.split(".").pop().toLowerCase();
      if (!allowedExtensions.includes(fileExtension)) {
        newErrors.image = `File must be one of the following types: ${allowedExtensions.join(
          ", "
        )}`;
      }
    }

    return newErrors;
  };

  const fileWrap = (e) => {
    e.stopPropagation();

    const tempFile = e.target.files[0];

    if (tempFile) {
      const fileExtension = tempFile.name.split(".").pop().toLowerCase();

      if (!allowedExtensions.includes(fileExtension)) {
        setErrors((prev) => ({
          ...prev,
          image: `File must be one of the following types: ${allowedExtensions.join(
            ", "
          )}`,
        }));
        return;
      }

      // Check for max image size of 5Mb
      if (tempFile.size > 5000000) {
        setErrors((prev) => ({
          ...prev,
          image: "Selected image exceeds the maximum file size of 5Mb",
        }));
        return;
      }

      const newImageURL = URL.createObjectURL(tempFile);
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

  useEffect(() => {
    if (pin?.image_url) {
      const urlParts = pin.image_url[0].split("/");
      setFilename(urlParts[urlParts.length - 1]);
    }
  }, [pin]);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    if (
      e.target.value.trim() &&
      e.target.value.length >= 2 &&
      e.target.value.length <= 100
    ) {
      setErrors((prev) => ({ ...prev, title: null }));
    } else if (!e.target.value.trim()) {
      setErrors((prev) => ({ ...prev, title: "Title is required" }));
    } else if (e.target.value.length < 2 || e.target.value.length > 100) {
      setErrors((prev) => ({
        ...prev,
        title: "Title must be between 2 and 100 characters.",
      }));
    }
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
    if (
      e.target.value.trim() &&
      e.target.value.length >= 2 &&
      e.target.value.length <= 255
    ) {
      setErrors((prev) => ({ ...prev, description: null }));
    } else if (!e.target.value.trim()) {
      setErrors((prev) => ({
        ...prev,
        description: "Description is required.",
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        description: "Description must be between 2 and 255 characters.",
      }));
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
                <div style={{ position: "relative", textAlign: "center" }}>
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
                style={{ display: "none" }}
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
          <button type="submit" className="save-edit-button">
            Save Changes
          </button>
          {errors.general && <p>{errors.general}</p>}
        </form>
      </div>
    </div>
  );
};

export default EditPinModal;
