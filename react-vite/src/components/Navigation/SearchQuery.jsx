import { IoSearch } from "react-icons/io5";
import "./SearchQuery.css";

const SearchQuery = ({ query, pins, onSelect }) => {
  const getUniqueWords = () => {
    const wordsSet = new Set();

    // Extract words from pin titles
    pins.forEach((pin) => {
      if (pin.title) {
        pin.title.split(" ").forEach((word) => {
          if (word) wordsSet.add(word.toLowerCase());
        });
      }

      // Extract words from pin tags
      if (Array.isArray(pin.tags)) {
        pin.tags.forEach((tag) => {
          if (typeof tag.name === "string") {
            tag.name.split(" ").forEach((word) => {
              if (word) wordsSet.add(word.toLowerCase());
            });
          }
        });
      }
    });

    return Array.from(wordsSet);
  };

  const uniqueWords = getUniqueWords();
  const filteredWords = uniqueWords.filter((word) =>
    word.includes(query.toLowerCase())
  );

  return (
    <>
      <div id="query-suggestions-container">
        <h1> By Pin Title</h1>
        {filteredWords.length > 0 ? (
          <ul id="query-suggestions-list">
            {filteredWords.slice(0,10).map((word, index) => (
              <li
                key={index}
                className="query-suggestion-item"
                onClick={() => onSelect(word)}
              >
                <IoSearch className='query-search-icon'/>
                {word}
              </li>
            ))}
          </ul>
        ) : (
          <p className="query-no-suggestions">No suggestions available.</p>
        )}
      </div>
    </>
  );
};

export default SearchQuery;
