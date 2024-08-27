import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTags } from "../../redux/tagReducer";

const TagSelector = ({ selectedTags, setSelectedTags, isFormDisabled }) => {
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
      <label htmlFor="tags">Tags:</label>
      <select
        id="tags"
        onChange={handleTagSelection}
        disabled={isFormDisabled}
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
          const tag = tagList.find((t) => t.id === tagId);
          return (
            <div key={tagId} className="selected-tag">
              {tag?.name}
              <button type="button" onClick={() => handleTagRemoval(tagId)}>
                &times;
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TagSelector;
