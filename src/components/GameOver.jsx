function GameOver({ closeHandler, name, score, level }) {
  let message = '';
  if (score >= 100) {
    message = 'Well done! You hunted a lot of tigers!';
  } else if (score >= 80) {
    message = 'Good 👍 hunt more tigers!';
  } else {
    message = 'Oops! Good Luck Next Try!';
  }

  return (
    <div className="overlay">
      <div className="gameover">
        <h2>GAME OVER</h2>
        <div className="game_stats">
          <p>Player: {name}</p>
          <p className="score">Score: {score}</p>
          <p>Level: {level}</p>
        </div>
        <p>{message}</p>
        <button onClick={closeHandler}>X</button>
      </div>
    </div>
  );
}

export default GameOver;
