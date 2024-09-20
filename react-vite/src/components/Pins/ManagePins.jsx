import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PinItemsManage from "./PinItemsManage";
import { fetchPins, deletePin, updatePin } from "../../router/pin";
import catloading from '../../../public/cat-what.gif'
import { useSelector } from "react-redux";
import './ManagePins.css';

const ManagePins = () => {
  const navigate = useNavigate();
  const [pins, setPins] = useState([]);
  const [loading, setLoading] = useState(true);
  const currentUser = useSelector((state) => state.session.user);

  useEffect(() => {
    if (!currentUser) {
      navigate("/");
      return;
    }

    const loadPins = async () => {
      try {
        setLoading(true);
        const fetchedPins = await fetchPins();
        setPins(fetchedPins.filter(pin => pin.user_id === currentUser.id));
      } catch (error) {
        console.error("Failed to load pins:", error);
      } finally {
        setLoading(false);
      }
    };

    loadPins();
  }, [currentUser, navigate]);

  const handleDeletePin = async (pinId) => {
    try {
      await deletePin(pinId);
      setPins(prevPins => prevPins.filter(pin => pin.id !== pinId));
    } catch (error) {
      console.error("Failed to delete pin:", error);
    }
  };

  const handleEditPin = async (updatedPin) => {
    try {
      await updatePin(updatedPin.id, updatedPin);
      setPins(prevPins =>
        prevPins.map(pin => (pin.id === updatedPin.id ? updatedPin : pin))
      );
    } catch (error) {
      console.error("Failed to edit pin:", error);
    }
  };

  return (
    <div style={{ minHeight: "1000px" }}>
      <br />
      <h1 style={{ padding: "10px" }}>Manage My Pins</h1>
      <br />
      {loading ? (
        <div className="loader-container" style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
          <div className="loader">Loading pins right meow...</div>
          <div>
          <img src={catloading} ></img>
          </div>
        </div>
      ) : (
        <div id="pin-container-collection">
          {pins.length > 0 ? (
            <PinItemsManage
              pins={pins}
              onDelete={handleDeletePin}
              onEdit={handleEditPin}
            />
          ) : (
            <div className="no-pins-container">
              <div>No pins found.</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ManagePins;
