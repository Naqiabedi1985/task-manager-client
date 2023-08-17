import React from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import LoginForm from "./LoginForm"
import RegistrationForm from "./RegistrationForm"

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/registration" element={<RegistrationForm />} />
      </Routes>
    </Router>
  )
}

export default App
