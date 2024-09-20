export const likeLoader = async (method, endpoint, data = null) => {
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
}

// GET all liked pins
export const getLikedPins = () => likeLoader('GET', '/api/likes/current/all');

// POST like pin
export const addLike = (pinId) => likeLoader('POST', `/api/likes/${pinId}/like`);

// DELETE unlike pin
export const removeLike = (pinId) => likeLoader('DELETE', `/api/likes/${pinId}/unlike`);
