import React, { useState } from "react";
import "./MessageBox.css";
import { BsFillSendFill } from "react-icons/bs";
import TextareaAutosize from "react-textarea-autosize";

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
            <TextareaAutosize
              className="message--input"
              rows={2}
              maxRows={5}
              autoFocus={true}
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
