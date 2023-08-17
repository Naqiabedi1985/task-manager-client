// authActions.js

// Define action types as strings
export const LOGIN_SUCCESS = "LOGIN_SUCCESS"
export const LOGIN_FAILURE = "LOGIN_FAILURE"
export const LOGOUT = "LOGOUT"

// Action creators
export const loginSuccess = (token) => ({
  type: LOGIN_SUCCESS,
  payload: token,
})

export const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  payload: error,
})

export const logout = () => ({
  type: LOGOUT,
})

export const login = (email, password) => {
  return async (dispatch) => {
    try {
      // Send a request to the server to log in
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      if (response.ok) {
        const data = await response.json()

        // Save the token to local storage
        localStorage.setItem("token", data.token)

        // Dispatch the loginSuccess action with the token
        dispatch(loginSuccess(data.token))
      } else {
        // Handle login error
        const errorData = await response.json()
        throw new Error(errorData.error)
      }
    } catch (error) {
      // Dispatch the loginFailure action with the error message
      dispatch(loginFailure("An error occurred during login: " + error))
    }
  }
}
