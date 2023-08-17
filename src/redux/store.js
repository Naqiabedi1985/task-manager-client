// store.js
import { configureStore, combineReducers } from "@reduxjs/toolkit"
import thunk from "redux-thunk"
import createSagaMiddleware from "redux-saga" // If you want to use Redux Saga

// Import reducers (if you have more reducers, combine them here)
import usersReducer from "./reducers/usersReducer"
import authReducer from "./reducers/authReducer"

// Create the root reducer by combining all reducers
const rootReducer = combineReducers({
  users: usersReducer,
  auth: authReducer,
})

// Create middleware (we'll use thunk and saga, choose one if you want)
//const sagaMiddleware = createSagaMiddleware() // If you want to use Redux Saga
const middleware = [thunk]

// Create the Redux store using configureStore
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(...middleware),
  devTools: process.env.NODE_ENV !== "production", // Enable Redux DevTools in development
})

export default store
