import { useEffect, useState, useCallback } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";
import { Navigate } from "react-router-dom";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { closeModal } = useModal();

  const sessionUser = useSelector((state) => state.session.user);

  // Per Linter, Use useCallback()
  const validate = useCallback(() => {
    const newErrors = {};

    if (isSubmitted) {
      if (!email) newErrors.email = "Email is required";
      else if (!/\S+@\S+\.\S+/.test(email))
        newErrors.email = "Invalid email address";

      if (!password) newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [email, password, isSubmitted]);

  useEffect(() => {
    if (isSubmitted) {
      validate();
    }
  }, [email, password, isSubmitted, validate]);

  const handleSubmit = async (e, isDemoUser = false) => {
    e.preventDefault();

    if (!isDemoUser) {
      setIsSubmitted(true);
      if (!validate()) return;
    }

    const credentials = isDemoUser
      ? { email: "demo@pinn.io", password: "password" }
      : { email, password };

    const serverResponse = await dispatch(thunkLogin(credentials));

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
    }
  };

  if (sessionUser) return <Navigate to="/" replace={true} />;

  return (
    <>
      <div id="login-main-container">
        <h1>Log In</h1>
        <form id='login-form' onSubmit={handleSubmit}>
          <label>
            <input
              type="text"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (isSubmitted) validate();
              }}
              placeholder=" "
              required
            />
            <span>Email</span>
          </label>
          <div className="error-container-login">
            {errors.email && <p>{errors.email}</p>}
          </div>

          <label>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (isSubmitted) validate();
              }}
              placeholder=" "
              required
            />
            <span>Password</span>
          </label>
          <div className="error-container-login">
            {errors.password && <p>{errors.password}</p>}
          </div>
          <button type="submit">Log In</button>
          <button type="button" onClick={(e) => handleSubmit(e, true)}>
            Log in as Demo User
          </button>
        </form>
      </div>
    </>
  );
}

export default LoginFormModal;
