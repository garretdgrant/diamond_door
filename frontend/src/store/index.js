import { createStore, combineReducers, applyMiddleware, compose} from "redux";
import thunk from "redux-thunk";
import companiesReducer from "./companies";
import sessionReducer from "./session";
import reviewsReducer from "./reviews";
import interviewsReducer from "./interviews";
import followsReducer from "./follows";

const rootReducer = combineReducers({
    interviews: interviewsReducer,
    reviews: reviewsReducer,
    session: sessionReducer,
    companies: companiesReducer,
    follows: followsReducer
})

let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState = {})=>{
    return createStore(rootReducer,preloadedState, enhancer)
}

export default configureStore;