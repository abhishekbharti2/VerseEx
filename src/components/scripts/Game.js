import React, { useState, useEffect } from 'react';
import '../styles/Game.css';

const cardSymbols = ['🍎', '🍌', '🍒', '🍓', '🍊', '🍋', '🍉', '🍇'];

const Game = () => {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [solved, setSolved] = useState([]);
  const [moves, setMoves] = useState(0);
  const [gameWon, setGameWon] = useState(false);
  const [disabled, setDisabled] = useState(false);

  // Initialize game
  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    // Create pairs of cards
    const cardPairs = [...cardSymbols, ...cardSymbols];
    
    // Shuffle cards
    const shuffledCards = cardPairs
      .map((symbol, index) => ({ id: index, symbol, flipped: false }))
      .sort(() => Math.random() - 0.5);
    
    setCards(shuffledCards);
    setFlipped([]);
    setSolved([]);
    setMoves(0);
    setGameWon(false);
  };

  // Check if game is won
  useEffect(() => {
    if (solved.length === cardSymbols.length * 2) {
      setGameWon(true);
    }
  }, [solved]);

  // Check for matches when two cards are flipped
  useEffect(() => {
    if (flipped.length === 2) {
      setDisabled(true);
      setMoves(prev => prev + 1);
      
      const [firstIndex, secondIndex] = flipped;
      const firstCard = cards[firstIndex];
      const secondCard = cards[secondIndex];

      if (firstCard.symbol === secondCard.symbol) {
        // Match found
        setSolved(prev => [...prev, firstIndex, secondIndex]);
        resetFlipped();
      } else {
        // No match - flip back after delay
        setTimeout(resetFlipped, 1000);
      }
    }
  }, [flipped, cards]);

  const resetFlipped = () => {
    setFlipped([]);
    setDisabled(false);
  };

  const handleCardClick = (index) => {
    // Don't allow clicks if:
    // - Card is already flipped or solved
    // - Two cards are already flipped
    // - Game is disabled (during animation)
    if (flipped.includes(index) || solved.includes(index) || 
        flipped.length === 2 || disabled) {
      return;
    }

    // Flip the card
    setFlipped(prev => [...prev, index]);
  };

  return (
    <div className="memory-game">
      <h1>Memory Card Game</h1>
      
      <div className="game-info">
        <div style={{color: 'black'}}>Moves: {moves}</div>
        <button onClick={initializeGame}>Restart Game</button>
      </div>

      {gameWon ? (
        <div className="win-message">
          <h2>Congratulations! You won!</h2>
          <p>You completed the game in {moves} moves.</p>
          <button onClick={initializeGame}>Play Again</button>
        </div>
      ) : (
        <div className="cards-container">
          {cards.map((card, index) => (
            <div
              key={card.id}
              className={`card ${flipped.includes(index) || solved.includes(index) ? 'flipped' : ''}`}
              onClick={() => handleCardClick(index)}
            >
              <div className="card-front">{card.symbol}</div>
              <div className="card-back">?</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Game;