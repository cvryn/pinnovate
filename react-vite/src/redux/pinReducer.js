export const LOAD_PINS = "pins/LOAD_PINS";
export const ADD_PIN = "pins/ADD_PIN";
export const UPDATE_PIN = "pins/UPDATE_PIN";
export const DELETE_PIN = "pins/DELETE_PIN";
export const LOAD_PIN = "pins/LOAD_PIN";

// Action Creators
export const loadPins = (pins) => ({
  type: LOAD_PINS,
  pins,
});

export const addPin = (pin) => ({
  type: ADD_PIN,
  pin,
});

export const updatePin = (pin) => ({
  type: UPDATE_PIN,
  pin,
});

export const deletePin = (pinId) => ({
  type: DELETE_PIN,
  pinId,
});

export const loadPin = (pin) => ({
  type: LOAD_PIN,
  pin,
});

// Thunks

// GET all pins
export const fetchPins = () => async (dispatch) => {
  try {
    const response = await fetch("/api/pins/");
    if (!response.ok) throw new Error("Failed to fetch pins");
    const data = await response.json();
    dispatch(loadPins(data));
  } catch (error) {
    console.error(error);
  }
};

// GET pin by id
export const fetchPin = (pinId) => async (dispatch) => {
  try {
    const response = await fetch(`/api/pins/${pinId}`);
    if (!response.ok) throw new Error("Failed to fetch pin");
    const data = await response.json();
    dispatch(loadPin(data));
  } catch (error) {
    console.error(error);
  }
};

// POST create new pin
export const createPin = (pin) => async (dispatch) => {
  try {
    const response = await fetch("/api/pins/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pin),
    });

    const responseBody = await response.json();

    if (!response.ok) {
      console.error("Error response:", response.status, responseBody);
      throw new Error(responseBody.error || "Failed to create pin");
    }

    dispatch(addPin(responseBody));
    return responseBody;
  } catch (error) {
    console.error("Create Pin Error:", error);
    throw error;
  }
};

// PUT edit existing pin
export const editPin = (pinId, pin) => async (dispatch) => {
  try {
    const response = await fetch(`/api/pins/${pinId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pin),
    });
    if (!response.ok) throw new Error("Failed to update pin");
    const data = await response.json();
    dispatch(updatePin(data));
  } catch (error) {
    console.error(error);
  }
};

// DELETE pin by id
export const removePin = (pinId) => async (dispatch) => {
  try {
    const response = await fetch(`/api/pins/${pinId}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Failed to delete pin");
    dispatch(deletePin(pinId));
  } catch (error) {
    console.error(error);
  }
};

// Reducer
const initialState = {
  allPins: {},
  singlePin: null,
};

const pinReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_PINS:
      return {
        ...state,
        allPins: action.pins.reduce((acc, pin) => {
          acc[pin.id] = pin;
          return acc;
        }, {}),
      };
    case ADD_PIN:
      return {
        ...state,
        allPins: {
          ...state.allPins,
          [action.pin.id]: action.pin,
        },
      };
    case UPDATE_PIN:
      return {
        ...state,
        allPins: {
          ...state.allPins,
          [action.pin.id]: action.pin,
        },
      };
    case DELETE_PIN: {
      const remainingPins = { ...state.allPins };
      delete remainingPins[action.pinId];
      return {
        ...state,
        allPins: remainingPins,
      };
    }
    case LOAD_PIN:
      return {
        ...state,
        singlePin: action.pin,
      };
    default:
      return state;
  }
};

export default pinReducer;
