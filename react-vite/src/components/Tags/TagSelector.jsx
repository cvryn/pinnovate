import { useState, useEffect } from 'react';
import { fetchTags } from '../../router/tagLoader';
import './TagSelector.css';

const TagSelector = ({ selectedTags, setSelectedTags, isFormDisabled }) => {
  const [allTags, setAllTags] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadTags = async () => {
      try {
        const tags = await fetchTags();
        setAllTags(tags);
      } catch (error) {
        console.error('Failed to load tags:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadTags();
  }, []);

  const handleTagSelection = (e) => {
    const selectedTagId = parseInt(e.target.value, 10);
    const tag = allTags.find(tag => tag.id === selectedTagId);

    if (selectedTagId && !selectedTags.find(t => t.id === selectedTagId)) {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleTagRemoval = (tagIdToRemove) => {
    setSelectedTags(selectedTags.filter(tag => tag.id !== tagIdToRemove));
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div id="creating-pin-tags">
      <label htmlFor="tags">Tag(s) (optional):</label>
      <select
        id="tags"
        onChange={handleTagSelection}
        multiple
        disabled={isFormDisabled}
        value={selectedTags.map(tag => tag.id)}
      >
        <option value="">Select a tag</option>
        {allTags.map((tag) => (
          <option key={tag.id} value={tag.id}>
            {tag.name}
          </option>
        ))}
      </select>

      <div id="selected-tags">
        {selectedTags.map((tag) => (
          <div key={tag.id} className="selected-tag">
            {tag.name}
            <button className='remove-tag-btn' type="button" onClick={() => handleTagRemoval(tag.id)}>
              remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TagSelector;
