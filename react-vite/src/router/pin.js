export const pinLoader = async (method, endpoint, data = null) => {
    const options = {
        method,
        headers: {
            "Content-Type": "application/json",
        },
        ...(data && { body: JSON.stringify(data) }),
    };

    try {
        const response = await fetch(endpoint, options);

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Server Error: ${response.status} - ${errorText}`);
        }

        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error("Failed to load data:", error);
        throw error;
    }
};

export const fetchPins = () => pinLoader('GET', '/api/pins');
export const fetchPinById = (id) => pinLoader('GET', `/api/pins/${id}`);

export const createPin = (data) => pinLoader('POST', '/api/pins/new', data);
export const updatePin = (id, data) => pinLoader('PUT', `/api/pins/${id}/edit`, data);

export const deletePin = (id) => pinLoader('DELETE', `/api/pins/${id}`);
