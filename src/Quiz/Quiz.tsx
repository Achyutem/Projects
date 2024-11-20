import data from './Quiz.json'
import './Quiz.css'

const Quiz = () => {
  return (
    <div className="quiz-container">
      {data.map((dt, index) => (
        <div className="quiz-item" key={index}>
          <h1 className="quiz-question">{dt.question}</h1>
          <div className="quiz-options">
            {dt.options.map((option, optionIndex) => (
              <button 
                className="quiz-option-button" 
                key={optionIndex}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Quiz
