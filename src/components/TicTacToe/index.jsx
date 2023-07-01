import React, { Component } from "react";
import { Container, Button } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { appContext } from "./../../AppContext";
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";
import { ServerNotRunningComponent } from "../../components/serverNotRunningComponent";
// convert to using class component later

export function GameOverComponent(props) {
  return (
    <>
      <h3>{`Game Over!!! ${
        props.turn === 0 ? "'X'" : "'O'"
      } won the game !!`}</h3>
    </>
  );
}

export function TicTacToe() {
  const { socket, user } = useContext(appContext);
  const [squares, setSquares] = useState(null);
  const [winner, setWinner] = useState(null);
  const [highlightedSquares, setHighlightedSquares] = useState([]);
  const [turn, setTurn] = useState(0);
  const [gameId, setGameId] = useState(-1);
  const [gameOver, setGameOver] = useState(false);
  let { id } = useParams();
  const location = useLocation();
  const gameData = location.state;
  const populateGame = (data) => {
    console.log(
      `here's the data to create a tic tac toe game ${JSON.stringify(data)}`
    );
    if (data.type === "TicTacToe") {
      setSquares(data.squares);
      setGameId(data.id);
      setTurn(data.turn);
      if (winner) {
        setHighlightedSquares(data.winner);
      }
      setWinner(data.winner);
    }
  };
  useEffect(() => {
    console.log(gameData);
    setSquares(gameData.squares);
    setTurn(gameData.turn);
    setGameId(gameData.id);
  }, [gameData]);
  // get details about newly created game

  // recieve update when opponent makes a move
  useEffect(() => {
    socket.on("opponentMadeMove", (data) => {
      console.log(`opponent made move - id:${data.id} gameId:${gameId}`);
      if (data.id == gameId) {
        console.log(`opponent made move - ${JSON.stringify(data)}`);
        setSquares(data.squares);
        setTurn(data.turn);
      }
    });
    return () => {
      socket.off("opponentMadeMove", (data) => {
        console.log(`opponent made move - id:${data.id} gameId:${gameId}`);
        if (data.id == gameId) {
          console.log(`opponent made move - ${JSON.stringify(data)}`);
          setSquares(data.squares);
          setTurn(data.turn);
        }
      });
    };
  }, [gameId, socket]);
  // notification recieved when either win or lose or draw
  useEffect(() => {
    socket.on("gameOver", (data) => {
      console.log(
        `gameOver event sent by server!! dataid: ${data.id}, gameId:${gameId}`
      );
      if (data.id === gameId) {
        setGameOver(true);
        if (data.winningSquares !== null) {
          setHighlightedSquares(data.winningSquares);
          setWinner(data.winningSquares);
        }
        setTurn(data.turn);
      }
    });

    return () => {
      socket.off("gameOver", (data) => {
        console.log(
          `gameOver event sent by server!! dataid: ${data.id}, gameId:${gameId}`
        );
        if (data.id === gameId) {
          setGameOver(true);
          setHighlightedSquares(data.winningSquares);
          setWinner(data.winningSquares);
          setTurn(data.turn);
        }
      });
    };
  }, [gameId, socket]);

  const handleMove = (pos) => {
    console.log(`gameId - ${gameId}, squares that was clicked: ${pos}`);
    socket.emit("move", { pos: pos, gameId: gameId, token: user }, (data) => {
      console.log(`gameId at this point ${gameId}`);
      setSquares(data.squares);
      setTurn(data.turn);
    });
  };

  if (gameId === -1) {
    return <ServerNotRunningComponent />;
  }
  return (
    <div className='text-center'>
      <h1>Tic Tac Toe!!</h1>
      {gameOver && <GameOverComponent turn={turn} />}
      <div>
        <Game
          gameOver={gameOver}
          gameId={gameId}
          squares={squares}
          handleMove={(pos) => handleMove(pos)}
          highlightedSquares={highlightedSquares}
          turn={turn}
        />
      </div>
    </div>
  );
}

class Game extends React.Component {
  handleClick(i) {
    /*const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();*/
    this.props.handleMove(i);
  }

  render() {
    let status;
    status = "Next player: " + (this.props.turn === 0 ? "X" : "O");

    return (
      <>
        <h1>{`Game #${this.props.gameId === -1 ? "" : this.props.gameId}`}</h1>

        <div className='game'>
          <div className='game-board align-items-center'>
            <Board
              gameOver={this.props.gameOver}
              squares={
                this.props.squares ? this.props.squares : Array(9).fill(null)
              }
              onClick={(i) => this.handleClick(i)}
              highlightedSquares={this.props.highlightedSquares}
            />
          </div>
          <div className='game-info'>
            <div>{status}</div>
            {/*<ol>{moves}</ol>*/}
          </div>
        </div>
      </>
    );
  }
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        key={i}
        gameOver={this.props.gameOver}
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
        highlighted={this.props.highlightedSquares.some((x) => x === i)}
      />
    );
  }

  renderRow(squares) {
    return <div className='board-row'>{squares}</div>;
  }
  renderBoard(numberOfSquares = 9, numberOfCols = 3) {
    let rows = [];
    for (let row = 0; row < numberOfSquares / numberOfCols; row++) {
      let squares = [];
      for (let col = 0; col < numberOfCols; col++) {
        squares.push(this.renderSquare(row * numberOfCols + col));
      }
      rows.push(this.renderRow(squares));
    }
    return rows;
  }
  render() {
    return <div className='center'>{this.renderBoard(9, 3)}</div>;
  }
}

function Square(props) {
  return (
    <button
      disabled={props.gameOver}
      className={`square ${props.highlighted ? "highlight" : ""}`}
      onClick={props.onClick}
    >
      {props.value === -1 ? null : props.value}
    </button>
  );
}
