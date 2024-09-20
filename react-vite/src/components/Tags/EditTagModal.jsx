import { useState, useEffect } from 'react';
import { fetchTags, addTagsToPin, removeTagsFromPin } from '../../router/tagLoader';
import TagSelector from '../Tags/TagSelector';

const EditTagModal = ({ pin, onTagUpdate }) => {
  const [allTags, setAllTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [isEditing, setIsEditing] = useState(true);

  useEffect(() => {
    const fetchTagsData = async () => {
      try {
        const tagData = await fetchTags();
        setAllTags(tagData.map(tag => ({ value: tag.id, label: tag.name, ...tag })));
      } catch (error) {
        console.error('Failed to load tags', error);
      }
    };

    fetchTagsData();
  }, []);

  useEffect(() => {
    setSelectedTags(pin.tags ? pin.tags.map(tag => tag) : []);
  }, [pin]);

  const handleTagUpdate = async () => {
    try {
      const currentTags = selectedTags;
      const existingTags = pin.tags;

      // Tags to add
      const tagsToAdd = currentTags.filter(tag => !existingTags.find(existingTag => existingTag.id === tag.id));
      // Tags to remove
      const tagsToRemove = existingTags.filter(tag => !currentTags.find(currentTag => currentTag.id === tag.id));

      if (tagsToAdd.length > 0) {
        await addTagsToPin(pin.id, tagsToAdd.map(tag => tag.id));
      }

      if (tagsToRemove.length > 0) {
        await removeTagsFromPin(pin.id, tagsToRemove.map(tag => tag.id));
      }

      await onTagUpdate(pin.id, currentTags);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update tags:', error);
    }
  };

  return (
    <div>
      {/* <h1>ʕ*•͈ ﻌ •͈ʔฅ</h1> */}
      <h1>Add or Remove Tags</h1>
      {isEditing ? (
        <div>
          <TagSelector
            selectedTags={selectedTags}
            setSelectedTags={setSelectedTags}
            isFormDisabled={false}
          />
          <button onClick={handleTagUpdate}>Save Tags</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      ) : (
        <button onClick={() => setIsEditing(true)}>Edit Tags</button>
      )}
    </div>
  );
};

export default EditTagModal;
