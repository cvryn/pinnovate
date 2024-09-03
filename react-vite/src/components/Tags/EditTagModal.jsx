import { useState, useEffect } from 'react';
import { fetchTags } from '../../router/tag';
import TagSelectorEdit from '../Tags/TagSelectorEdit';

const EditTagModal = ({ pin, onTagUpdate }) => {
  const [allTags, setAllTags] = useState([]);
  const [tags, setTags] = useState([]);
  const [isEditing, setIsEditing] = useState(true);

  useEffect(() => {
    const fetchTagsData = async () => {
      try {
        const tagData = await fetchTags();
        console.log('Fetched tags:', tagData);
        setAllTags(tagData.map(tag => ({ value: tag.id, label: tag.name })));
      } catch (error) {
        console.error('Failed to load tags', error);
      }
    };

    fetchTagsData();
  }, []);

  useEffect(() => {
    if (pin && pin.tags) {
      const initialTags = pin.tags.map(tagId => {
        const tag = allTags.find(t => t.value === tagId);
        return tag ? { ...tag } : { value: tagId, label: "Unknown Tag" };
      });
      setTags(initialTags);
    } else {
      setTags([]);
    }
  }, [pin, allTags]);

  const handleTagUpdate = async () => {
    if (pin && pin.id) {
      const updatedTags = tags.map(tag => tag.value).filter(value => value !== null);
      console.log('Updated tags:', updatedTags); 
      try {
        await onTagUpdate(pin.id, updatedTags);
        setIsEditing(false);
      } catch (error) {
        console.error('Failed to update tags:', error);
      }
    } else {
      console.error('Pin or Pin ID is undefined');
    }
  };

  return (
    <div>
      {isEditing ? (
        <div>
          <TagSelectorEdit
            selectedTags={tags.map(tag => tag.value)}
            setSelectedTags={(selectedIds) => {
              setTags(
                allTags.filter(tag => selectedIds.includes(tag.value))
              );
            }}
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
