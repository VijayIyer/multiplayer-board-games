import { createContext, useContext, useState, useEffect } from "react";
import { appContext } from "./../../AppContext";
import { useParams, useLocation } from "react-router-dom";
import { Connect4 } from "./index.jsx";
import "./../../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { gameContext } from "./gameContext";

export const GameContextProvider = (props) => {
  const { socket, user } = useContext(appContext);
  const numRows = 8; // needs to be dynamic
  const numCols = 6; // needs to be dynamic
  const [moves, setMoves] = useState([]); 
  const [turn, setTurn] = useState("red");
  const [gameId, setGameId] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [winningCircles, setWinningCircles] = useState([]);
  const [filled, setFilled] = useState(Array(numRows * numCols).fill(-1));
  const [allowed, setAllowed] = useState(
    Array.from(
      Array.from({ length: numCols }, (value, index) => index),
      (arr) => arr + (numRows - 1) * numCols
    )
  );
  let { id } = useParams();
  const location = useLocation();
  const gameData = location.state.data;
  useEffect(() => {
      setGameId(gameData.id);
      setTurn(gameData.turn == 1 ? "blue" : "red");
      setFilled(gameData.filled);
      setAllowed(gameData.allowed);  
  }, []);
  
  useEffect(() => {
    socket.on("connect4MoveSuccess", (data) => {
      console.log(`a move was played - ${JSON.stringify(data)}`);
      if (data.id == gameId) {
        console.log(`a move was played - ${JSON.stringify(data)}`);
        setTurn(data.turn == 1 ? "blue" : "red");
        setMoves((moves) => filled.filter((x, i) => x != -1));
        setFilled(data.filled);
        setAllowed(data.allowed);
      }
    });
    return ()=>{
      socket.off("connect4MoveSuccess", (data) => {
        console.log(`a move was played - ${JSON.stringify(data)}`);
        if (data.id == gameId) {
          console.log(`a move was played - ${JSON.stringify(data)}`);
          setTurn(data.turn == 1 ? "blue" : "red");
          setMoves((moves) => filled.filter((x, i) => x != -1));
          setFilled(data.filled);
          setAllowed(data.allowed);
        }
      })
    }
  }, [gameId]);
  useEffect(() => {
    socket.on("connect4gameover", (data) => {
      if (data.id == gameId) {
        setTurn(data.turn == 1 ? "blue" : "red");
        setFilled(data.filled);
        setAllowed(data.allowed);
        setGameOver(true);
        console.log(
          `winning circles are  - ${JSON.stringify(data.winningCircles)}`
        );
        setWinningCircles(data.winningCircles);
      }
    });
    return ()=>{
      socket.off("connect4gameover", (data) => {
        if (data.id == gameId) {
            setTurn(data.turn == 1 ? "blue" : "red");
            setFilled(data.filled);
            setAllowed(data.allowed);
            setGameOver(true);
            console.log(
              `winning circles are  - ${JSON.stringify(data.winningCircles)}`
            );
            setWinningCircles(data.winningCircles);
          }
        })
    }
  }, [gameId]);
  useEffect(() => {
    socket.on("moveNotAllowed", () => {
      console.warn("move not allowed");
    });
  }, []);

  return (
    <gameContext.Provider
      value={{
        gameId,
        filled,
        setFilled,
        allowed,
        setAllowed,
        turn,
        setTurn,
        gameOver,
        setGameOver,
        winningCircles,
        setWinningCircles,
        numRows,
        numCols,
      }}
    >
      {gameId === null ? (
        <>
          <h1>{`No game to render`}</h1>
        </>
      ) : (
        <>
          <h1>Game ID : #{gameId}</h1>
          <div>{`Moves : ${moves}`}</div>
          {props.children}
        </>
      )}
    </gameContext.Provider>
  );
};
