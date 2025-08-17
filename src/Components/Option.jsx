import React from "react";
import "../Stylings/Option.css";

export default function Option(props) {
  return (
    <div
      className="option"
      style={{
        ...(props.isClicked && {
          border: "1px solid white",
          backgroundColor: "#1a59b8",
        }),
        ...(props.isFirst && {
          marginLeft: "-15px",
        }),
      }}
    >
      <img className="img" src={props.img} />
      {props.title}
    </div>
  );
}
