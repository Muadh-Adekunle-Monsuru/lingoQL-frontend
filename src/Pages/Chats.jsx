import React, { useEffect, useRef, useState } from "react";
import MessageBox from "../Components/MessageBox/MessageBox";
import "../Styles/Styles.css";
import "./Pages.css";
import "../Components/Header/Header.css";
import Popper from "@mui/material/Popper";
import Fade from "@mui/material/Fade";
import Box from "@mui/material/Box";
import { account } from "../Api/Appwrite";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import logo from "/logo.png";
import { AiOutlineUser } from "react-icons/ai";
import { Loading } from "react-loading-dot";

const Chats = () => {
  const [inputValue, setInputValue] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const messagesRef = useRef();

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Copied to clipboard!");
    } catch (error) {
      console.error("Unable to copy to clipboard", error);
      toast.error("Copy to clipboard failed!");
    }
  };

  const messageEmpty = !chatHistory.length;

  useEffect(() => {
    // Scroll to the end of the chat messages whenever chatHistory changes
    messagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

  const init = async () => {
    try {
      const loggedIn = await account.get();
      setUser(loggedIn.name);
      // console.log(loggedIn.name);
    } catch (err) {
      setUser(null);
    }
  };
  useEffect(() => {
    init();
  }, []);

  async function logout() {
    await account.deleteSession("current");
    setUser(null);
    toast.error("Log out succesful");
    navigate("/login");
  }
  const handleClick = (event) => {
    init();
    setAnchorEl(event.currentTarget);
    setOpen((previousOpen) => !previousOpen);
  };

  const canBeOpen = open && Boolean(anchorEl);
  const id = canBeOpen ? "transition-popper" : undefined;
  const chipTexts = (value) => {
    setInputValue(value);
  };

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
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      n: 1,
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
      <div className="header--container">
        <div className="header--content">
          <div className="header--left">
            <div className="logo">
              <Link to="/">
                <img src={logo} alt="logo" />
              </Link>
            </div>
            <div
              className="logo--text"
              style={{ marginLeft: "-0.6rem", marginTop: "0.3rem" }}
            >
              <Link className="logo--text" to="/">
                <h1 className="LingoQL">LingoQL</h1>
              </Link>
            </div>
          </div>
          <div className="header--right">
            <div className="user" onClick={handleClick}>
              <AiOutlineUser className="user" />
              <Popper id={id} open={open} anchorEl={anchorEl} transition>
                {({ TransitionProps }) => (
                  <Fade {...TransitionProps} timeout={350}>
                    <Box
                      sx={{ border: 1, p: 1, bgcolor: "background.paper" }}
                      className="grid gap-4 bg-white p-3 rounded"
                    >
                      <p>User: {user}</p>
                      <button
                        className="inline-flex items-center bg-red-300  justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                        onClick={() => logout()}
                      >
                        Sign Out
                      </button>
                    </Box>
                  </Fade>
                )}
              </Popper>
            </div>
          </div>
        </div>
      </div>
      <div className="chat--interface">
        {messageEmpty && (
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
              <p
                onClick={() => {
                  chipTexts("How many products were sold today?");
                }}
              >
                How many products were sold today?
              </p>
              <p
                onClick={() => {
                  chipTexts("What is the best selling product this week?");
                }}
              >
                What is the best selling product this week?
              </p>
              <p
                onClick={() => {
                  chipTexts("How can I improve my monthly sales?");
                }}
              >
                How can I improve my monthly sales?
              </p>
            </div>
          </div>
        )}
        <div className="chat--message">
          {chatHistory.map((message, idx) => (
            <div
              className={`chat--bubble ${
                message.type === "user" ? "user--bubble" : "bot--bubble"
              }`}
              key={idx}
              onClick={() => copyToClipboard(message.message)}
            >
              {message.type === "bot" && loading && (
                <div className="loading-dot-container">
                  <Loading size="10px" color="#fff" />
                </div>
              )}
              {message.message}
            </div>
          ))}
          <div ref={messagesRef} />
        </div>
      </div>
      <MessageBox
        handleSubmit={handleSubmit}
        handleInputChange={handleInputChange}
        inputValue={inputValue}
      />
    </>
  );
};

export default Chats;

