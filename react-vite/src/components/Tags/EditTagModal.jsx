import { useState, useEffect } from 'react';
import { fetchTags } from '../../redux/tagReducer';
import TagSelector from '../Pins/TagSelector';

const EditTagModal = ({ pin, onTagUpdate }) => {
  const [allTags, setAllTags] = useState([]);
  const [tags, setTags] = useState([]);
  const [isEditing, setIsEditing] = useState(true);

  useEffect(() => {
    const fetchTagsData = async () => {
      try {
        const tagData = await fetchTags();
        setAllTags(tagData.map(tag => ({ value: tag.id, label: tag.name })));
      } catch (error) {
        console.error('Failed to load tags', error);
      }
    };

    fetchTagsData();
  }, []);

  useEffect(() => {
    setTags(pin.tags ? pin.tags.map(tag => ({ value: tag.id, label: tag.name })) : []);
  }, [pin]);

  const handleTagUpdate = async () => {
    const updatedTags = tags.map(tag => tag.value).filter(value => value !== null);
    await onTagUpdate(pin.id, updatedTags);
    setIsEditing(false);
  };

  return (
    <div>
      {isEditing ? (
        <div>
          <TagSelector
            selectedTags={tags}
            setSelectedTags={setTags}
            tagOptions={allTags}
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
