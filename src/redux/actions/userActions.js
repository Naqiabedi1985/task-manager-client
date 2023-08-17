// userActions.js
export const FETCH_USERS_REQUEST = "FETCH_USERS_REQUEST"
export const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS"
export const FETCH_USERS_FAILURE = "FETCH_USERS_FAILURE"

// Action creator for fetching users
export const fetchUsersRequest = (token) => ({
  type: FETCH_USERS_REQUEST,
  payload: token,
})

export const fetchUsersSuccess = (users) => ({
  type: FETCH_USERS_SUCCESS,
  payload: users,
})

export const fetchUsersFailure = (error) => ({
  type: FETCH_USERS_FAILURE,
  payload: error,
})

// Action creator for updating user
export const UPDATE_USER_REQUEST = "UPDATE_USER_REQUEST"
export const UPDATE_USER_SUCCESS = "UPDATE_USER_SUCCESS"
export const UPDATE_USER_FAILURE = "UPDATE_USER_FAILURE"

export const updateUserRequest = (userId, updatedUser, token) => ({
  type: UPDATE_USER_REQUEST,
  payload: { userId, updatedUser, token },
})

export const updateUserSuccess = (userId, updatedUser, token) => ({
  type: UPDATE_USER_SUCCESS,
  payload: { userId, updatedUser, token },
})

export const updateUserFailure = (error) => ({
  type: UPDATE_USER_FAILURE,
  payload: error,
})

// Action creator for deleting user
export const DELETE_USER_REQUEST = "DELETE_USER_REQUEST"
export const DELETE_USER_SUCCESS = "DELETE_USER_SUCCESS"
export const DELETE_USER_FAILURE = "DELETE_USER_FAILURE"

export const deleteUserRequest = (userId, token) => ({
  type: DELETE_USER_REQUEST,
  payload: { userId, token },
})

export const deleteUserSuccess = () => ({
  type: DELETE_USER_SUCCESS,
})

export const deleteUserFailure = (error) => ({
  type: DELETE_USER_FAILURE,
  payload: error,
})

// Thunk action creator for fetching users from the server
export const fetchUsers = (token) => {
  return (dispatch) => {
    console.log("\nfetchUsers action dispatched - userActions.js")

    dispatch(fetchUsersRequest(token))

    fetch("http://localhost:5000/dashboard", {
      headers: {
        Authorization: `Bearer ${token}`, // Add "Bearer" and a space before the token
        Accept: "application/json", // Specify the accepted response format
        "Content-Type": "application/json", // Specify the format of the request body
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("fetchUsers success response from userActions.js: ", data)
        if (data.success) {
          setTimeout(() => {
            dispatch(fetchUsersSuccess(data.data))
          }, 2000)
        } else {
          dispatch(fetchUsersFailure(data.error))
        }
      })
      .catch((error) => {
        console.log("fetchUsers error from userActions.js: ", error)
        dispatch(
          fetchUsersFailure(
            "An error occurred during the request: " +
              (error.message || error.toString())
          )
        )
      })
  }
}

// Thunk action creator for updating user details
export const updateUser = (userId, updatedUser, token) => {
  return async (dispatch) => {
    console.log("\nupdateUser action dispatched - userActions.js")
    console.log(
      "\nuserId in updateUser Thunk action creator in userActions.js is: ",
      userId
    )
    dispatch(updateUserRequest(userId, updatedUser, token))

    try {
      const response = await fetch(
        `http://localhost:5000/dashboard/${userId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedUser),
        }
      )

      console.log("updateUser success response from userActions.js:", response)

      const data = await response.json()
      if (data.success) {
        console.log(
          "if (data.success) in updateUser success response from userActions.js:"
        )
        dispatch(updateUserSuccess())
        // Optionally, you can dispatch fetchUsers again here to update the state with the latest data after successful update.
        dispatch(fetchUsers(token))
      } else {
        dispatch(updateUserFailure(data.error))
      }
    } catch (error) {
      console.log("updateUser error from userActions.js:", error)
      dispatch(
        updateUserFailure(
          "An error occurred while updating user details: " +
            (error.message || error.toString())
        )
      )
    }
  }
}

// Thunk action creator for deleting user
export const deleteUser = (userId, token) => {
  return async (dispatch) => {
    dispatch(deleteUserRequest(userId, token))

    try {
      const response = await fetch(
        `http://localhost:5000/dashboard/${userId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )

      const data = await response.json()
      if (data.success) {
        dispatch(deleteUserSuccess())
        // Optionally, you can dispatch fetchUsers again here to update the state with the latest data after successful delete.
        dispatch(fetchUsers(token))
      } else {
        dispatch(deleteUserFailure(data.error))
      }
    } catch (error) {
      dispatch(
        deleteUserFailure(
          "An error occurred while deleting the user: " +
            (error.message || error.toString())
        )
      )
    }
  }
}
