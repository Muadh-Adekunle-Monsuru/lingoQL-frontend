import React, { useState } from "react";
import "./MessageBox.css";
import { BsFillSendFill } from "react-icons/bs";

const MessageBox = () => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    console.log(inputValue);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <section className="message--box">
        <div className="message-box-wrapper">
          <form className="message" onSubmit={handleSubmit}>
            <textarea
              className="message--input"
              placeholder="Type in what you want to know"
              value={inputValue}
              onChange={handleInputChange}
            />
            <span className="send--btn">
              <button className="message--btn">
                <BsFillSendFill className="send--btn" />
              </button>
            </span>
          </form>
        </div>
      </section>
    </>
  );
};

export default MessageBox;
