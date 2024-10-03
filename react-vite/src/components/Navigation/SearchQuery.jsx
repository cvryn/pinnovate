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
    <div id="suggestions-container">
      {filteredWords.length > 0 ? (
        <ul id="suggestions-list">
          {filteredWords.map((word, index) => (
            <li
              key={index}
              className="suggestion-item"
              onClick={() => onSelect(word)}
            >
              {word}
            </li>
          ))}
        </ul>
      ) : (
        <p className="no-suggestions">No suggestions available.</p>
      )}
    </div>
  );
};

export default SearchQuery;
