import { Link } from "react-router-dom";
import "./PinItemsSearchBar.css";

function PinItemsSearchBar({ pin }) {
  if (!pin) {
    return <h2>No pin found!</h2>;
  }

  return (
    <div className="pin-item-search-bar">
      <Link to={`/pins/${pin.id}`} className="pin-link-search-bar">
        <img
          src={pin.image_url[0]}
          alt={pin.title}
          className="pin-image-search-bar"
        />
        <div className="pin-info">
          <h2 className="pin-title-search-bar">{pin.title}</h2>
          <p>
            {pin.tags && pin.tags.length > 0
              ? `#${pin.tags.filter((tag) => tag?.name)[0]?.name || ""}`
              : pin.title}
          </p>
        </div>
      </Link>
    </div>
  );
}

export default PinItemsSearchBar;
