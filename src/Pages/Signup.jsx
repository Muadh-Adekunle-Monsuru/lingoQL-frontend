import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import "./Pages.css";
import PI from "../Components/PageIndicator/PI";
import { Link } from "react-router-dom";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { account, ID } from "../Api/Appwrite";

import { Outlet, useNavigate } from "react-router-dom";
const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const navigate = useNavigate();
  async function register(email, password, name) {
    try {
      await account.create(ID.unique(), email, password, name);
      const loggedIn = await account.createEmailSession(email, password);
      setUser(loggedIn);
      console.log(user);
      navigate("/chat");
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <PI title="signup">
      <Container fixed maxWidth="sm">
        <h1
          className="login--title"
          style={{
            fontSize: "3.2em",
            lineHeight: 1.1,
            color: "white",
            marginBottom: 20,
          }}
        >
          Sign up
        </h1>
        <Paper
          elevation={5}
          style={{
            display: "grid",
            padding: 20,
            justifyContent: "center",
            alignItems: "space-between",
            alignContent: "space-between",
            padding: "5vh",
            backgroundColor: "#f4f4f6",
          }}
        >
          <Button
            variant="outlined"
            startIcon={<FcGoogle />}
            onClick={() =>
              account.createOAuth2Session(
                "google",
                "http://localhost:5173/chat",
                "http://localhost:5173/404"
              )
            }
          >
            Continue with Google
          </Button>
          <p style={{ fontSize: 12, fontWeight: 500, textAlign: "center" }}>
            or
          </p>
          <p style={{ fontSize: 17, fontWeight: 500, textAlign: "center" }}>
            Sign up with Email
          </p>
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
            style={{
              justifyContent: "center",
              alignItems: "center",
              display: "grid",
            }}
          >
            <TextField
              id="outlined-basic"
              label="Full Name"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <TextField
              id="outlined-basic"
              label="Password"
              variant="outlined"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Box>

          <Button
            variant="contained"
            onClick={() => register(email, password, name)}
          >
            Register
          </Button>
          <p className="signup-writeup" style={{ textAlign: "center" }}>
            Already have an account?
            <Link className="signup" to="/login">
              Log in
            </Link>
          </p>
        </Paper>
      </Container>
    </PI>
  );
};

export default Signup;
