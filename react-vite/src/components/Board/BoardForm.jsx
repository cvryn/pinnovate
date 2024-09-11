import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createBoard } from "../../router/boardLoader";

import "./BoardForm.css";

const BoardForm = () => {
  const [name, setName] = useState("");
  const [boardImage, setBoardImage] = useState(null);
  const [isPrivate, setIsPrivate] = useState(false);
  const [errors, setErrors] = useState({});
  const [isFormDisabled, setIsFormDisabled] = useState(false);

  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    if (!name.trim() || name.length > 50) {
      newErrors.name = "Name is required and cannot exceed 50 characters.";
    }

    if (boardImage) {
      const allowedExtensions = ["png", "jpg", "jpeg", "gif"];
      const fileExtension = boardImage.name.split(".").pop().toLowerCase();
      if (!allowedExtensions.includes(fileExtension)) {
        newErrors.boardImage = `File must be one of the following types: ${allowedExtensions.join(", ")}`;
      }
    }

    return newErrors;
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
      formData.append("board_image", boardImage);
    }

    try {
      const createdBoard = await createBoard(formData);
      if (createdBoard && createdBoard.id) {
        navigate(`/boards/${createdBoard.id}`);
      } else {
        throw new Error("Failed to create board");
      }
    } catch (error) {
      console.error("Failed to create board:", error);
      setErrors({ general: "Something went wrong while creating the board." });
    }
  };

  const handleFieldChange = (field, value) => {
    if (field === "boardImage") {
      setBoardImage(value);
    } else if (field === "name") {
      setName(value);
    }

    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      if (field === "boardImage" && value) {
        delete newErrors.boardImage;
      } else if (field === "name" && value.trim() && value.length <= 50) {
        delete newErrors.name;
      }
      return newErrors;
    });
  };

  return (
    <div id="board-container">
      <h1>Create a New Board</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div id="board-name">
          <label htmlFor="name">Board Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => handleFieldChange("name", e.target.value)}
            required
            disabled={isFormDisabled}
          />
          <div className="error-container-boardform">
            {errors.name && <p className="error">{errors.name}</p>}
          </div>
        </div>

        <div id="board-image">
          <label htmlFor="board_image" className="upload-label">
            {boardImage ? (
              <div style={{ position: "relative" }}>
                <img
                  src={URL.createObjectURL(boardImage)}
                  alt="Image Preview"
                  style={{
                    maxWidth: "200px",
                    maxHeight: "200px",
                    marginTop: "10px",
                    borderRadius: "8px",
                  }}
                />
              </div>
            ) : (
              <div>
                <p>Click To Upload Image (Optional)</p>
              </div>
            )}
            <input
              type="file"
              id="board_image"
              onChange={(e) =>
                handleFieldChange("boardImage", e.target.files[0])
              }
              style={{ display: "none" }}
            />
          </label>
          <div className="error-container-boardform">
            {errors.boardImage && <p className="error">{errors.boardImage}</p>}
          </div>
        </div>

        <div id="board-private">
          <label>Set Board to Private? </label>
          <input
            type="checkbox"
            checked={isPrivate}
            onChange={(e) => setIsPrivate(e.target.checked)}
          />
        </div>

        {errors.general && <p className="error">{errors.general}</p>}

        <button
          type="submit"
          className="submit-button"
          disabled={isFormDisabled}
        >
          Create Board
        </button>
      </form>
    </div>
  );
};

export default BoardForm;
