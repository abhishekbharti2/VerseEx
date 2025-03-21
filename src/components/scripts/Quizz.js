import React, { useEffect, useState, useCallback } from "react";
import "../styles/Quizz.css";
import imgquizz from '../assets/quizz.png'

const Quizz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(15);
  const [quizEnded, setQuizEnded] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [questionLimit, setQuestionLimit] = useState(5);
  const [userAnswers, setUserAnswers] = useState([]);

  // Function to shuffle questions
  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  useEffect(() => { 
    fetch("https://server-verseex.onrender.com/api/quizzes")
      .then((res) => res.json())
      .then((data) => {
        const shuffledQuestions = shuffleArray(data).slice(0, questionLimit);
        setQuestions(shuffledQuestions);
      })
      .catch((err) => console.error("Error fetching quiz data:", err));
  }, [questionLimit]);

  const handleNextQuestion = useCallback(() => {
    if (selectedOption !== null) {
      setUserAnswers((prev) => [...prev, { question: questions[currentQuestion]?.question, selected: selectedOption, correct: questions[currentQuestion]?.correct }]);
      if (selectedOption === questions[currentQuestion]?.correct) {
        setScore((prevScore) => prevScore + 5);
      } else {
        setScore((prevScore) => prevScore - 2);
      }
    }
    setSelectedOption(null);
    setTimer(15);
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setQuizEnded(true);
    }
  }, [selectedOption, questions, currentQuestion]);

  useEffect(() => {
    if (quizStarted && timer > 0 && !quizEnded) {
      const interval = setTimeout(() => setTimer((prev) => prev - 1), 1000);
      return () => clearTimeout(interval); 
    } else if (timer === 0) {
      handleNextQuestion();
    }
  }, [timer, quizStarted, quizEnded, handleNextQuestion]);

  const handleRestartQuiz = () => {
    setQuizStarted(false);
    setQuizEnded(false);
    setScore(0);
    setCurrentQuestion(0);
    setUserAnswers([]);
  };

  const handleSubmit = () => {
    if (selectedOption !== null) {
      setUserAnswers((prev) => [...prev, { question: questions[currentQuestion]?.question, selected: selectedOption, correct: questions[currentQuestion]?.correct }]);
      if (selectedOption === questions[currentQuestion]?.correct) {
        setScore((prevScore) => prevScore + 5);
      } else {
        setScore((prevScore) => prevScore - 2);
      }
    }
    setQuizEnded(true);
  };

  return (
    <div className="quizz-main-container">
      <div className="quizz-info-container">
        <h2>About the Quiz</h2>
        <li>This quiz includes questions related to space, cosmology, and technology.</li>
        <li>You will have 15 seconds to answer each question.</li>
        <li>Each correct answer awards you 5 points.</li>
        <li>Incorrect answer will deduct your score by 2 points.</li>
        <li>Top scorers can win exciting prizes! 🏆</li>
      </div>
      <div className="quizz-container">
        <div className="quizz-container-unique">
          {!quizStarted ? (
            <div>
              <img src={imgquizz} className="quizz-image" alt=" " />
              <h3>Select Number of Questions:</h3>
              <div className="quizz-limit-buttons-unique">
                {[5, 10, 20, 50].map((limit) => (
                  <button key={limit} className={`quizz-btn ${limit===questionLimit?"qs-select-btn" : ""}`} onClick={() => setQuestionLimit(limit)}>  {limit} </button>
                ))}
              </div>
              <button className="quizz-btn quizz-start-button-unique" onClick={() => setQuizStarted(true)}>
                Start Quiz
              </button>
            </div>
          ) : quizEnded ? (
            <div className="quizz-result-unique">
              <h2>Your Score: {score}</h2>
              {score / 5 === questionLimit && <h4 style={{ color: 'yellow' }}>Congratulations! 🎉 You got all questions correct!</h4>}
              <h3>Review Your Answers:</h3>
              <div className="quizz-review">
                {userAnswers.map((answer, index) => (
                  <div key={index} className={`quizz-review-item ${answer.selected === answer.correct ? "correct" : "incorrect"}`}>
                    <p><span>Q:</span> {answer.question}</p>
                    <p><span>Your Answer:</span> {answer.selected}</p>
                    <p><span>Correct Answer:</span> {answer.correct}</p>
                  </div>
                ))}
              </div>
              <button className="quizz-btn" onClick={handleRestartQuiz}>Start Again</button>
            </div>
          ) : questions.length > 0 ? (
            <div className="quizz-question-box-unique">
              <h3>Question {currentQuestion + 1}:</h3>
              <p>{questions[currentQuestion]?.question}</p>
              <div className="quizz-options-unique">
                {questions[currentQuestion]?.options.map((option, index) => (
                  <button
                    key={index}
                    className={`quizz-btn quizz-option-unique ${selectedOption === option ? "selected" : ""}`}
                    onClick={() => setSelectedOption(option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
              <p className="quizz-timer-unique">Time left: {timer} sec</p>
              <button className="quizz-btn" onClick={handleNextQuestion} disabled={selectedOption === null}>
                Next
              </button>
              {currentQuestion === questions.length - 1 && (
                <button className="quizz-btn" onClick={handleSubmit}>Submit</button>
              )}
            </div>
          ) : (
            <p>Loading questions...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Quizz;
