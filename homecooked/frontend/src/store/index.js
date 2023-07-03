import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import sessionSellerReducer from './sellerSession';
import sessionBuyerReducer from './buyerSession';
// import ratingsReducer from "./ratings"
// import spotsReducer from "./spots";
import reviewsReducer from "./reviews"
import bookingReducer from "./bookings";


const rootReducer = combineReducers({
    sessionUserBuy: sessionBuyerReducer,
    sessionUserSell: sessionSellerReducer,
    // ratings: ratingsReducer,
    reviews: reviewsReducer,
    bookings: bookingReducer
  
});

let enhancer;

if (process.env.NODE_ENV === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require("redux-logger").default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};


export default configureStore;
