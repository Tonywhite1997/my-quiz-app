import React from "react";

export default function Difficulty(props) {
  return (
    <select onChange={props.handleDifficulty}>
      <option>Choose Difficulty</option>
      <option>Easy</option>
      <option>Medium</option>
      <option>Hard</option>
    </select>
  );
}
