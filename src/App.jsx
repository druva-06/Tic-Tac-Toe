import { useState } from "react";

import Player from "./components/Player";
import GameBorad from "./components/GameBoard";
import Log from "./components/Log";
import GameOver from "./components/GameOver";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function App() {
  const [activePlayer, setActivePlayer] = useState("X");
  const [playerLogs, setPlayerLogs] = useState([]);
  const [won, setWon] = useState(null);
  const [gameBoard, setGameBoard] = useState(initialGameBoard);

  const handleSelectSquare = () => {
    setActivePlayer((prevActivePlayer) => {
      return prevActivePlayer == "X" ? "O" : "X";
    });
  };

  const handleRestart = () => {
    setActivePlayer("X");
    setPlayerLogs([])
    setWon(null);
    setGameBoard(initialGameBoard);
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player name="Player 1" symbol="X" isActive={activePlayer === "X"} />
          <Player name="Player 2" symbol="O" isActive={activePlayer === "O"} />
        </ol>
        {won && <GameOver winner={won} onRestart={handleRestart}/>}
        <GameBorad
          onSelectSquare={handleSelectSquare}
          activePlayer={activePlayer}
          setPlayerLogs={setPlayerLogs}
          setWon={setWon}
          gameBoard={gameBoard}
          setGameBoard={setGameBoard}
        />
      </div>
      <Log turns={playerLogs} />
    </main>
  );
}

export default App;
