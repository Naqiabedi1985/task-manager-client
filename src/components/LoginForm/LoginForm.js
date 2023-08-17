import React, { useState } from "react"
import {
  Container,
  Tabs,
  Tab,
  Box,
  Button,
  Typography,
  Checkbox,
  IconButton,
  TextField,
} from "@mui/material"
import { Facebook, Twitter, Google, GitHub } from "@mui/icons-material"
import Input from "@mui/material/Input"
import FormControlLabel from "@mui/material/FormControlLabel"

import "./LoginForm.css"

function LoginForm() {
  const [activeTab, setActiveTab] = useState(0)

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue)
  }

  return (
    <Container className="p-3 my-5 d-flex flex-column w-50">
      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        variant="fullWidth"
        className="mb-3 d-flex flex-row justify-content-between"
      >
        <Tab label="Login" />
        <Tab label="Register" />
      </Tabs>

      <Box>
        {activeTab === 0 && (
          <Box p={3}>
            <Typography variant="h6" align="center" mb={3}>
              Sign in with:
            </Typography>
            <div
              className="d-flex justify-content-between mx-auto"
              style={{ width: "40%" }}
            >
              <IconButton className="m-1" style={{ color: "#dd4b39" }}>
                <Google />
              </IconButton>
              <IconButton className="m-1" style={{ color: "#3b5998" }}>
                <Facebook />
              </IconButton>
              <IconButton className="m-1" style={{ color: "#00aced" }}>
                <Twitter />
              </IconButton>
              <IconButton className="m-1" style={{ color: "#333" }}>
                <GitHub />
              </IconButton>
            </div>
            <Typography
              variant="body2"
              align="center"
              style={{ margin: "16px 0" }}
            >
              or:
            </Typography>

            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              className="mb-2 w-100"
            />
            <TextField
              id="outlined-basic"
              label="Password"
              variant="outlined"
              className="mb-1 w-100"
            />

            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={4}
            >
              <FormControlLabel
                control={
                  <Checkbox name="flexCheck" value="" id="flexCheckDefault" />
                }
                label="Remember me"
              />
              <a href="#!">Forgot password?</a>
            </Box>

            <Button variant="contained" className="mb-4 w-100">
              Sign in
            </Button>
            <Typography align="center">
              Not a member? <a href="#!">Register</a>
            </Typography>
          </Box>
        )}

        {activeTab === 1 && (
          <Box p={3}>
            <Typography variant="h6" align="center" mb={3}>
              Sign up with:
            </Typography>
            <div
              className="d-flex justify-content-between mx-auto"
              style={{ width: "40%" }}
            >
              <IconButton className="m-1" style={{ color: "#dd4b39" }}>
                <Google />
              </IconButton>
              <IconButton className="m-1" style={{ color: "#3b5998" }}>
                <Facebook />
              </IconButton>
              <IconButton className="m-1" style={{ color: "#00aced" }}>
                <Twitter />
              </IconButton>
              <IconButton className="m-1" style={{ color: "#333" }}>
                <GitHub />
              </IconButton>
            </div>
            <Typography
              variant="body2"
              align="center"
              style={{ margin: "16px 0" }}
            >
              or:
            </Typography>

            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              className="mb-4 w-100"
              helperText=" "
            />

            <Box textAlign="center" mb={4}>
              <FormControlLabel
                control={<Checkbox name="flexCheck" id="flexCheckDefault" />}
                label="I have read and agree to the terms"
              />
            </Box>

            <Button variant="contained" className="mb-4 w-100">
              Sign up
            </Button>
          </Box>
        )}
      </Box>
    </Container>
  )
}

export default LoginForm
