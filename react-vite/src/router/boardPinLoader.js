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

// GET pins on board from board id
export const fetchBoardPins = (boardId) =>
    boardPinLoader('GET', `/api/boardpins/board/${boardId}/pins`);

// Add pin to board
export const addPinToBoard = (boardId, pinId) =>
    boardPinLoader('POST', `/api/boardpins/boards/${boardId}/pins/${pinId}/add`);

// Remove pin from board
export const removePinFromBoard = (boardId, pinId) =>
    boardPinLoader('DELETE', `/api/boardpins/boards/${boardId}/pins/${pinId}/remove`);
