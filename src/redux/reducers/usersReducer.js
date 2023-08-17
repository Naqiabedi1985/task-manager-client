import {
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAILURE,
} from "../actions/userActions"

const initialState = {
  users: [],
  loading: true,
  error: "",
}

const usersReducer = (state = initialState, action) => {
  console.log("Action dispatched:", action.type) // Log the dispatched action type
  switch (action.type) {
    case FETCH_USERS_REQUEST:
      console.log("FETCH_USERS_REQUEST action dispatched") // Log the specific action
      return {
        ...state,
        loading: true,
        error: "",
      }
    case FETCH_USERS_SUCCESS:
      console.log("FETCH_USERS_SUCCESS action dispatched") // Log the specific action
      return {
        ...state,
        users: action.payload,
        loading: false,
        error: "",
      }
    case FETCH_USERS_FAILURE:
      console.log("FETCH_USERS_FAILURE action dispatched") // Log the specific action
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    case UPDATE_USER_REQUEST:
      console.log("UPDATE_USER_REQUEST action dispatched") // Log the specific action
      return {
        ...state,
        loading: true,
        error: "",
      }
    case UPDATE_USER_SUCCESS:
      console.log("UPDATE_USER_SUCCESS action dispatched") // Log the specific action
      // Update the user in the state with the updated details
      const updatedUsers = state.users.map((user) =>
        user._id === action.payload.userId ? action.payload.updatedUser : user
      )
      return {
        ...state,
        users: updatedUsers,
        loading: false,
        error: "",
      }
    case UPDATE_USER_FAILURE:
      console.log("UPDATE_USER_FAILURE action dispatched") // Log the specific action
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    case DELETE_USER_REQUEST:
      console.log("DELETE_USER_REQUEST action dispatched") // Log the specific action
      return {
        ...state,
        loading: true,
        error: "",
      }
    case DELETE_USER_SUCCESS:
      console.log("DELETE_USER_SUCCESS action dispatched") // Log the specific action
      // Remove the deleted user from the state
      const filteredUsers = state.users.filter(
        (user) => user._id !== action.payload
      )
      return {
        ...state,
        users: filteredUsers,
        loading: false,
        error: "",
      }
    case DELETE_USER_FAILURE:
      console.log("DELETE_USER_FAILURE action dispatched") // Log the specific action
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export default usersReducer
