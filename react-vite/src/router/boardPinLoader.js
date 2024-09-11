export const boardPinLoader = async (method, endpoint, data = null) => {
    let options = { method };

    if (data instanceof FormData) {
        options.body = data;
    } else if (data) {
        options.headers = { "Content-Type": "application/json" };
        options.body = JSON.stringify(data);
    }

    try {
        const response = await fetch(endpoint, options);
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Server Error: ${response.status} - ${errorText}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Failed to load data:", error);
        throw error;
    }
};

// Add pin to board
export const addPinToBoard = (boardId, pinId) =>
    boardPinLoader('POST', `/api/boards/${boardId}/pins/${pinId}/add`);

// Remove pin from board
export const removePinFromBoard = (boardId, pinId) =>
    boardPinLoader('DELETE', `/api/boards/${boardId}/pins/${pinId}/remove`);
