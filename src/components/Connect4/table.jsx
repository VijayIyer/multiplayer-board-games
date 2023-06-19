import React, { Component } from "react";
import { useContext, useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import "./table.css";
import { gameContext } from "./gameContext";
import { appContext } from "./../../AppContext";
import "bootstrap/dist/css/bootstrap.min.css";
const Cell = (props) => {
  const {
    filled,
    allowed,
    winningCircles,
    turn,
    setTurn,
    setAllowed,
    numCols,
  } = useContext(gameContext);
  const { socket, user } = useContext(appContext);
  // const [fill, setFill] = useState(false);
  // const [fillColor, setFillColor] = useState(turn)

  function fillCell(e) {
    if (
      allowed.some((x) => x === props.cellNumber) &&
      filled[props.cellNumber] == -1
    ) {
      //setFill(true);
      // setFillColor((fillColor) =>{
      // 	return turn === 'red' ? 'red' : 'blue'
      // });
      props.changeTurn();
      setAllowed((allowed) => [...allowed, props.cellNumber - numCols]); // replace 6 with numCols
      props.addFilled(props.cellNumber);
    }
  }
  return (
    <td
      className={`${
        winningCircles.some((x) => x === props.cellNumber) ? "winning" : ""
      } ${
        allowed.some((x) => x === props.cellNumber)
          ? filled.some((x, i) => i == props.cellNumber && x != -1)
            ? filled[props.cellNumber] === "red"
              ? "red-fill"
              : "blue-fill"
            : "allowed"
          : ""
      }`}
      onClick={(e) => fillCell(e)}
    ></td>
  );
  // <td className={filled.some((x, i) => i === props.cellNumber && x != -1) ? (filled[props.cellNumber] == 'red' ? 'red-fill' : 'blue-fill'): allowed.some((x, i) => x == props.cellNumber ? 'allowed': '')} onClick={fillCell}></td>
  // )
};

const Row = (props) => {
  const { allowed, numCols } = useContext(gameContext);
  function renderCols(numCols) {
    let cols = [];
    for (let i = 0; i < numCols; i++) {
      const cell = props.rowNumber * numCols + i;
      // console.log(`cell number in Row is  - ${cell}`)
      cols.push(
        <Cell
          key={cell}
          changeTurn={props.changeTurn}
          addFilled={props.addFilled}
          cellNumber={cell}
        />
      );
    }
    return cols;
  }

  return <tr key={props.rowNumber}>{renderCols(numCols)}</tr>;
};

export const Table = (props) => {
  const { socket, user } = useContext(appContext);
  const {
    gameId,
    filled,
    setFilled,
    allowed,
    setAllowed,
    winningCircles,
    setWinningCircles,
    turn,
    setTurn,
    gameOver,
    setGameOver,
    numRows,
    numCols,
  } = useContext(gameContext);

  // useEffect(()=>{
  // 	console.log('checking game over')
  // 		setGameOver(isGameOver())
  // 	}, [JSON.stringify(filled)]);

  function addFilled(cellNumber) {
    // let filledCells = filled;
    // filledCells[cellNumber] =  turn;
    // console.log(`playing move on ${cellNumber}, game ${gameId}`)
    if (!gameOver) {
      socket.emit("connect4Move", {
        gameId: gameId,
        cellNumber: cellNumber,
        token: user,
      });
    }
  }

  function changeTurn() {
    let current = turn;
    setTurn((current) => {
      return current == "red" ? "blue" : "red";
    });
  }
  function renderRows(numRows) {
    const rows = [];
    for (let i = 0; i < numRows; i++) {
      rows.push(
        <Row
          key={i}
          changeTurn={changeTurn}
          rowNumber={i}
          numCols={numCols}
          addFilled={addFilled}
          winningCircles={winningCircles}
        />
      );
    }
    return rows;
  }

  return (
    <Container>
      {gameOver && <h1>{`${turn.toUpperCase()} won. Game Over!`}</h1>}
      {filled === undefined && <div>filled is undefined</div>}
      {allowed === undefined && <div>allowed is undefined</div>}
      {setAllowed === undefined && <div>setAllowed is undefined</div>}
      {winningCircles === undefined && <div>winningCircles is undefined</div>}
      {setWinningCircles === undefined && (
        <div>setWinningCircles is undefined</div>
      )}
      {gameOver === undefined && (
        <div className='warning'>gameOver is undefined</div>
      )}
      {setTurn === undefined && <div>setTurn is undefined</div>}
      <div className={`background && ${gameOver && "disabledDiv"}`}>
        <table>
          <tbody>{renderRows(numRows)}</tbody>
        </table>
      </div>
    </Container>
  );
};
