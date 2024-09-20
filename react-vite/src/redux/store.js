import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
  combineReducers,
} from "redux";
import thunk from "redux-thunk";
import sessionReducer from "./session";
import pinReducer from "./pinReducer";
import tagReducer from "./tagReducer";
import boardPinReducer from "./boardPinReducer";
import likeReducer from "./likeReducer";

const rootReducer = combineReducers({
  session: sessionReducer,
  pin: pinReducer,
  tag: tagReducer,
  boardPins: boardPinReducer,
  like: likeReducer,
});

let enhancer;
if (import.meta.env.MODE === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = (await import("redux-logger")).default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
