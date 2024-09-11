export const boardLoader = async (method, endpoint, data = null) => {
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

// GET all boards
export const fetchBoards = () => boardLoader('GET', '/api/boards/all');

// GET board by board Id
export const fetchBoardById = (id) => boardLoader('GET', `/api/boards/${id}`);

// Create a new board
export const createBoard = (data) => boardLoader('POST', '/api/boards/new', data);

// Edit an existing board
export const updateBoard = (id, data) => boardLoader('PUT', `/api/boards/${id}/edit`, data);

// Delete a board
export const deleteBoard = (id) => boardLoader('DELETE', `/api/boards/${id}`);
