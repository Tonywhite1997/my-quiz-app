import React from "react";
import { Link } from "react-router-dom";
import Blob from "./blob";
import Difficulty from "./Difficulty";
import Category from "./Category";

export default function Homepage() {
  const userSelection = {
    category: "",
    difficulty: "",
    type: Boolean,
  };
  function handleDifficulty(e) {
    const value = e.target.value;
    userSelection.difficulty = value;
    localStorage.setItem("choice", JSON.stringify(userSelection));
  }

  function handleCategory(e) {
    const value = e.target.value;
    userSelection.category = value;
    localStorage.setItem("choice", JSON.stringify(userSelection));
  }

  function handleLink() {
    // e.preventDefault();
    let userChoice = JSON.parse(localStorage.getItem("choice"));
    if (!userChoice) {
      userSelection.category = "General Knowledge";
      userSelection.difficulty = "Easy";
      localStorage.setItem("choice", JSON.stringify(userSelection));
    }
  }

  return (
    <main className="main--homepage">
      <h1 className="homepage--h1">Quizzical</h1>
      <p className="homepage--p">
        Try your knowledge with random questions in multiple topics. Choose
        category and difficulty to start! Do you think you can ace it?
      </p>
      <Category handleCategory={handleCategory} />
      <Difficulty handleDifficulty={handleDifficulty} />
      <Link onClick={handleLink} to="/QuizPage" className="homepage--button">
        Start Quiz
      </Link>

      <Blob />
    </main>
  );
}
