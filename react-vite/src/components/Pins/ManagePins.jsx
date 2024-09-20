import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import PinItemsManage from "./PinItemsManage";
import catloading from "../../../public/cat-what.gif";
import { fetchPins, deletePin } from "../../router/pin";
import "./ManagePins.css";

const ManagePins = () => {
  const [pins, setPins] = useState([]);
  const [loading, setLoading] = useState(true);
  const currentUser = useSelector((state) => state.session.user);

  const fetchPinsData = async () => {
    try {
      const data = await fetchPins();
      setPins(data);
    } catch (error) {
      console.error("Failed to fetch pins:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPinsData();
  }, []);

  const handleDeletePin = async (pinId) => {
    try {
      await deletePin(pinId);
      setPins((prevPins) => prevPins.filter((pin) => pin.id !== pinId));
    } catch (error) {
      console.error("Failed to delete pin:", error);
    }
  };

  const handleEditPin = (updatedPin) => {
    setPins((prevPins) =>
      prevPins.map((pin) =>
        pin.id === updatedPin.id ? { ...pin, ...updatedPin } : pin
      )
    );
  };

  const currentUserPins = pins.filter((pin) => pin.user_id === currentUser.id);

  if (loading) {
    return (
      <div
        id="loading-screen"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <div className="loader">Loading pins right meow...</div>
        <div>
          <img src={catloading} alt="Loading" />
        </div>
      </div>
    );
  }

  return (
    <div id="manage-pins-container">
      <h1>Manage My Pins</h1>
      {currentUserPins.length > 0 ? (
        <PinItemsManage
          pins={currentUserPins}
          onEdit={handleEditPin}
          onDelete={handleDeletePin}
        />
      ) : (
        <div>
          <p>No pins available.</p>
          <Link to="/pins/new">
            <div className="no-pins-container">Create A New Pin</div>
          </Link>
        </div>
      )}
    </div>
  );
};

export default ManagePins;
