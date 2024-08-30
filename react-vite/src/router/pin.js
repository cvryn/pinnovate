export const pinLoader = async (method, endpoint, data = null) => {
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
// GET all pins
export const fetchPins = () => pinLoader('GET', '/api/pins');

// GET pins by pin Id
export const fetchPinById = (id) => pinLoader('GET', `/api/pins/${id}`);

// Create a new pin
export const createPin = (data) => pinLoader('POST', '/api/pins/new', data);

// Edit an existing pin
export const updatePin = (id, data) => pinLoader('PUT', `/api/pins/${id}/edit`, data);

// Delete pin
export const deletePin = (id) => pinLoader('DELETE', `/api/pins/${id}`);
