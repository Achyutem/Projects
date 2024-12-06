import data from "./Quiz.json";
import "./Quiz.css";
import { useState } from "react";

const Quiz = () => {
  const limitedData = data.slice(0, 10);
  const [result, setResult] = useState({ correct: 0, incorrect: 0 });
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(
    new Set()
  );

  const checkAnswer = (
    selectedOption: string,
    correctAnswer: string,
    index: number
  ) => {
    if (answeredQuestions.has(index)) {
      return;
    }

    if (selectedOption === correctAnswer) {
      alert("Correct!");
      setResult((prevRes) => ({
        ...prevRes,
        correct: prevRes.correct + 1,
      }));
    } else {
      alert("Incorrect! Try again.");
      setResult((prevRes) => ({
        ...prevRes,
        incorrect: prevRes.incorrect + 1,
      }));
    }

    setAnsweredQuestions((prev) => new Set(prev.add(index)));
  };

  return (
    <div className="quiz-container">
      {limitedData.map((dt, index) => (
        <div
          className="quiz-item"
          key={index}>
          <h1 className="quiz-question">{dt.question}</h1>
          <div className="quiz-options">
            {dt.options.map((option, optionIndex) => (
              <button
                className="quiz-option-button"
                key={optionIndex}
                onClick={() => checkAnswer(option, dt.answer, index)}
                disabled={answeredQuestions.has(index)}>
                {option}
              </button>
            ))}
          </div>
        </div>
      ))}
      <h2>Correct: {result.correct}</h2>
      <h2>Incorrect: {result.incorrect}</h2>
    </div>
  );
};

export default Quiz;
