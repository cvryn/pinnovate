// import { useState, useEffect } from "react";
// import { fetchTags, addTagToPin, deleteTagFromPin } from "../../router/tag";

// const EditTags = ({ pin, onClose }) => {
//   const [availableTags, setAvailableTags] = useState([]);
//   const [selectedTags, setSelectedTags] = useState(pin.tags.map(tag => tag.id));
//   const [newTagName, setNewTagName] = useState("");

//   useEffect(() => {
//     const loadTags = async () => {
//       try {
//         const tags = await fetchTags();
//         setAvailableTags(tags);
//       } catch (error) {
//         console.error("Failed to load tags:", error);
//       }
//     };

//     loadTags();
//   }, []);

//   const handleAddTag = async () => {
//     try {
//       const tag = availableTags.find(tag => tag.name === newTagName);
//       if (!tag) return;

//       await addTagToPin(pin.id, tag.id);
//       setSelectedTags([...selectedTags, tag.id]);
//       setNewTagName("");
//     } catch (error) {
//       console.error("Failed to add tag:", error);
//     }
//   };

//   const handleRemoveTag = async (tagId) => {
//     try {
//       await deleteTagFromPin(pin.id, tagId);
//       setSelectedTags(selectedTags.filter(id => id !== tagId));
//     } catch (error) {
//       console.error("Failed to remove tag:", error);
//     }
//   };

//   return (
//     <div>
//       <h2>Edit Tags for Pin: {pin.title}</h2>
//       <div>
//         <input
//           type="text"
//           value={newTagName}
//           onChange={(e) => setNewTagName(e.target.value)}
//           placeholder="New tag name"
//         />
//         <button onClick={handleAddTag}>Add Tag</button>
//       </div>
//       <div>
//         <h3>Current Tags</h3>
//         {pin.tags && pin.tags.length > 0 ? (
//           pin.tags.map(tag => (
//             <div key={tag.id}>
//               <span>#{tag.name}</span>
//               <button onClick={() => handleRemoveTag(tag.id)}>Remove</button>
//             </div>
//           ))
//         ) : (
//           <p>No tags associated with this pin.</p>
//         )}
//       </div>
//       <button onClick={onClose}>Close</button>
//     </div>
//   );
// };

// export default EditTags;
