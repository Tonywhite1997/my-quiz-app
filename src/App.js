import React from "react"
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Homepage from "./components/homepage"
import QuizPage from "./components/QuizPage"

function App(){
    return (
        <Router>

            <Routes>

                <Route exact path="/" element={<Homepage />} />
                <Route path="/QuizPage" element={<QuizPage />} />
                    
            </Routes>

        </Router>
    )
}

export default App