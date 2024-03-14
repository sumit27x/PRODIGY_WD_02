import React, { useState } from "react";
import "./TicTacToe.css";
import { TbTicTac } from "react-icons/tb";

const INITIAL_STATE = {
  board: Array(9).fill(null),
  xIsNext: true,
  winner: null,
};

const WINNING_LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const TicTacToe = () => {
  const [gameState, setGameState] = useState(INITIAL_STATE);

  const handleClick = (index) => {
    if (gameState.board[index] || gameState.winner) return;

    const newBoard = [...gameState.board];
    newBoard[index] = gameState.xIsNext ? "X" : "O";

    const winner = calculateWinner(newBoard);

    setGameState({
      board: newBoard,
      xIsNext: !gameState.xIsNext,
      winner: winner,
    });
  };

  const calculateWinner = (board) => {
    for (let i = 0; i < WINNING_LINES.length; i++) {
      const [a, b, c] = WINNING_LINES[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  };

  const resetGame = () => {
    setGameState(INITIAL_STATE);
  };

  const renderCell = (index) => {
    return (
      <div className="cell" onClick={() => handleClick(index)}>
        {gameState.board[index]}
      </div>
    );
  };

  const renderWinner = () => {
    if (gameState.winner) {
      return <div className="winner">{gameState.winner} wins!</div>;
    } else if (!gameState.board.includes(null)) {
      return <div className="winner">It's a draw!</div>;
    } else {
      return null;
    }
  };

  return (
    <div className="main">
      <div className="container">
        <h1>
          <TbTicTac className="icon"/>
          Tic Tac Toe
        </h1>
        <div className="board">
          {gameState.board.map((cell, index) => renderCell(index))}
        </div>
        {/* {renderWinner()} */}
        {renderWinner()}
        <button onClick={resetGame}>Reset Game</button>
      </div>
    </div>
  );
};

export default TicTacToe;
