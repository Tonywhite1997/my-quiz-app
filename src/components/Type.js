import React from "react";

export default function Type(props) {
  return (
    <select onClick={props.handleType}>
      <option>Choose Type</option>
      <option>Multiple Choice</option>
      <option>True / False</option>
    </select>
  );
}
