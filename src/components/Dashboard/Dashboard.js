import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { connect } from "react-redux"
import {
  fetchUsers,
  updateUser,
  deleteUser,
} from "../../redux/actions/userActions"

import { logout } from "../../redux/actions/authActions" // Import the logout ction creator
import "./Dashboard.css"

const Dashboard = (props) => {
  const { users, loading, error, token } = props
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logout()) // Dispatch the logout action to clear the token from the Redux store
    navigate("/") // Redirect to the login page after logout
  }

  useEffect(() => {
    // Fetch the user data from the server using Redux action
    console.log("Dashboard component mounted")
    console.log(
      "Token before API call or dispatch fetchUsers in dashboard:",
      token
    )

    props.fetchUsers(token)
  }, [token])

  if (loading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>{error}</p>
  }

  const handleEditUser = async (userId) => {
    // Implement logic to update a user using Redux action
    // The updateUser action will handle the API call and state update
    const user = users.find((user) => user._id === userId)
    if (!user) {
      throw new Error("User not found")
    }

    const updatedName = prompt("Enter the updated name:")
    const updatedUser = { ...user, name: updatedName }
    props.updateUser(userId, updatedUser, token) // Use updateUser action from props
  }

  const handleDeleteUser = async (userId) => {
    // Show a confirmation dialog to the user
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    )

    if (confirmDelete) {
      // Implement logic to delete a user using Redux action
      // The deleteUser action will handle the API call and state update
      props.deleteUser(userId, token) // Use deleteUser action from props
    }
  }

  return (
    <div className="dashboard-page-container">
      <div className="dashboard-container">
        <h2 className="dashboard-title">Welcome to the Dashboard</h2>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Date of Birth</th>
                <th>User Role</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.dateOfBirth}</td>
                  <td>{user.userRole}</td>
                  <td>{user.email}</td>
                  <td>
                    <button onClick={() => handleEditUser(user._id)}>
                      Edit
                    </button>
                    <button onClick={() => handleDeleteUser(user._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="attractive-message">Enjoy your time in the Dashboard!</p>
        <div className="additional-content">
          <p>Here's some additional content:</p>
          <ul>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
const mapStateToProps = (state) => {
  return {
    users: state.users.users,
    loading: state.users.loading,
    error: state.users.error,
    token: state.auth.token,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUsers: (token) => dispatch(fetchUsers(token)),

    updateUser: (userId, updatedUser, token) =>
      dispatch(updateUser(userId, updatedUser, token)),

    deleteUser: (userId, token) => dispatch(deleteUser(userId, token)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
