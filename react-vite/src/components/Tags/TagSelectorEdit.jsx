import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTags } from "../../redux/tagReducer";
import './TagSelectorEdit.css';

const TagSelectorEdit = ({ selectedTags, setSelectedTags, isFormDisabled }) => {
  const dispatch = useDispatch();
  const allTags = useSelector((state) => state.tag.allTags);
  const tagList = Object.values(allTags);

  useEffect(() => {
    dispatch(fetchTags());
  }, [dispatch]);

  const handleTagSelection = (e) => {
    const selectedTagId = parseInt(e.target.value, 10);

    if (selectedTagId && !selectedTags.includes(selectedTagId)) {
      setSelectedTags([...selectedTags, selectedTagId]);
    }
  };

  const handleTagRemoval = (tagIdToRemove) => {
    setSelectedTags(selectedTags.filter((tagId) => tagId !== tagIdToRemove));
  };

  return (
    <div id="creating-pin-tags">
      <label htmlFor="tags">Tag (optional):</label>
      <select
        id="tags"
        onChange={handleTagSelection}
        multiple
        disabled={isFormDisabled}
        value={selectedTags}
      >
        <option value="">Select a tag</option>
        {tagList.map((tag) => (
          <option key={tag.id} value={tag.id}>
            {tag.name}
          </option>
        ))}
      </select>

      <div id="selected-tags">
        {selectedTags.map((tagId) => {
          // {console.log('Idddddddddd', tagId)}
          // {console.log('taaaag', tagList)}
          const tag = tagList.find((t) => t.id === tagId
          );
          return (
            <div key={tagId} className="selected-tag">
              {tag?.name || "Undefined"}
              <button className='remove-tag-btn' type="button" onClick={() => handleTagRemoval(tagId)}>
                remove
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TagSelectorEdit;
