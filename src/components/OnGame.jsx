import Circle from './Circle';
function OnGame({ score, circles, stopHandler, clickHandler, current }) {
  return (
    <div>
      <p className="score">Score: {score}</p>
      <div className="circles">
        {circles.map((_, i) => (
          <Circle
            key={i}
            id={i}
            clickHandler={clickHandler}
            current={current === i}
          />
        ))}
      </div>
      <button onClick={stopHandler} className="stop__game">
        Stop game
      </button>
    </div>
  );
}

export default OnGame;
