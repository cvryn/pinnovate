import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaUserCircle } from "react-icons/fa";
import { thunkLogout } from "../../redux/session";
import { Link, useNavigate } from "react-router-dom";
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import "./ProfileButton.css";

function ProfileButton() {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const user = useSelector((store) => store.session.user);
  // console.log('the user', user)
  const ulRef = useRef();

  const navigate = useNavigate();

  const toggleMenu = (e) => {
    e.stopPropagation();
    setShowMenu(!showMenu);
    setIsActive(!isActive);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
        setIsActive(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => {
    setShowMenu(false);
    setIsActive(false);
  };

  const handleNavigation = (path) => {
    navigate(path);
    closeMenu();
  };

  const logout = (e) => {
    e.preventDefault();
    dispatch(thunkLogout());
    navigate("/");
    closeMenu();
  };

  return (
    <>
      <button
        id="profile-button"
        onClick={toggleMenu}
        className={isActive ? "button-active" : "button-normal"}
      >
        {user && user.profile_image_url ? (
          <img
            src={user.profile_image_url}
            alt={`${user.username}'s profile`}
            className="profile-image"
            style={{ width: "30px", height: "30px", borderRadius: "50%" }}
          />
        ) : (
          <FaUserCircle />
        )}
      </button>
      {showMenu && (
        <ul className={"profile-dropdown"} ref={ulRef}>
          {user ? (
            <>
              <li>Hello, {user.username}</li>
              <li>{user.email}</li>
              <li><hr /></li>
              <li>
                <Link to="/user/current" onClick={() => handleNavigation('/user/current')} className='user-profile-page-button' style={{ textAlign: "center" }}>
                  Your Profile
                </Link>
              </li>
              <li><hr /></li>
              <li>
                <Link to="/user/pins" onClick={() => handleNavigation('/user/pins')} className='manage-pins-button' style={{ textAlign: "center" }}>
                  Manage Pins
                </Link>
              </li>
              <li>
                <Link to="/user/boards" onClick={() => handleNavigation('/user/boards')} className='manage-pins-button' style={{ textAlign: "center" }}>
                  Manage Boards
                </Link>
              </li>
              <li>
              <hr />
                <button className='logout-button-profile' onClick={logout}>Log Out</button>
              </li>
            </>
          ) : (
            <>
              <OpenModalMenuItem
                itemText="Log In"
                onItemClick={closeMenu}
                modalComponent={<LoginFormModal />}
              />
              <OpenModalMenuItem
                itemText="Sign Up"
                onItemClick={closeMenu}
                modalComponent={<SignupFormModal />}
              />
            </>
          )}
        </ul>
      )}
    </>
  );
}

export default ProfileButton;
