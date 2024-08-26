import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchPins } from '../../redux/pinReducer';
import './PinItems.css';
import { Link } from "react-router-dom";

function PinItems() {
  const dispatch = useDispatch();
  const allPins = useSelector((state) => state.pin.allPins);

  useEffect(() => {
    dispatch(fetchPins());
  }, [dispatch]);

  return (
    <div id="pin-items-container">
      {allPins && allPins.length > 0 ? (
        allPins.map(pin => (
          <Link key={pin.id} to={`/pins/${pin.id}`} className="pin-item">
            <img src={pin.image_url} alt={pin.title} />
            <div className="pin-item-content">
            </div>
          </Link>
        ))
      ) : (
        <p>No pins available.</p>
      )}
    </div>
  );
}

export default PinItems;
