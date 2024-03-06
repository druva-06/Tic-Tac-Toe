import { useEffect, useState } from "react";

import { WINNING_COMBINATIONS } from "../winning-combination";

export default function GameBorad({
  onSelectSquare,
  activePlayer,
  setPlayerLogs,
  setWon,
  gameBoard,
  setGameBoard
}) {
  

  const checkGameBoard = (updatedGameBoard) => {
    let filledBlocks = 0;
    for (const combination of WINNING_COMBINATIONS) {
      const firstBlock =
        updatedGameBoard[combination[0].row][combination[0].column];
      const secondBlock =
        updatedGameBoard[combination[1].row][combination[1].column];
      const thirdBlock =
        updatedGameBoard[combination[2].row][combination[2].column];

      if (
        firstBlock !== null &&
        firstBlock === secondBlock &&
        firstBlock === thirdBlock
      ) {
        setWon(firstBlock);
        break;
      }
    }

    let draw = true;

    for (const row of updatedGameBoard) {
      for (const col of row) {
        if (col == null) {
          draw = false;
          break;
        }
      }
    }

    if (draw) {
      setWon((prevData) => {
        return prevData === null ? "draw" : prevData;
      });
    }
  };

  useEffect(() => {
    checkGameBoard(gameBoard);
  }, [gameBoard]);

  const handleSelectSquare = (rowIndex, colIndex) => {
    setGameBoard((prevGameBoard) => {
      const updatedGameBoard = [...prevGameBoard].map((innerArray) => [
        ...innerArray,
      ]);
      updatedGameBoard[rowIndex][colIndex] = activePlayer;
      return updatedGameBoard;
    });
    setPlayerLogs((prevLogs) => {
      return [
        { player: activePlayer, block: { row: rowIndex, col: colIndex } },
        ...prevLogs,
      ];
    });
    onSelectSquare();
  };

  return (
    <ol id="game-board">
      {gameBoard.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                <button
                  onClick={() => handleSelectSquare(rowIndex, colIndex)}
                  disabled={playerSymbol !== null}
                >
                  {playerSymbol}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
