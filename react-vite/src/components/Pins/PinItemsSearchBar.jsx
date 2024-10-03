import { Link } from "react-router-dom";
import "./PinItemsSearchBar.css";

function PinItemsSearchBar({ pin }) {
  if (!pin) {
    return <h2>No pin found!</h2>;
  }

  return (
    <div className="pin-item-search-bar">
      <Link to={`/pins/${pin.id}`} className="pin-link-search-bar">
        <img src={pin.image_url[0]} alt={pin.title} />
        <div className="pin-item-content-search-bar">
          <h2>{pin.title}</h2>
          {pin.description !== "null" && (
            <p>{pin.description || "No description available"}</p>
          )}
          {pin.description === "null" && (
            <p>{"No description available"}</p>
          )}
          <p>
            {pin.tags && pin.tags.length > 0
              ? pin.tags
                  .filter((tag) => tag?.name)
                  .map((tag) => `#${tag.name}`)
                  .join(", ")
              : "No tags"}
          </p>
        </div>
      </Link>
    </div>
  );
}

export default PinItemsSearchBar;
