import React from "react";
import "../PageIndicator/PI.css";

const PI = (props) => {
  document.title = "LingoQL - " + props.title;
  return <div className="PI">{props.children}</div>;
};

export default PI;
