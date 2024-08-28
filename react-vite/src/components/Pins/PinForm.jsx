import { useState, useEffect } from "react";
import { useNavigate, useLoaderData } from "react-router-dom";
import { createPin } from "../../router/pin";
import TagSelector from "./TagSelector";
import './PinForm.css'

const PinForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [tags, setTags] = useState([]);
  const [errors, setErrors] = useState({});
  const [isFormDisabled, setFormDisabled] = useState(true);
  const navigate = useNavigate();

  const tagOptions = useLoaderData();

  useEffect(() => {
    setFormDisabled(!imageUrl);
  }, [imageUrl]);

  const validateForm = () => {
    const newErrors = {};
    if (!title.trim()) {
      newErrors.title = "Title is required";
    }
    if (title.length < 2 || title.length > 100) {
      newErrors.title = "Title must be between 2 and 100 characters.";
    }
    if (imageUrl && !isValidUrl(imageUrl)) {
      newErrors.image_url = "Image URL must be a valid URL";
    }
    return newErrors;
  };

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleRemoveImage = () => {
    setImageUrl("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    const pinData = {
      title,
      description,
      image_url: imageUrl,
      tags,
    };

    try {
      const newPin = await createPin(pinData);
      if (newPin && newPin.id) {
        navigate(`/pins/${newPin.id}`);
      } else {
        throw new Error("Failed to create pin");
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        setErrors(error.response.data.errors);
      } else {
        console.error("Failed to create pin:", error);
      }
    }
  };

  return (
    <div>
      <h1>Create a New Pin</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="image_url"></label>
        <div id="image-url-container">
          <div id='image-upload-pin-form-box'>
            <input
              type="text"
              id="image_url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="Enter Image Url Here!"
            />
          </div>
          {imageUrl && (
            <div style={{ position: "relative" }}>
              <img
                src={imageUrl}
                alt="Image Preview"
                style={{
                  maxWidth: "200px",
                  maxHeight: "200px",
                  marginTop: "10px",
                  borderRadius: "8px"
                }}
              />
              <button
                type="button"
                onClick={handleRemoveImage}
                className='remove-image-btn'
              >
                X
              </button>
            </div>
          )}
          <div className="error-container">
            {errors.image_url && <p>{errors.image_url}</p>}
          </div>
        </div>
        <div id="creating-pin-title">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={isFormDisabled}
            required
          />
          <div className="error-container">
            {errors.title && <p>{errors.title}</p>}
          </div>
        </div>
        <div id="creating-pin-description">
          <label htmlFor="description">Description (optional):</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={isFormDisabled}
          />
          <div className="error-container">
            {errors.description && <p>{errors.description}</p>}
          </div>
        </div>
        {/* Tags */}
        <TagSelector
          selectedTags={tags}
          setSelectedTags={setTags}
          tagOptions={tagOptions}
          isFormDisabled={isFormDisabled}
        />
        <button type="submit" disabled={isFormDisabled}>
          Create Pin
        </button>
      </form>
    </div>
  );
};

export default PinForm;
