import { useState, useEffect } from "react";
import { fetchTags, addTagToPin, removeTagFromPin } from "../../router/tag";

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
      const tagId = tags.find(tag => tag.name === newTag)?.id;
      if (!tagId) return;

      await addTagToPin(pin.id, tagId);
      setSelectedTags([...selectedTags, tagId]);
      setNewTag("");
    } catch (error) {
      console.error("Failed to add tag:", error);
    }
  };

  const handleRemoveTag = async (tagId) => {
    try {
      await removeTagFromPin(pin.id, tagId);
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
        {pin.tags && pin.tags.length > 0 ? (
          pin.tags.map(tag => (
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
