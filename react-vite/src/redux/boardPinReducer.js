// Action Types
export const LOAD_BOARD_PINS = "boardpins/LOAD_BOARD_PINS";
export const ADD_PIN_TO_BOARD = "boardpins/ADD_PIN_TO_BOARD";
export const REMOVE_PIN_FROM_BOARD = "boardpins/REMOVE_PIN_FROM_BOARD";

// Action Creators
export const loadBoardPins = (pins) => ({
  type: LOAD_BOARD_PINS,
  pins,
});

export const addPinToBoard = (pin) => ({
  type: ADD_PIN_TO_BOARD,
  pin,
});

export const removePinFromBoard = (pinId) => ({
  type: REMOVE_PIN_FROM_BOARD,
  pinId,
});

// Thunks

// GET all pins for a board
export const fetchBoardPins = (boardId) => async (dispatch) => {
  try {
    const response = await fetch(`/api/boardpins/board/${boardId}/pins`);
    if (!response.ok) throw new Error("Failed to fetch pins for the board");
    const data = await response.json();
    dispatch(loadBoardPins(data));
  } catch (error) {
    console.error(error);
  }
};

// POST add pin to a board
export const addNewPinToBoard = (boardId, pinId) => async (dispatch) => {
  try {
    const response = await fetch(`/api/boardpins/board/${boardId}/pins/${pinId}/add`, {
      method: "POST",
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error response:", response.status, errorData);
      throw new Error(errorData.error || "Failed to add pin to board");
    }

    dispatch(addPinToBoard({ id: pinId }));
  } catch (error) {
    console.error("Add Pin to Board Error:", error);
    throw error;
  }
};

// DELETE pin from a board
export const removeAPinFromBoard = (boardId, pinId) => async (dispatch) => {
  try {
    const response = await fetch(`/api/boardpins/board/${boardId}/pins/${pinId}/remove`, {
      method: "DELETE",
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error response:", response.status, errorData);
      throw new Error(errorData.error || "Failed to remove pin from board");
    }

    dispatch(removePinFromBoard(pinId));
  } catch (error) {
    console.error("Remove Pin from Board Error:", error);
    throw error;
  }
};

const initialState = {
  boardPins: {},
};

// Reducer
const boardPinReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_BOARD_PINS:
      return {
        ...state,
        boardPins: action.pins.reduce((acc, pin) => {
          acc[pin.id] = pin;
          return acc;
        }, {}),
      };
    case ADD_PIN_TO_BOARD:
      return {
        ...state,
        boardPins: {
          ...state.boardPins,
          [action.pin.id]: action.pin,
        },
      };
    case REMOVE_PIN_FROM_BOARD: {
      const remainingPins = { ...state.boardPins };
      delete remainingPins[action.pinId];
      return {
        ...state,
        boardPins: remainingPins,
      };
    }
    default:
      return state;
  }
};

export default boardPinReducer;
