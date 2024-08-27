import { useState, useEffect } from 'react';
import { useNavigate, useLoaderData } from 'react-router-dom';
import { createPin } from '../../router/pin';
import TagSelector from './TagSelector';

const PinForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [tags, setTags] = useState([]);
    const [errors, setErrors] = useState({});
    const [isFormDisabled, setFormDisabled] = useState(true);
    const navigate = useNavigate();

    const tagOptions = useLoaderData();

    useEffect(() => {
        setFormDisabled(!imageUrl);
    }, [imageUrl]);

    const handleFileChange = (e) => {
        const imageFile = e.target.files[0];
        if (imageFile) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageUrl(reader.result);
                setImageFile(imageFile);
            };
            reader.readAsDataURL(imageFile);
        } else {
            setImageUrl('');
            setImageFile(null);
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
            tags,
        };

        try {
            const newPin = await createPin(pinData);
            if (newPin && newPin.id) {
                navigate(`/pins/${newPin.id}`);
            } else {
                throw new Error('Failed to create pin');
            }
        } catch (error) {
            setErrors({ general: error.message });
        }
    };

    return (
        <div>
            <h1>Create a New Pin</h1>
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
                        disabled={isFormDisabled}
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
                        disabled={isFormDisabled}
                    />
                    {errors.description && <p>{errors.description}</p>}
                </div>

                {/* Tags */}
                <TagSelector
                    selectedTags={tags}
                    setSelectedTags={setTags}
                    tagOptions={tagOptions}
                    isFormDisabled={isFormDisabled}
                />
                {errors.tags && <p>{errors.tags}</p>}

                <button type="submit" disabled={isFormDisabled}>
                    Create Pin
                </button>
                {errors.general && <p>{errors.general}</p>}
            </form>
        </div>
    );
};

export default PinForm;
