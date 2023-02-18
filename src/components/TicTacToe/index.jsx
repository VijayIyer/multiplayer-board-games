import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { useContext, useEffect, useState } from 'react';
import {useParams} from 'react-router-dom';
import { appContext } from './../../AppContext';
import './../../App.css';
// convert to using class component later

export function TicTacToe () {
		const socket = useContext(appContext);
    let { id } = useParams()
		useEffect(()=>{
			console.log(`is id undefined ${!id}`)
			if(!id){
        socket.emit('createTicTacToeGame', {'name':'vijay'});
      }
			else{
        socket.emit('getExistingTicTacToeGame', {'id' : id});
      }
      socket.on('newGameDetails', (data)=>{
				console.log(`here's the data to create a tic tac toe game ${JSON.stringify(data)}`);
				setSquares(data.squares);
				setGameId(data.id);
			});
    socket.on('ongoingGameDetails', (data)=>{
        console.log(`here's the ongoing game data ${JSON.stringify(data)}`);
        setSquares(data.squares);
        setGameId(data.id);
      });
    socket.on('opponentMadeMove', (data)=>{
        console.log(`here's the ongoing game data ${JSON.stringify(data)}`);
        setSquares(data.squares);
        setTurn(data.turn);
      });
    socket.on('gameOver', (data)=>{
        console.log(`Game Over!`);
        setHighlightedSquares(data.winningSquares)
      });

		}, [])
	const [squares, setSquares] = useState(null)
  const [winner, setWinner] = useState(null);
  const [highlightedSquares, setHighlightedSquares] = useState([]);
  const [turn, setTurn] = useState(0);
  const [gameId, setGameId] = useState(-1);

		const handleMove = (pos) => {
  		console.log(`squares that was clicked: ${pos}`);
  		socket.emit('move', {'pos':pos, 'gameId':gameId}, (data)=>{
        console.log(`${JSON.stringify(data)}`)
        setSquares(data.squares);
        setTurn(data.turn);
      });
      
  	}
  	// const restart = () =>{
    // 	socket.emit('restart', ()=>{});  
  	// }
  	const sendChatMessage  = () =>{
    	socket.emit('chat', {'msg':document.querySelector('#chatBox').value});
  	}
  	// const join = () =>{
    // 	console.log('joining')
    // 	socket.emit('join', ()=>{})
  	// }
		return(
			<Container>
				<h1>Tic Tac Toe!!</h1>
				<Game gameId={gameId} squares={squares}
				handleMove={(pos)=>handleMove(pos)} 
      	highlightedSquares={highlightedSquares}
      	turn={turn}
				/>
			</Container>
			)
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
    status = 'Next player: ' + (this.props.turn === 0? 'X' : 'O');
    

    return (
    <>
    <h1>{`Game No.: ${this.props.gameId == -1 ? '' : this.props.gameId}`}</h1>
	
	<div className="game">
	<div className="game-board">
	  <Board
	    squares={this.props.squares ? this.props.squares: Array(9).fill(null)}
	    onClick={(i) => this.handleClick(i)}
      highlightedSquares={this.props.highlightedSquares}
	  />
	</div>
	<div className="game-info">
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
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
        highlighted={ this.props.highlightedSquares.some(x => x === i)}
      />
    );
  }
    
  renderRow(squares){
    return (
      <div className='board-row'>
        {squares}
      </div>
    )
  }
  renderBoard(numberOfSquares = 9, numberOfCols = 3 ){
    let rows = []
    for(let row = 0; row < numberOfSquares/ numberOfCols; row++){
      let squares = [];
      for(let col = 0; col < numberOfCols; col++){
        squares.push(this.renderSquare(row*numberOfCols + col))
      }
      rows.push(this.renderRow(squares));
    }
    return rows;
  }
  render() {
    return (
      <div>
        {this.renderBoard(9, 3)}
      </div>
    );
  }
}

function Square(props) {
  return (
    <button className={`square ${props.highlighted ? 'highlight' : ''}`} onClick={props.onClick}>
      {props.value === -1 ? null : props.value}
    </button>
  );
}
