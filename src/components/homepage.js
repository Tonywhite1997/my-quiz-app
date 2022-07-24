import React from "react"
import {Link} from "react-router-dom"
import Blob from "./blob"

export default function Homepage(){
    return(
        <main className="main--homepage">
            <h1 className="homepage--h1">Qizzical</h1>
            <p className="homepage--p">Try your knowledge on random events around the world. Do you think you can ace it?</p>
            <Link to="/QuizPage" className="homepage--button">Start Quiz</Link>
            <Blob />
        </main>
    )
}