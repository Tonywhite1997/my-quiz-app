import React from "react";

export default function Options(props) {
  let color;

  //red="#ffabb6";
  //green="#91fab2"

  if (props.selected) {
    if (props.option === props.correct_ans) {
      color = "#91fab2";
    } else if (
      props.option === props.selectedOption &&
      props.selectedOption !== props.correct_ans
    ) {
      color = "#ffabb6";
    }
  }

  let style = {
    backgroundColor: color,
  };
  return (
    <p
      style={style}
      onClick={props.handleSelectedOption}
      className="quizpage--option"
    >
      {props.option}
    </p>
  );
}
