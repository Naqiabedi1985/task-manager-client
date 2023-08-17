import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useLocation } from "react-router-dom"
import {
  fetchUsersRequest,
  updateUserRequest,
  deleteUserRequest,
} from "../../redux/actions/userActions"
import "./Dashboard.css"

const Dashboard = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const navigate = useNavigate()
  const location = useLocation()
  const token = location.state && location.state.token

  console.log(`\n Dashboard.js >> token: ${token}`)

  const handleLogout = () => {
    // Clear the token from local storage
    localStorage.removeItem("token")

    // Redirect to login page after logout
    navigate("/")
  }

  useEffect(() => {
    // Fetch the user data from the server
    fetch("http://localhost:5000/dashboard", {
      headers: {
        Authorization: `Bearer ${token}`, // Add "Bearer" and a space before the token
        Accept: "application/json", // Specify the accepted response format
        "Content-Type": "application/json", // Specify the format of the request body
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setUsers(data.data)
        } else {
          setError(data.error)
        }
        setLoading(false)
      })
      .catch((error) => {
        setError(
          "An error occurred during the request: " +
            (error.message || error.toString())
        )
        setLoading(false)
      })
  }, [token])

  if (loading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>{error}</p>
  }

  const handleEditUser = async (userId) => {
    try {
      // Find the user by ID
      const user = users.find((user) => user._id === userId)
      if (!user) {
        throw new Error("User not found")
      }

      // Get the updated name from the edit form values
      const updatedName = prompt("Enter the updated name:")

      // Create an updatedUser object with only the name property updated
      const updatedUser = { ...user, name: updatedName }

      // Send a PUT request to the server with the updated user details
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

      const data = await response.json()
      if (data.success) {
        // Update the user in the state with the updated details
        setUsers((prevUsers) => {
          const updatedUsers = [...prevUsers]
          const userIndex = updatedUsers.findIndex(
            (user) => user._id === userId
          )
          if (userIndex !== -1) {
            updatedUsers[userIndex] = updatedUser
          }
          return updatedUsers
        })
      } else {
        throw new Error(data.error)
      }
    } catch (error) {
      console.log(error)
      // Handle error in updating user details
    }
  }

  const handleDeleteUser = async (userId) => {
    try {
      // Implement logic to delete a user
      // Send a DELETE request to the server to delete the user by ID
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
        // Remove the deleted user from the state
        setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId))
      } else {
        throw new Error(data.error)
      }
    } catch (error) {
      console.log(error)
      // Handle error in deleting user
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

export default Dashboard
