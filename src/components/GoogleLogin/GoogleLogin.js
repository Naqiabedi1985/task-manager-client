import { useEffect, useState } from "react"
import "./LoginWithGoogle.css"

export const LoginWithGoogle = () => {
  const [userData, setUserData] = useState(null)

  useEffect(() => {
    window.responseGoogle = (response) => {
      const accessToken = response.credential

      console.log(`\n\naccessToken: ${accessToken}`)

      // Send the access token to the server and retrieve user information
      fetch("https://localhost:5000/api/google/userinfo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Content-Security-Policy":
            "connect-src https://accounts.google.com/gsi/; frame-src https://accounts.google.com/gsi/; script-src https://accounts.google.com/gsi/client; style-src https://accounts.google.com/gsi/style;",
        },
        body: JSON.stringify({ accessToken }),
      })
        .then((response) => response.json())
        .then((data) => {
          // Update the user data state with the retrieved information
          setUserData(data)
        })
        .catch((error) => {
          console.error("Error:", error)
        })
    }

    // Inject the Google Sign-In script
    const script = document.createElement("script")
    script.src = "https://accounts.google.com/gsi/client"
    script.async = true
    document.body.appendChild(script)

    return () => {
      // Clean up for React lifecycle
      window.responseGoogle = undefined
      document.body.removeChild(script)
    }
  }, [])

  return (
    <>
      <div
        id="g_id_onload"
        data-client_id={
          "859162789948-gs9b0erka3q4lnebn870hdpqop0eruqo.apps.googleusercontent.com"
        }
        data-callback="responseGoogle"
        data-context="signin"
        data-ux_mode="popup"
        data-auto_prompt="false"
      ></div>

      <div
        className="g_id_signin custom-google-button"
        data-type="standard"
        data-shape="rectangular"
        data-theme="filled_blue"
        data-text="signin_with"
        data-size="large"
        data-logo_alignment="left"
      ></div>
    </>
  )
}
