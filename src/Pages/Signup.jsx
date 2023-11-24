import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import "./Pages.css";
import PI from "../Components/PageIndicator/PI";
import { Link } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  console.log(name, email, password);
  return (
    <PI title="signup">
      <section className="login--wrapper">
        <div className="login--content">
          <div className="login">
            <h3 className="login--title">Sign up</h3>
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
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                name="name"
                placeholder="Full Name"
              />
            </div>
            <div className="entry--container">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                name="email"
                placeholder="Email"
              />
            </div>
            <div className="entry--container">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
            </div>
            <br />
            <button type="submit" className="general--btn">
              <Link className="general--btn">Sign up</Link>
            </button>
            <br />
            <p className="signup-writeup">
              Already have an account?
              <Link className="signup" to="/login">
                Log in
              </Link>
            </p>
          </form>
        </div>
      </section>
    </PI>
  );
};

export default Signup;
