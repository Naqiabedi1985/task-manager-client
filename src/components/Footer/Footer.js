import React from "react"
import "./Footer.css" // Import the CSS file that contains the footer styles

const Footer = () => {
  return (
    <footer className="footer">
      {" "}
      {/* Use className instead of class */}
      &copy; 2023 Project Manager. All rights reserved.
    </footer>
  )
}

export default Footer
