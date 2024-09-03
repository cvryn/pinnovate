import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchPins } from '../../redux/pinReducer';
import './PinItemsHomePage.css';
import { Link } from "react-router-dom";

function PinItemsHomePage() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const allPins = useSelector((state) => state.pin.allPins);

  useEffect(() => {
    const loadPins = async () => {
      await dispatch(fetchPins());
      setLoading(false);
    };

    loadPins();
  }, [dispatch]);

  if (loading) {
    return (
      <div id="loading-screen">
        <p>Loading Pins...</p>
      </div>
    );
  }

  const pinsArray = Array.isArray(allPins) ? allPins : Object.values(allPins);

  return (
    <div id="pin-items-container-hp">
      {pinsArray.length > 0 ? (
        pinsArray.map(pin => (
          <Link key={pin.id} to={`/pins/${pin.id}`} className="pin-item-hp">
            <img src={pin.image_url} alt={pin.title} />
            <div className="pin-item-content-hp">
            </div>
          </Link>
        ))
      ) : (
        <p>No pins available.</p>
      )}
    </div>
  );
}

export default PinItemsHomePage;
