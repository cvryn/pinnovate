import { useModal } from "../../context/Modal";
import "./OpenModalMenuItem.css";

function OpenModalMenuItem({
  modalComponent, // component to render inside the modal
  itemText, // text of the button that opens the modal
  onItemClick, // optional: callback function that will be called once the button that opens the modal is clicked
  onModalClose, // optional: callback function that will be called once the modal is closed
}) {
  const { setModalContent, setOnModalClose } = useModal();

  const onClick = () => {
    if (onModalClose) setOnModalClose(onModalClose);
    setModalContent(modalComponent);
    if (typeof onItemClick === "function") onItemClick();
  };

  return (
    <>
      <div className="login-signup-buttons">
        <li style={{ cursor: "pointer" }} onClick={onClick}>
          {itemText}
        </li>
      </div>
    </>
  );
}

export default OpenModalMenuItem;
