// App.js
import React from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Header from "./components/Header/Header"
import Footer from "./components/Footer/Footer"
import Home from "./components/Home/Home"
import About from "./components/About/About"
import Tasks from "./components/Tasks/Tasks"
import Contact from "./components/Contact/Contact"
import LoginForm from "./components/LoginForm/LoginForm"
import RegistrationForm from "./components/RegistrationForm/RegistrationForm"
import Dashboard from "./components/Dashboard/Dashboard"
import "./components/Footer/Footer.css"

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/registration" element={<RegistrationForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        {/* Render LoginForm on /login route */}
        <Route path="/login" element={<LoginForm />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
