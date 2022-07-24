import React from "react"

export default function Options(props){
    let style={
        opacity: props.selected?".3" : ""
    }
    return (
        <p style={style} onClick={props.handleSelectedOption} className="quizpage--option">{props.option}</p>
    )
}