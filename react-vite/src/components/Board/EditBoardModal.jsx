import { useState, useEffect } from "react";
import { updateBoard } from "../../router/boardLoader";
import "./EditBoardModal.css";

const EditBoardModal = ({ board, onEditComplete, onClose }) => {
  const [name, setName] = useState(board?.name || "");
  const [boardImage, setBoardImage] = useState(null);
  const [imageURL, setImageURL] = useState(board?.board_image_url || "");
  const [isPrivate, setIsPrivate] = useState(board?.private || false);
  const [errors, setErrors] = useState({});
  const [imageRemoved, setImageRemoved] = useState(false);

  const allowedExtensions = ["png", "jpg", "jpeg", "gif"];

  const validateForm = () => {
    const newErrors = {};

    if (!name.trim() || name.length > 50) {
      newErrors.name = "Name is required and cannot exceed 50 characters.";
    }

    if (boardImage) {
      const fileExtension = boardImage.name.split(".").pop().toLowerCase();
      if (!allowedExtensions.includes(fileExtension)) {
        newErrors.boardImage = `File must be one of the following types: ${allowedExtensions.join(", ")}`;
      } else if (boardImage.size > 5000000) {
        newErrors.boardImage = "Selected image exceeds the maximum file size of 5MB.";
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
          boardImage: `File must be one of the following types: ${allowedExtensions.join(", ")}`
        }));
        return;
      }

      if (tempFile.size > 5000000) {
        setErrors((prev) => ({
          ...prev,
          boardImage: "Selected image exceeds the maximum file size of 5MB"
        }));
        return;
      }

      const newImageURL = URL.createObjectURL(tempFile);
      setImageURL(newImageURL);
      setBoardImage(tempFile);
      setErrors((prev) => ({ ...prev, boardImage: null }));
    } else {
      setErrors((prev) => ({ ...prev, boardImage: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    const formData = new FormData();
    formData.append("name", name);
    formData.append("private", isPrivate);

    if (boardImage) {
      formData.append("board_image_url", boardImage);
    }

    if (imageRemoved) {
      formData.append("remove_image", "true");
    }

    try {
      const updatedBoard = await updateBoard(board.id, formData);
      onEditComplete(updatedBoard);
      onClose();
    } catch (error) {
      console.error("Failed to update board:", error);
      setErrors({ general: "Something went wrong while updating the board." });
    }
  };

  useEffect(() => {
    if (board?.board_image_url) {
      setImageURL(board.board_image_url);
    }
  }, [board]);

  return (
    <div id="edit-board-modal-container">
      <h1>Edit Board</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div id="board-image">
          <label htmlFor="board_image" className="upload-label">
            {imageURL ? (
              <div style={{ position: "relative" }}>
                <img
                  src={imageURL}
                  alt="Image Preview"
                  style={{
                    maxWidth: "200px",
                    maxHeight: "200px",
                    objectFit: "cover",
                  }}
                />
                <button
                  type="button"
                  className="remove-image-button"
                  onClick={() => {
                    setBoardImage(null);
                    setImageURL("");
                    setImageRemoved(true);
                  }}
                >
                  Remove Image
                </button>
              </div>
            ) : (
              <div className="upload-text">Upload an Image</div>
            )}
          </label>
          <input
            type="file"
            id="board_image"
            accept=".png,.jpg,.jpeg,.gif"
            onChange={fileWrap}
            style={{ display: "none" }}
          />
          {errors.boardImage && <p className="error">{errors.boardImage}</p>}
        </div>

        <div className="input-group">
          <label htmlFor="name">Board Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter board name"
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>

        <div className="input-group">
          <label>
            <input
              type="checkbox"
              checked={isPrivate}
              onChange={(e) => setIsPrivate(e.target.checked)}
            />
            Private
          </label>
        </div>

        {errors.general && <p className="error">{errors.general}</p>}

        <div className="modal-button-actions">
          <button type="submit" className="edit-board-submit-button">Save Changes</button>
          <button type="button" className="edit-board-cancel-button" onClick={onClose}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default EditBoardModal;
