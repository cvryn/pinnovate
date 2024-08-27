// Action Types
const LOAD_TAGS = 'tags/LOAD_TAGS';
const ADD_TAG = 'tags/ADD_TAG';
const EDIT_TAG = 'tags/EDIT_TAG';
const DELETE_TAG = 'tags/DELETE_TAG';

// Action Creators
export const loadTags = (tags) => ({
    type: LOAD_TAGS,
    tags,
});

export const addTag = (tag) => ({
    type: ADD_TAG,
    tag,
});

export const editTag = (tag) => ({
    type: EDIT_TAG,
    tag,
});

export const deleteTag = (tagId) => ({
    type: DELETE_TAG,
    tagId,
});

// Thunks
export const fetchTags = () => async (dispatch) => {
    try {
        const response = await fetch('/api/tags/all');
        if (!response.ok) throw new Error('Failed to fetch tags');
        const data = await response.json();
        dispatch(loadTags(data));
    } catch (error) {
        console.error('Error fetching tags:', error);
    }
};

export const createTag = (tagData) => async (dispatch) => {
    try {
        const response = await fetch('/api/tags', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(tagData),
        });
        if (!response.ok) throw new Error('Failed to create tag');
        const data = await response.json();
        dispatch(addTag(data));
    } catch (error) {
        console.error('Error creating tag:', error);
    }
};

export const updateTag = (tagData) => async (dispatch) => {
    try {
        const response = await fetch(`/api/tags/${tagData.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(tagData),
        });
        if (!response.ok) throw new Error('Failed to update tag');
        const data = await response.json();
        dispatch(editTag(data));
    } catch (error) {
        console.error('Error updating tag:', error);
    }
};

export const removeTag = (tagId) => async (dispatch) => {
    try {
        const response = await fetch(`/api/tags/${tagId}`, {
            method: 'DELETE',
        });
        if (!response.ok) throw new Error('Failed to delete tag');
        dispatch(deleteTag(tagId));
    } catch (error) {
        console.error('Error deleting tag:', error);
    }
};

// Initial State
const initialState = {
    allTags: {},
};

const tagReducer = (state = initialState, action) => {
    switch(action.type){
        case LOAD_TAGS: {
            const newState = { ...state, allTags: {} };
            action.tags.forEach(tag => {
                newState.allTags[tag.id] = tag;
            });
            return newState;
        }
        case ADD_TAG:
            return {
                ...state,
                allTags: {
                    ...state.allTags,
                    [action.tag.id]: action.tag,
                },
            };
        case EDIT_TAG:
            return {
                ...state,
                allTags: {
                    ...state.allTags,
                    [action.tag.id]: action.tag,
                },
            };
        case DELETE_TAG: {
            const updatedTags = { ...state.allTags };
            delete updatedTags[action.tagId];
            return {
                ...state,
                allTags: updatedTags,
            };
        }
        default:
            return state;
    }
};


export default tagReducer;
