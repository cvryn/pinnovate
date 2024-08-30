import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkSignup } from "../../redux/session";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [bio, setBio] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { closeModal } = useModal();

  // Function to validate form inputs
  const validate = async () => {
    const newErrors = {};

    // Basic validations for the frontend
    if (isSubmitted) {
      if (!email) newErrors.email = "Email is required";
      else if (!/\S+@\S+\.\S+/.test(email))
        newErrors.email = "Invalid email address";

      if (!username || username.length <= 1)
        newErrors.username =
          "Username is required and must be between 2 and 50 characters long";
      else if (username.length < 2 || username.length > 50)
        newErrors.username =
          "Username must be between 2 and 50 characters long";

      if (!first_name) newErrors.first_name = "First Name is required";
      else if (first_name.length < 2 || first_name.length > 50)
        newErrors.first_name =
          "First Name must be between 2 and 50 characters long";

      if (!last_name) newErrors.last_name = "Last Name is required";
      else if (last_name.length < 1 || last_name.length > 50)
        newErrors.last_name =
          "Last Name must be between 1 and 50 characters long";

      if (password.length < 3 || password.length > 50)
        newErrors.password = "Password must be at least 4 characters long";
      if (password !== confirmPassword)
        newErrors.confirmPassword =
          "Confirm Password field must be the same as the Password field";

      // Handle file validation
      if (
        profileImage &&
        !["image/png", "image/jpeg"].includes(profileImage.type)
      ) {
        newErrors.profileImage = "Profile image must be a PNG or JPEG file";
      }

      // Check for unique email and username
      // if (Object.keys(newErrors).length === 0) {
      //   const response = await fetch("/api/check-unique", {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify({ email, username }),
      //   });
      //   const data = await response.json();

      //   if (data.email) newErrors.email = data.email;
      //   if (data.username) newErrors.username = data.username;
      // }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    if (!(await validate())) return;

    const formData = new FormData();
    formData.append("email", email);
    formData.append("username", username);
    formData.append("first_name", first_name);
    formData.append("last_name", last_name);
    formData.append("bio", bio);
    formData.append("profile_image_url", profileImage);
    formData.append("password", password);

    try {
      const response = await dispatch(thunkSignup(formData));

      if (response && response.errors) {
        setErrors(response.errors);
      } else {
        setEmail("");
        setUsername("");
        setFirstName("");
        setLastName("");
        setProfileImage(null);
        setBio("");
        setPassword("");
        setConfirmPassword("");
        setErrors({});
        closeModal();
      }
    } catch (error) {
      console.error("Signup failed:", error);
      setErrors({ server: "An unexpected error occurred. Please try again." });
    }
  };

  useEffect(() => {
    if (isSubmitted) {
      validate();
    }
  }, [
    email,
    username,
    first_name,
    last_name,
    password,
    confirmPassword,
    profileImage,
    bio,
    isSubmitted,
  ]);

  useEffect(() => {
    if (password !== confirmPassword) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword:
          "Confirm Password field must be the same as the Password field",
      }));
    } else {
      setErrors((prevErrors) => {
        const { confirmPassword, ...rest } = prevErrors;
        return rest;
      });
    }
  }, [password, confirmPassword]);

  const handleChange = (setter, value) => {
    setter(value);
    if (isSubmitted) {
      validate();
    }
  };

  return (
    <>
      <div id="signup-main-container">
        <h1>Sign Up</h1>
        <div id="signup-form">
          {errors.server && <p>{errors.server}</p>}
          <form onSubmit={handleSubmit}>
            <label>
              <input
                type="text"
                value={email}
                onChange={(e) => handleChange(setEmail, e.target.value)}
                placeholder=" "
                required
              />
              <span>Email</span>
            </label>
            <div className="error-container">
              {errors.email && <p>{errors.email}</p>}
            </div>

            <label>
              <input
                type="text"
                value={username}
                onChange={(e) => handleChange(setUsername, e.target.value)}
                placeholder=" "
                required
              />
              <span>Username</span>
            </label>
            <div className="error-container">
              {errors.username && <p>{errors.username}</p>}
            </div>

            <label>
              <input
                type="text"
                value={first_name}
                onChange={(e) => handleChange(setFirstName, e.target.value)}
                placeholder=" "
                required
              />
              <span>First Name</span>
            </label>
            <div className="error-container">
              {errors.first_name && <p>{errors.first_name}</p>}
            </div>

            <label>
              <input
                type="text"
                value={last_name}
                onChange={(e) => handleChange(setLastName, e.target.value)}
                placeholder=" "
                required
              />
              <span>Last Name</span>
            </label>
            <div className="error-container">
              {errors.last_name && <p>{errors.last_name}</p>}
            </div>

            <label>
              <input
                type="text"
                value={bio}
                onChange={(e) => handleChange(setBio, e.target.value)}
                placeholder=" "
              />
              <span>Bio (optional)</span>
            </label>
            <div className="error-container">
              {errors.bio && <p>{errors.bio}</p>}
            </div>

            <div className="profile-image-wrapper">
              <div id="profile-image-container">
                <label htmlFor="profile_image_url" className="upload-label">
                  {profileImage ? (
                    <div style={{ position: "relative", textAlign: "center" }}>
                      <img
                        src={URL.createObjectURL(profileImage)}
                        alt="Image Preview"
                      />
                    </div>
                  ) : (
                    <div>
                      <p>Click To Upload a Profile Picture</p>
                    </div>
                  )}
                  <input
                    type="file"
                    id="profile_image_url"
                    onChange={(e) => setProfileImage(e.target.files[0])}
                    style={{ display: "none" }}
                  />
                  <span style={{ fontSize: "13px" }}>
                    Profile Picture (optional)
                  </span>
                </label>
                <div className="error-container-signup">
                  {errors.profileImage && <p>{errors.profileImage}</p>}
                </div>
              </div>

              {profileImage && (
                <div className="remove-image-container-pfp">
                  <p className="image-url">{profileImage.name}</p>
                  <button
                    type="button"
                    onClick={() => setProfileImage(null)}
                    className="remove-image-btn-pfp"
                  >
                    remove image
                  </button>
                </div>
              )}
            </div>

            <label>
              <input
                type="password"
                value={password}
                onChange={(e) => handleChange(setPassword, e.target.value)}
                placeholder=" "
                required
              />
              <span>Password</span>
            </label>
            <div className="error-container">
              {errors.password && <p>{errors.password}</p>}
            </div>

            <label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) =>
                  handleChange(setConfirmPassword, e.target.value)
                }
                placeholder=" "
                required
              />
              <span>Confirm Password</span>
            </label>
            <div className="error-container">
              {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
            </div>

            <button type="submit" className="submit-signup-form">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignupFormModal;
