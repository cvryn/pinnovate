import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchBoards } from "../../router/boardLoader";

import catloading from "../../../public/cat-what.gif";

import "./BoardItems.css";

function BoardItems() {
  const [boards, setBoards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBoards = async () => {
      try {
        const fetchedBoards = await fetchBoards();
        setBoards(fetchedBoards);
      } catch (err) {
        setError("Failed to load boards.");
      } finally {
        setLoading(false);
      }
    };

    loadBoards();
  }, []);

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

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div id="board-items-container">
      {boards.length > 0 ? (
        boards.map((board) => (
          <Link
            key={board.id}
            to={`/boards/${board.id}`}
            className="board-item"
          >
            <img
              src={board.image_url}
              alt={board.title}
              className="board-image"
            />
            <div className="board-content">
              <h3>{board.title}</h3>
            </div>
          </Link>
        ))
      ) : (
        <p>No boards available.</p>
      )}
    </div>
  );
}

export default BoardItems;
