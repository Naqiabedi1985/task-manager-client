import React from "react"
import { Link } from "react-router-dom" // Import the Link component

const Home = () => {
  return (
    <div>
      <h1>Welcome to Project-Management App</h1>
      <p>This is the home page of Project-Management application.</p>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        {/* Use the Link component to link to the /login route */}
        <Link to="/login">Login</Link>
      </div>
    </div>
  )
}

export default Home
