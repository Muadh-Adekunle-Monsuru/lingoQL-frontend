import React from "react";
import { AiOutlineUser } from "react-icons/ai";
import "./Header.css";
import logo from "/logo.png";

const Header = () => {
  return (
    <div className="header--container">
      <div className="header--content">
        <div className="header--left">
          <div className="logo">
            <img src={logo} alt="logo" />
          </div>
          <div className="logo--text">
            <h1 className="LingoQL">LingoQL</h1>
          </div>
        </div>
        <div className="header--right">
          <div className="user">
            <AiOutlineUser className="user" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
