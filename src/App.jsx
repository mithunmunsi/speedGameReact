import { useRef, useState } from 'react';
import Game from './components/Game';
import OnGame from './components/OnGame';
import GameOver from './components/GameOver';
import { levels } from './levels';

const getInt = (min, max) => Math.floor(Math.random() * (max - min)) + min;

function App() {
  const [player, setPlayer] = useState(null);
  const [circles, setCircles] = useState([]);
  const [score, setScore] = useState(0);
  const [current, setCurrent] = useState(null);
  const [gameLaunch, setGameLaunch] = useState(true);
  const [gameOn, setGameOn] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const timeoutIdRef = useRef(null);
  const roundsCount = useRef(0);
  const currentInst = useRef(0);

  let pace = 1500;
  let levelNum;

  const gameHandler = (level, name) => {
    const { amount } = levels.find((el) => el.name === level);
    levelNum = amount;

    const circlesArray = Array.from({ length: levelNum }, (_, i) => i);

    setCircles(circlesArray);
    setPlayer({
      level: level,
      name: name,
    });

    setGameLaunch(false);
    startGame();
  };

  const randomNumb = () => {
    if (roundsCount.current >= 3) {
      stopHandler();
      return;
    }

    let nextActive;

    do {
      nextActive = getInt(0, levelNum);
    } while (nextActive === currentInst.current);

    setCurrent(nextActive);
    currentInst.current = nextActive;
    roundsCount.current++;
    pace *= 0.95;
    timeoutIdRef.current = setTimeout(randomNumb, pace);
  };

  const startGame = () => {
    setScore(0);
    setCurrent(null);
    roundsCount.current = 0;
    setGameOn(true);
    randomNumb();
  };

  const clickHandler = (id) => {
    if (current !== id) {
      stopHandler();
      return;
    }
    setScore((prevScore) => prevScore + 10);
    roundsCount.current--;
  };

  const stopHandler = () => {
    clearTimeout(timeoutIdRef.current);
    timeoutIdRef.current = null;

    setGameOn(false);
    setGameOver(true);
  };

  const closeHandler = () => {
    setGameOver(false);
    setGameLaunch(true);
    setScore(0);
  };

  return (
    <>
      <h1>Hunt the Tiger!</h1>
      {gameLaunch && <Game onClick={gameHandler} />}
      {gameOn && (
        <OnGame
          score={score}
          circles={circles}
          stopHandler={stopHandler}
          clickHandler={clickHandler}
          current={current}
        />
      )}
      {gameOver && (
        <GameOver closeHandler={closeHandler} {...player} score={score} />
      )}
    </>
  );
}

export default App;
