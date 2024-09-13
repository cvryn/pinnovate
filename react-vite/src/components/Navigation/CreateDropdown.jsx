import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./CreateDropdown.css";

function CreateDropdown() {
  const [showMenu, setShowMenu] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const ulRef = useRef();
  const navigate = useNavigate()

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

  const handleNavigation = (path) => {
    navigate(path);
    setShowMenu(false);
    setIsActive(false);
  };


  return (
    <>
      <button
        id="create-button"
        onClick={toggleMenu}
        className={isActive ? "button-active" : "button-normal"}
      >
        Create
        </button>
      {showMenu && (
        <ul className={"create-dropdown"} ref={ulRef}>
          <li>
            <Link to="/pins/new" onClick={() => handleNavigation('/pins/new')}>
              Create New Pin
            </Link>
          </li>
          <li>
            <Link to="/boards/new" onClick={() => handleNavigation('/boards/new')}>
              Create New Board
            </Link>
          </li>
        </ul>
      )}
    </>
  );
}

export default CreateDropdown;
