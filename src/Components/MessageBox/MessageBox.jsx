import React from "react";
import "./MessageBox.css";
import { BsFillSendFill } from "react-icons/bs";
import TextareaAutosize from "react-textarea-autosize";

const MessageBox = ({
  handleSubmit,
  handleInputChange,
  inputValue,
  loading,
}) => {
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
              <button
                className="message--btn"
                onClick={handleSubmit}
                disabled={!inputValue}
              >
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
