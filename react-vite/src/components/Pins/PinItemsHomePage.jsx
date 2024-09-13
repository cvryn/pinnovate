import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchPins } from '../../redux/pinReducer';
import catloading from '../../../public/cat-what.gif'
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
      <div id="loading-screen" style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
        <div className="loader">Loading pins right meow...</div>
          <div>
          <img src={catloading} ></img>
          </div>
      </div>
    );
  }

  const pinsArray = Array.isArray(allPins) ? allPins : Object.values(allPins);

  const sortedPins = pinsArray.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  return (
    <div id="pin-items-container-hp">
      {sortedPins.length > 0 ? (
        sortedPins.map(pin => (
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
