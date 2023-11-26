import React, { useState } from "react";
import PI from "../Components/PageIndicator/PI";
import "./Pages.css";
import Grid from "@mui/material/Grid";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import { Outlet, Link, useNavigate } from "react-router-dom";
const Landing = () => {
  const navigate = useNavigate();
  return (
    <PI title="Home">
      <Box sx={{ flexGrow: 1 }}>
        <Grid container>
          <Grid item xs={8}>
            <Grid
              container
              style={style.box}
              direction="column"
              justifyContent="center"
              alignItems="center"
            >
              <h1 style={style.h1}>Welcome to LingoQL</h1>
              <p style={style.p}>
                Data Mastery, Simplified: Revolutionizing E-commerce Analytics
                for All.
              </p>
            </Grid>
          </Grid>
          <Grid item xs={4}>
            <Grid
              container
              style={style.box}
              direction="column"
              justifyContent="center"
              alignItems="center"
              spacing={4}
            >
              <Grid item>
                <Button
                  style={{ border: "2px solid #fff", color: "#fff" }}
                  variant="outlined"
                  onClick={() => navigate("/login")}
                >
                  Login
                </Button>
              </Grid>

              <Grid item>
                <Button
                  style={{ border: "2px solid #fff", color: "#fff" }}
                  variant="outlined"
                  onClick={() => navigate("/signup")}
                >
                  Register
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </PI>
  );
};

export default Landing;
const style = {
  h1: {
    fontSize: "4.2em",
    lineHeight: 1.1,
    color: "white",
  },
  box: {
    height: "90vh",
  },
  p: {
    fontSize: "1.2em",
    lineHeight: 1.1,
    color: "white",
    margin: 20,
  },
};
