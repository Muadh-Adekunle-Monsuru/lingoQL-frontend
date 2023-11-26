import React, { useState } from "react";
import PI from "../Components/PageIndicator/PI";
import "./Pages.css";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  console.log(email, password);
  return (
    <PI title="login">
      <section className="login--wrapper">
        <div className="login--content">
          <div className="login">
            <h3 className="login--title">Log in</h3>
          </div>
          <br />
          <button className="general--btn">
            <FcGoogle />
            Continue with Google
          </button>
          <br />
          <br />
          <p style={{ fontSize: 17, fontWeight: 500 }}>or</p>
          <form className="login--form form">
            <div className="entry--container">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                name="email"
                placeholder="Your Email"
              />
            </div>
            <div className="entry--container">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Your Password"
              />
            </div>
            <p className="forgot signup" to="#">
              <Link className="forgot signup">Forgot password?</Link>
            </p>
            <br />
            <button type="submit" className="general--btn">
              <Link className="general--btn">Log in</Link>
            </button>
            <br />
            <p className="signup-writeup">
              No account?
              <Link className="signup" to="/signup">
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </section>
    </PI>
  );
};

export default Login;
