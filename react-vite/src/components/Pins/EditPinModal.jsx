import { useState, useEffect } from 'react';
import { updatePin } from '../../router/pin';
import { fetchTags } from '../../redux/tagReducer';
import TagSelector from './TagSelector';

const EditPinModal = ({ pin, onEditComplete, onClose }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [tags, setTags] = useState([]);
    const [allTags, setAllTags] = useState([]);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (pin) {
                    setTitle(pin.title || '');
                    setDescription(pin.description || '');
                    setImageUrl(pin.image_url || '');
                    setTags(pin.tags || []);
                }

                const tagData = await fetchTags();
                setAllTags(tagData.map(tag => ({ value: tag.id, label: tag.name })));
            } catch (error) {
                console.error('Failed to fetch tags:', error);
                setErrors(prevErrors => ({ ...prevErrors, general: 'Failed to load tags' }));
            }
        };

        fetchData();
    }, [pin]);

    const handleFileChange = (e) => {
        const imageFile = e.target.files[0];
        if (imageFile) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageUrl(reader.result);
            };
            reader.readAsDataURL(imageFile);
        } else {
            setImageUrl('');
        }
    };

    const handleImageUrlChange = (e) => {
        setImageUrl(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const pinData = {
            title,
            description,
            image_url: imageUrl,
            tags: tags.map(tag => tag.value) 
        };

        try {
            const updatedPin = await updatePin(pin.id, pinData);
            if (updatedPin && updatedPin.id) {
                onEditComplete(updatedPin);
                onClose();
            } else {
                throw new Error('Failed to update pin');
            }
        } catch (error) {
            setErrors(prevErrors => ({ ...prevErrors, general: error.message }));
        }
    };


    return (
        <div>
            <h1>Edit Pin</h1>
            <form onSubmit={handleSubmit}>
                <div id="image-url-file-container">
                    <label htmlFor="image_file">Image Upload:</label>
                    <input
                        type="file"
                        id="image_file"
                        onChange={handleFileChange}
                    />
                    {imageUrl && (
                        <div>
                            <img
                                src={imageUrl}
                                alt="Image Preview"
                                style={{
                                    maxWidth: '200px',
                                    maxHeight: '200px',
                                    marginTop: '10px',
                                }}
                            />
                        </div>
                    )}
                    {errors.image_url && <p>{errors.image_url}</p>}
                </div>
                <div id="image-url-container">
                    <label htmlFor="image_url">Image URL:</label>
                    <input
                        type="text"
                        id="image_url"
                        value={imageUrl}
                        onChange={handleImageUrlChange}
                        placeholder="Optional"
                    />
                    {errors.image_url && <p>{errors.image_url}</p>}
                </div>
                <div id="creating-pin-title">
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                    {errors.title && <p>{errors.title}</p>}
                </div>
                <div id="creating-pin-description">
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    {errors.description && <p>{errors.description}</p>}
                </div>

                {/* Tags */}
                <TagSelector
                    selectedTags={tags}
                    setSelectedTags={setTags}
                    tagOptions={allTags}
                />
                {errors.tags && <p>{errors.tags}</p>}

                <button type="submit">
                    Save Changes
                </button>
                {errors.general && <p>{errors.general}</p>}
            </form>
        </div>
    );
};

export default EditPinModal;
