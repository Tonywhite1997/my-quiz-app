import React from "react"

export default function Question(props){
    return (
        <div>
            <h3 className="quizpage--question">{props.questions}</h3>
        </div>
    )
}