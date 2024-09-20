export const LOAD_LIKED_PINS = "likes/LOAD_LIKED_PINS";
export const LIKE_PIN = "likes/LIKE_PIN";
export const UNLIKE_PIN = "likes/UNLIKE_PIN";

// Action Creators
export const loadLikedPins = (pins) => ({
  type: LOAD_LIKED_PINS,
  pins,
});

export const likePin = (pinId) => ({
  type: LIKE_PIN,
  pinId,
});

export const unlikePin = (pinId) => ({
  type: UNLIKE_PIN,
  pinId,
});

// Thunks

// GET Fetch all Liked Pins by Current User
export const fetchLikedPins = () => async (dispatch) => {
  try {
    const response = await fetch("/api/likes/current/all");
    if (response.ok) {
      const { liked_pins } = await response.json();
      console.log("Fetched liked pins from backend:", liked_pins);
      dispatch(loadLikedPins(liked_pins.map((pin) => pin.id))); // Store only pin IDs
    } else {
      console.error("Error fetching liked pins");
    }
  } catch (error) {
    console.error("Error in fetchLikedPins:", error);
  }
};

// POST Add Pin to Liked Pins (Like a Pin)
export const addLike = (pinId) => async (dispatch) => {
  const response = await fetch(`/api/likes/${pinId}/like`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    dispatch(likePin(pinId));
  }
  return response;
};

// DELETE Remove Pin from Liked Pins (Unlike a Pin)
export const removeLike = (pinId) => async (dispatch) => {
  const response = await fetch(`/api/likes/${pinId}/unlike`, {
    method: "DELETE",
  });
  if (response.ok) {
    dispatch(unlikePin(pinId));
  }
  return response;
};

const initialState = {};

// Reducer
const likeReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_LIKED_PINS: {
      const newState = { ...state };
      action.pins.forEach(pinId => {
        newState[pinId] = true;
      });
      return newState;
    }
    case LIKE_PIN: {
      const newState = { ...state };
      newState[action.pinId] = true;
      return newState;
    }
    case UNLIKE_PIN: {
        const newState = { ...state };
        delete newState[action.pinId];
        return newState;
    }
    default:
      return state;
  }
};

export default likeReducer;
