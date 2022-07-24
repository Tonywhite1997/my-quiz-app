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

  let optionsToPick;
  let shuffledOptions;
  let questionElement;
  let optionElement;

  async function getData() {
    try {
      const res = await axios.get("https://opentdb.com/api.php?", {
        params: {
          amount: 5,
          category: 18,
          difficulty: "easy",
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

    questionElement = <Question questions={question[currCount].question} />;

    shuffledOptions = optionsToPick.sort(() => {
      return Math.random() - 0.5;
    });

    optionElement = shuffledOptions.map((option, i) => {
      return (
        <Option
          option={option}
          key={i}
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

  return (
    <main className="main--quizpage">
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
