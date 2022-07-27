import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Blob from "./blob";
import Question from "./question";
import Option from "./options";
import ScoreBoard from "./scoreBoard";

export default function QuizPage() {
  const [question, setQuestion] = useState("");
  const [currCount, setCurrCount] = useState(0);
  const [errorMessage, setErrorMessage] = useState(false);
  const [correct, setCorrect] = useState(0);
  const [selected, setSelected] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [pickedOption, setPickedOption] = useState("");

  let optionsToPick;
  let shuffledOptions;
  let questionElement;
  let optionElement;
  let pickedIndex;

  async function getData() {
    let userChoices = JSON.parse(localStorage.getItem("choice")) || [];
    let diffToLowerCase = userChoices.difficulty.toLowerCase();

    let storedCategory = userChoices.category;
    let formattedCategory;
    switch (storedCategory) {
      case "Science: Computers":
        formattedCategory = 18;
        break;

      case "Sports":
        formattedCategory = 21;
        break;

      case "General Knowledge":
        formattedCategory = 9;
        break;

      case "Science: Mathematics":
        formattedCategory = 19;
        break;

      case "History":
        formattedCategory = 23;
        break;

      case "Vehicles":
        formattedCategory = 28;
        break;

      case "Animals":
        formattedCategory = 27;
        break;

      case "Celebrities":
        formattedCategory = 26;
        break;

      case "Art":
        formattedCategory = 25;
        break;
      case "Science & Nature":
        formattedCategory = 17;
        break;
      case "Entertainment: Music":
        formattedCategory = 12;
        break;

      default:
        return;
    }

    try {
      const res = await axios.get("https://opentdb.com/api.php?", {
        params: {
          amount: 5,
          category: formattedCategory,
          difficulty: diffToLowerCase,
          type: "multiple",
        },
      });

      setQuestion(res.data.results);
    } catch (err) {
      setErrorMessage(true);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  function handleSelectedOption(i) {
    setSelected(true);
    pickedIndex = i;
    setPickedOption(shuffledOptions[pickedIndex]);

    const { correct_answer } = question[currCount];
    if (correct_answer === shuffledOptions[i]) {
      setCorrect((prevScore) => prevScore + 1);
    }
  }

  function nextQuestion() {
    setSelected(false);
    if (currCount + 1 === question.length) {
      setCompleted(true);
    } else {
      setCurrCount((prevCount) => prevCount + 1);
    }
  }

  if (question) {
    optionsToPick = [
      ...question[currCount].incorrect_answers,
      question[currCount].correct_answer,
    ];
    shuffledOptions = optionsToPick.sort(() => {
      return Math.random() - 0.5;
    });

    questionElement = (
      <Question
        questions={question[currCount].question
          .replace(/&#039;/g, "'")
          .replace(/&quot;/g, "'")}
      />
    );

    shuffledOptions = optionsToPick.sort(() => {
      return Math.random() - 0.5;
    });

    optionElement = shuffledOptions.map((option, i) => {
      return (
        <Option
          option={option.replace(/&#039;/g, "'").replace(/&quot;/g, "'")}
          selectedOption={pickedOption}
          key={i}
          correct_ans={question[currCount].correct_answer
            .replace(/&#039;/g, "'")
            .replace(/&quot;/g, "'")}
          selected={selected}
          handleSelectedOption={() => {
            !selected && handleSelectedOption(i);
          }}
        />
      );
    });
  } else {
    questionElement = (
      <p>
        {errorMessage ? "Network Error. Check your internet." : "Loading..."}
      </p>
    );
  }

  let categoryText = JSON.parse(localStorage.getItem("choice"));

  return (
    <main className="main--quizpage">
      {question && (
        <div className="choice">
          <p className="category">Category: {categoryText.category}</p>
          <p className="category">Difficulty: {categoryText.difficulty}</p>
        </div>
      )}

      {question && (
        <p className="question--count">
          Question {currCount + 1} of {question.length}
        </p>
      )}

      {question && <p className="score--count">Correct Score: {correct}</p>}

      <div className="quiz--div">
        {questionElement}
        <div className="option--div">{optionElement}</div>
      </div>

      {question && (
        <div className="button--div">
          <Link to="/" className="quizpage--button">
            Quit Game
          </Link>
          <button className="quizpage--button" onClick={nextQuestion}>
            Next &#8594;
          </button>
        </div>
      )}
      {completed && <ScoreBoard correct={correct} question={question.length} />}
      <Blob />
    </main>
  );
}
