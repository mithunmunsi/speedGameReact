import { useState } from 'react';

function Game({ onClick }) {
  const [name, setName] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');

  const inputHandler = (e) => {
    setName(e.target.value);
  };

  const levelSelectHandler = (e) => {
    setSelectedLevel(e.target.value);
  };

  const startGame = () => {
    onClick(selectedLevel, name);
  };

  return (
    <div className="game">
      <input
        type="text"
        placeholder="Enter your name"
        onChange={inputHandler}
        value={name}
      />
      <label htmlFor="level">Choose the Difficulty Level:</label>
      <select id="level" value={selectedLevel} onChange={levelSelectHandler}>
        <option value="">Select Level</option>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
      <button
        onClick={startGame}
        disabled={!selectedLevel || !name}
        className="game__start"
      >
        Start Game
      </button>
    </div>
  );
}

export default Game;
