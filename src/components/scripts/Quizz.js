import React, { useEffect, useState, useCallback } from "react";
import "../styles/Quizz.css";
import imgquizz from '../assets/quizz.png';

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
      setUserAnswers((prev) => [...prev, { 
        question: questions[currentQuestion]?.question, 
        selected: selectedOption, 
        correct: questions[currentQuestion]?.correct 
      }]);
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
      setUserAnswers((prev) => [...prev, { 
        question: questions[currentQuestion]?.question, 
        selected: selectedOption, 
        correct: questions[currentQuestion]?.correct 
      }]);
      if (selectedOption === questions[currentQuestion]?.correct) {
        setScore((prevScore) => prevScore + 5);
      } else {
        setScore((prevScore) => prevScore - 2);
      }
    }
    setQuizEnded(true);
  };

  return (
    <div className="quiz-app-container">
      <div className="quiz-info-panel">
        <div className="quiz-info-content">
          <h2 className="quiz-info-title">Cosmic Knowledge Challenge</h2>
          <ul className="quiz-info-list">
            <li className="quiz-info-item">
              <span className="quiz-info-icon">🌌</span>
              Questions about space, cosmology, and technology
            </li>
            <li className="quiz-info-item">
              <span className="quiz-info-icon">⏱️</span>
              15 seconds per question
            </li>
            <li className="quiz-info-item">
              <span className="quiz-info-icon">➕</span>
              +5 points for correct answers
            </li>
            <li className="quiz-info-item">
              <span className="quiz-info-icon">➖</span>
              -2 points for incorrect answers
            </li>
            <li className="quiz-info-item">
              <span className="quiz-info-icon">🏆</span>
              Top scorers win cosmic prizes!
            </li>
          </ul>
        </div>
      </div>

      <div className="quiz-game-panel" id="quiz-game-section">
        <div className="quiz-game-container">
          {!quizStarted ? (
            <div className="quiz-start-screen">
              <img src={imgquizz} className="quiz-logo" alt="Cosmic Quiz" />
              <h3 className="quiz-select-title">Select Challenge Length:</h3>
              <div className="quiz-length-selector">
                {[5, 10, 20, 50].map((limit) => (
                  <button 
                    key={limit} 
                    className={`quiz-length-btn ${limit === questionLimit ? 'selected' : ''}`}
                    onClick={() => setQuestionLimit(limit)}
                  >
                    {limit} Questions
                  </button>
                ))}
              </div>
              <button 
                className="quiz-start-btn"
                onClick={() => {
                  const element = document.getElementById('quiz-game-section');
                  if (element) {
                    window.scroll({
                      top: element.offsetTop - 70,
                      behavior: 'smooth'
                    });
                  }
                  setQuizStarted(true);
                }}
              >
                Begin Cosmic Challenge
              </button>
            </div>
          ) : quizEnded ? (
            <div className="quiz-results-screen">
              <div className="quiz-score-display">
                <h2 className="quiz-score-title">Your Cosmic Score</h2>
                <p className="quiz-score-value">{score}</p>
                {score / 5 === questionLimit && (
                  <p className="quiz-perfect-score">Stellar Performance! 🌟</p>
                )}
              </div>
              
              <div className="quiz-review-section">
                <h3 className="quiz-review-title">Mission Debrief</h3>
                <div className="quiz-answers-list">
                  {userAnswers.map((answer, index) => (
                    <div 
                      key={index} 
                      className={`quiz-answer-item ${answer.selected === answer.correct ? 'correct' : 'incorrect'}`}
                    >
                      <p className="quiz-question-text">
                        <span className="quiz-question-label">Q{index + 1}:</span> 
                        {answer.question}
                      </p>
                      <p className="quiz-answer-text">
                        <span className="quiz-answer-label">Your Answer:</span> 
                        {answer.selected}
                      </p>
                      <p className="quiz-correct-text">
                        <span className="quiz-correct-label">Correct Answer:</span> 
                        {answer.correct}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              
              <button 
                className="quiz-restart-btn"
                onClick={handleRestartQuiz}
              >
                Try Another Mission
              </button>
            </div>
          ) : questions.length > 0 ? (
            <div className="quiz-question-screen">
              <div className="quiz-question-header">
                <span className="quiz-question-number">
                  Question {currentQuestion + 1} of {questions.length}
                </span>
                <span className="quiz-timer">
                  ⏱️ {timer}s remaining
                </span>
              </div>
              
              <h3 className="quiz-current-question">
                {questions[currentQuestion]?.question}
              </h3>
              
              <div className="quiz-options-grid">
                {questions[currentQuestion]?.options.map((option, index) => (
                  <button
                    key={index}
                    className={`quiz-option-btn ${selectedOption === option ? 'selected' : ''}`}
                    onClick={() => setSelectedOption(option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
              
              <div className="quiz-navigation-btns">
                <button 
                  className="quiz-next-btn"
                  onClick={handleNextQuestion}
                  disabled={selectedOption === null}
                >
                  Next Question →
                </button>
                
                {currentQuestion === questions.length - 1 && (
                  <button 
                    className="quiz-submit-btn"
                    onClick={handleSubmit}
                  >
                    Submit Mission
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="quiz-loading-screen">
              <div className="quiz-loading-spinner"></div>
              <p>Preparing cosmic questions...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Quizz;