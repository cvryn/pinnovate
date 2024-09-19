import { useState, useEffect } from "react";
import { fetchTags, addTagsToPin, removeTagsFromPin } from "../../router/tagLoader";

const TagManager = ({ pin, onClose }) => {
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState(pin.tags.map(tag => tag.id));
  const [newTag, setNewTag] = useState("");

  useEffect(() => {
    const loadTags = async () => {
      try {
        const fetchedTags = await fetchTags();
        setTags(fetchedTags);
      } catch (error) {
        console.error("Failed to load tags:", error);
      }
    };

    loadTags();
  }, []);

  const handleAddTag = async () => {
    try {
      const tag = tags.find(tag => tag.name === newTag);
      if (!tag) return;

      // Add tag to pin
      await addTagsToPin(pin.id, [tag.id]);
      setSelectedTags([...selectedTags, tag.id]);
      setNewTag("");
    } catch (error) {
      console.error("Failed to add tag:", error);
    }
  };

  const handleRemoveTag = async (tagId) => {
    
    try {
      // Remove tag from pin
      await removeTagsFromPin(pin.id, [tagId]);
      setSelectedTags(selectedTags.filter(id => id !== tagId));
    } catch (error) {
      console.error("Failed to remove tag:", error);
    }
  };

  return (
    <div>
      <h2>Manage Tags for Pin: {pin.title}</h2>
      <div>
        <input
          type="text"
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
          placeholder="Add new tag"
        />
        <button onClick={handleAddTag}>Add Tag</button>
      </div>
      <div>
        <h3>Current Tags</h3>
        {selectedTags.length > 0 ? (
          tags.filter(tag => selectedTags.includes(tag.id)).map(tag => (
            <div key={tag.id}>
              <span>#{tag.name}</span>
              <button onClick={() => handleRemoveTag(tag.id)}>Remove</button>
            </div>
          ))
        ) : (
          <p>No tags available.</p>
        )}
      </div>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default TagManager;
