import React from "react";
import MessageBox from "../Components/MessageBox/MessageBox";
import "../Styles/Styles.css";
import "./Pages.css";

const Chats = () => {
  return (
    <>
      <div className="chat--interface">
        <div className="default--display">
          <div className="chat--text">
            <h1
              style={{
                color: "#fff",
                fontSize: "1.7rem",
                fontFamily: "Lexend Deca, san-serif",
              }}
            >
              Ask me what you want to know!
            </h1>
          </div>
          <div className="chat-suggest-qns">
            <p>Spot any data anomalies and suggest reasons?</p>
            <p>Summarize critical KPIs, flag areas needing attention</p>
            <p>Identify trends in last quarter's sales data with insights</p>
          </div>
        </div>
      </div>
      <MessageBox />
    </>
  );
};

export default Chats;
