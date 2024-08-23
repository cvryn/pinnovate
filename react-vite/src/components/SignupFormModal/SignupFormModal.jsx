import { useState } from "react";
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
  const [profile_image_url, setProfileImageUrl] = useState("");
  const [bio, setBio] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return setErrors({
        confirmPassword:
          "Confirm Password field must be the same as the Password field",
      });
    }

    const serverResponse = await dispatch(
      thunkSignup({
        email,
        username,
        first_name,
        last_name,
        bio,
        profile_image_url,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
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
                onChange={(e) => setEmail(e.target.value)}
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
                onChange={(e) => setUsername(e.target.value)}
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
                onChange={(e) => setFirstName(e.target.value)}
                placeholder=" "
                required
              />
              <span>First Name</span>
            </label>
            <div className="error-container">
              {errors.first_name&& <p>{errors.first_name}</p>}
            </div>

            <label>
              <input
                type="text"
                value={last_name}
                onChange={(e) => setLastName(e.target.value)}
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
                onChange={(e) => setBio(e.target.value)}
                placeholder=" "
              />
              <span>Bio (optional)</span>
            </label>
            <div className="error-container">
              {errors.bio && <p>{errors.bio}</p>}
            </div>

            <label>
              <input
                type="text"
                value={profile_image_url}
                onChange={(e) => setProfileImageUrl(e.target.value)}
                placeholder=" "
              />
              <span>Profile Picture (optional)</span>
            </label>
            <div className="error-container">
              {errors.profile_image_url && <p>{errors.profile_image_url}</p>}
            </div>

            <label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder=" "
                required
              />
              <span>Confirm Password</span>
            </label>
            <div className="error-container">
              {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
            </div>

            <button type="submit">Sign Up</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignupFormModal;
