import { useEffect, useState } from "react";
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
  const { closeModal } = useModal();

  const sessionUser = useSelector((state) => state.session.user);

  useEffect(() => {
    setEmail("");
    setPassword("");
    setErrors({});
  }, []);

  const handleSubmit = async (e, isDemoUser = false) => {
    e.preventDefault();

    // const serverResponse = await dispatch(
    //   thunkLogin({
    //     email,
    //     password,
    //   })
    // );

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
  <button type="submit">Log In</button>
  <button type="submit" onClick={(e) => handleSubmit(e, true)}>
    Log in as Demo User
  </button>
</form>
      </div>
    </>
  );
}

export default LoginFormModal;
