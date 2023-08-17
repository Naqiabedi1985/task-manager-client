import React, { useState } from "react"

const RegistrationForm = () => {
  const [name, setName] = useState("")
  const [dateOfBirth, setDateOfBirth] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [userRole, setUserRole] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [successMessage, setSuccessMessage] = useState("")
  const [passwordClicked, setPasswordClicked] = useState(false)

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setErrorMessage("Invalid email format")
    } else {
      setErrorMessage("")
    }
  }

  const validatePassword = () => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
    if (!passwordRegex.test(password)) {
      setErrorMessage(
        "Password must be at least 8 characters long and contain at least one letter and one number"
      )
    } else {
      setErrorMessage("")
    }
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    try {
      // Perform input validations using regex or other methods
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/

      if (!emailRegex.test(email)) {
        setErrorMessage("Invalid email format")
        return
      }

      if (!passwordRegex.test(password)) {
        setErrorMessage(
          "Password must be at least 8 characters long and contain at least one letter and one number"
        )
        return
      }

      // Validate date format and check if the user is above or equal to 18 years old
      const dobDate = new Date(dateOfBirth)
      if (isNaN(dobDate) || dobDate >= new Date()) {
        setErrorMessage("Invalid date of birth")
        return
      }

      // Send a request to the server to register the user
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          dateOfBirth,
          email,
          password,
          userRole,
        }),
      })

      if (response.ok) {
        // Clear form fields
        setName("")
        setDateOfBirth("")
        setEmail("")
        setPassword("")
        setUserRole("")
        setSuccessMessage("Registration successful!")
      } else {
        // Handle registration error
        const errorData = await response.json()
        throw new Error(errorData.message)
      }
    } catch (error) {
      setErrorMessage("An error occurred during registration: " + error)
    }
  }

  return (
    <div className="registration-form">
      <h2>Registration</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="date"
          placeholder="Date of Birth"
          value={dateOfBirth}
          onChange={(e) => setDateOfBirth(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={validateEmail}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onBlur={validatePassword}
          onFocus={() => setPasswordClicked(true)}
        />
        {passwordClicked && (
          <span className="password-hint">
            Password should be at least 8 characters long and contain at least
            one letter and one number.
          </span>
        )}
        <select value={userRole} onChange={(e) => setUserRole(e.target.value)}>
          <option value="">Select User Role</option>
          <option value="project-executive">Project Executive</option>
          <option value="project-manager">Project Manager</option>
          <option value="accountant">Accountant</option>
          <option value="admin">Admin</option>
          <option value="hr">HR</option>
        </select>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        {successMessage && (
          <div className="success-message">{successMessage}</div>
        )}
        <button type="submit">Register</button>
      </form>
    </div>
  )
}

export default RegistrationForm
