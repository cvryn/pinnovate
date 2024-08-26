export const commentLoader = async (method, endpoint, data = null) => {
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

export const getComments = () => commentLoader('GET', '/api/comments/all');
export const getCommentsByPinId = (pinId) => commentLoader('GET', `/api/comments/pin/${pinId}`);

export const createComments = (pinId, data) => commentLoader('POST', `/api/comments/pin/${pinId}`, data);

export const updateComment = (commentId, data) => commentLoader('PUT', `/api/comments/${commentId}`, data);

export const deleteComment = (commentId) => commentLoader('DELETE', `/api/comments/${commentId}`);
