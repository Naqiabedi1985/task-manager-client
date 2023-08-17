// LoginForm.js

import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux" // Import useDispatch and useSelector from React Redux
import { login } from "../../redux/actions/authActions"

const LoginForm = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      await dispatch(login(email, password))
      console.log("\nLogin successful, navigating to dashboard...")
      navigate("/dashboard") // Redirect to the dashboard after successful login
    } catch (error) {
      setErrorMessage("An error occurred during login: " + error.message)
    }
  }

  const handleCreateAccount = (e) => {
    e.preventDefault()
    navigate("/registration") // Redirect to RegistrationForm component
  }

  return (
    <div className="limiter">
      <div className="container-login100">
        <div className="wrap-login100">
          <form className="login100-form validate-form" onSubmit={handleLogin}>
            <span className="login100-form-title">Member Login</span>

            <div
              className="wrap-input100 validate-input"
              data-validate="Valid email is required: ex@abc.xyz"
            >
              <input
                className="input100"
                type="text"
                name="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <span className="focus-input100"></span>
              <span className="symbol-input100">
                <i className="fa fa-envelope" aria-hidden="true"></i>
              </span>
            </div>

            <div
              className="wrap-input100 validate-input"
              data-validate="Password is required"
            >
              <input
                className="input100"
                type="password"
                name="pass"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span className="focus-input100"></span>
              <span className="symbol-input100">
                <i className="fa fa-lock" aria-hidden="true"></i>
              </span>
            </div>

            {errorMessage && <div className="text-danger">{errorMessage}</div>}

            <div className="container-login100-form-btn">
              <button className="login100-form-btn" type="submit">
                Login
              </button>
            </div>

            <div className="text-center p-t-12">
              <span className="txt1">Forgot</span>
              <a className="txt2" href="#">
                Username / Password?
              </a>
            </div>

            <div className="text-center p-t-136">
              <a className="txt2" href="#" onClick={handleCreateAccount}>
                Create your Account
                <i
                  className="fa fa-long-arrow-right m-l-5"
                  aria-hidden="true"
                ></i>
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LoginForm
