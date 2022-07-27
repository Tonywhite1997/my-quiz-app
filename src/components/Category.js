import React from "react";

export default function Category(props) {
  return (
    <select onChange={props.handleCategory}>
      <option>Choose Category</option>
      <option>Sports</option>
      <option>Science: Computers</option>
      <option>General Knowledge</option>
      <option>Science: Mathematics</option>
      <option>History</option>
      <option>Vehicles</option>
      <option>Animals</option>
      <option>Celebrities</option>
      <option>Art</option>
      <option>Science & Nature</option>
      <option>Entertainment: Music</option>
    </select>
  );
}
