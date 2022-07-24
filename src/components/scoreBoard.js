import React from "react"
import {Link} from "react-router-dom"
import Blob from "./blob"

export default function ScoreBoard(props){
    return (
        <div className="scoreBoard">
            <p>Your correct score is {props.correct} out of {props.question}. </p>
            <Link to="/" className="link">Go to homepage</Link>
            <Blob />
        </div>
    )
}