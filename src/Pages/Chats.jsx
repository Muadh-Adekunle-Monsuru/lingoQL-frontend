import React, { useState } from "react";
import MessageBox from "../Components/MessageBox/MessageBox";
import "../Styles/Styles.css";
import "./Pages.css";
import axios from "axios";
import toast from "react-hot-toast";

const Chats = () => {
  const [inputValue, setInputValue] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue == "") return;
    setChatHistory((prev) => [
      ...prev,
      {
        type: "user",
        message: inputValue,
      },
    ]);

    sendMessage(inputValue);

    setInputValue("");
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    // console.log(inputValue);
  };

  const sendMessage = async (message) => {
    const endPoint = "https://api.openai.com/v1/chat/completions";
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_OPEN_AI_API_KEY}`,
    };
    const data = {
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }],
      temperature: 0.4,
    };
    setLoading(true);

    try {
      const response = await axios.post(endPoint, data, { headers: headers });
      console.log(response);
      setChatHistory((prev) => [
        ...prev,
        { type: "bot", message: response.data.choices[0].message.content },
      ]);
    } catch (error) {
      console.error(error);
      toast.error("something went wrong!");
    } finally {
      setLoading(false);
    }
  };

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
        {chatHistory.map((message, idx) => (
          <div key={idx}>{message.message}</div>
        ))}
      </div>
      <MessageBox
        handleSubmit={handleSubmit}
        handleInputChange={handleInputChange}
        inputValue={inputValue}
        loading={loading}
      />
    </>
  );
};

export default Chats;
