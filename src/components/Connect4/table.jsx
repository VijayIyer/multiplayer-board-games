import React, { Component } from 'react';
import { useContext, useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import './table.css'
import { gameContext } from './gameContext';
import 'bootstrap/dist/css/bootstrap.min.css';
const Cell = (props) =>{
	const { filled, allowed, winningCircles, turn, setTurn, setAllowed, numCols } = useContext(gameContext);
	// const [fill, setFill] = useState(false);
	// const [fillColor, setFillColor] = useState(turn)
	
	function fillCell(e)
	{
		if(allowed.some(x => x === props.cellNumber) && filled[props.cellNumber] == -1){
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
			<td className={`${winningCircles.some(x => x === props.cellNumber) ? 'winning': ''} ${allowed.some(x => x === props.cellNumber) ? (filled.some((x, i) => i == props.cellNumber && x != -1) ? (filled[props.cellNumber] === 'red'? 'red-fill' : 'blue-fill'): 'allowed') : ''}`} onClick={(e) => fillCell(e)} >
				
			</td>)
			// <td className={filled.some((x, i) => i === props.cellNumber && x != -1) ? (filled[props.cellNumber] == 'red' ? 'red-fill' : 'blue-fill'): allowed.some((x, i) => x == props.cellNumber ? 'allowed': '')} onClick={fillCell}></td>
			// )
	}

const Row = (props) =>
{
	const { allowed, numCols } = useContext(gameContext);
	function renderCols(numCols){
		
		let cols = [];
		for(let i = 0; i < numCols; i++){
			const cell = props.rowNumber * numCols + i;
			console.log(`cell number in Row is  - ${cell}`)
			cols.push(
				(
					<Cell 
					key={cell} 
					changeTurn={props.changeTurn}
					addFilled={props.addFilled}
					cellNumber={cell}
					 />));
		}
		return cols;
	}
	
		return (
			<tr key={props.rowNumber}>
				{renderCols(numCols)}
			</tr>)
}

export const Table = (props) => {

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
		socket,
		numRows,
		numCols
	} = useContext(gameContext);
	
	// useEffect(()=>{
	// 	console.log('checking game over')
	// 		setGameOver(isGameOver())
	// 	}, [JSON.stringify(filled)]);
	

	function addFilled(cellNumber){
		// let filledCells = filled;
		// filledCells[cellNumber] =  turn;
		console.log(`playing move on ${cellNumber}, game ${gameId}`)
		if(!gameOver){
			socket.emit('connect4Move', {
			'gameId':gameId,
			'cellNumber':cellNumber
			});
		}
	}
	// function isGameOver(){
	// 	return checkVerticalCells()
	// 	|| checkHorizontalCells() 
	// 	|| checkLeftRightDiagonals()
	// 	|| checkRightLeftDiagonals();
	// }
	// function checkHorizontalCells(){
	// 	let rows = numRows;
	// 	let cols = numCols;
	// 	for(let i = 0; i < rows; i++){
	// 		for(let j = 0; j <= cols - 4; j ++){
	// 			let compareArrayLocations = {
	// 			index:[]
	// 			}
	// 			let compareArray =  filled.filter(function (x, index, arr) {
	// 				if(index == i*cols+j || 
	// 					index == i*cols+ (j + 1) || 
	// 					index == i*cols+ (j + 2) || 
	// 					index == i*cols+ (j + 3)
	// 				&& (x === 'red'  || x === 'blue') 
	// 				&& ((arr[i*cols+j] === x) 
	// 				&& (arr[i*cols+(j+1)]=== x)
	// 				&& (arr[i*cols+(j+2)]=== x)
	// 				&& (arr[i*cols+(j+3)]=== x)))
	// 				{
	// 					this.index.push(index);
	// 					return true;
	// 				}
	// 		}, compareArrayLocations)

	// 			if (compareArray.length == 4 && compareArray.every((x, index, arr) => ((x === 'red' || x === 'blue') && x === arr[0]))) {
	// 				setWinningCircles(compareArrayLocations.index);
	// 				return true
	// 			};
	// 		}
	// 	}
	// 	return false;
	// }
	// function checkLeftRightDiagonals(){
	
	// let rows = numRows;
	// 	let cols = numCols;
	// 	for(let i = 0; i <= rows - 4; i++){
	// 		for(let j = cols - 1; j >= cols - 4; j--){
	// 			let compareArrayLocations = {
	// 			index:[]
	// 			}
	// 			let compareArray = filled.filter(function (x, index, arr) {
	// 				if(index == i*cols+j || 
	// 					index == (i+1)*cols+ (j-1) || 
	// 					index == (i+2)*cols+ (j-2) || 
	// 					index == (i+3)*cols+ (j-3)
	// 				&& (x === 'red'  || x === 'blue') 
	// 				&& ((arr[i*cols+j] == x) 
	// 				&& (arr[(i+1)*cols+(j-1)] === x)
	// 				&& (arr[(i+2)*cols+(j-2)] === x)
	// 				&& (arr[(i+3)*cols+(j-3)] === x)))
	// 				{

	// 					this.index.push(index);
	// 					return true;
	// 				}
	// 		}, compareArrayLocations)

	// 			if (compareArray.length == 4 && compareArray.every((x, index, arr) => ((x == 'red' || x == 'blue') && x == arr[0]))) {
	// 				setWinningCircles(compareArrayLocations.index);
	// 				return true
	// 			};
	// 		}
	// 	}
	// 	return false;
	// }
	// function checkRightLeftDiagonals(){
		
	// 	let rows = numRows;
	// 	let cols = numCols;
	// 	for(let i = 0; i <= rows - 4; i++){
	// 		for(let j = 0; j <= cols - 4; j ++){
	// 			let compareArrayLocations = {
	// 				index:[]
	// 				}
	// 			let compareArray = filled.filter(function (x, index, arr) {
	// 			if (index == i*cols+j || 
	// 				  index == (i+1)*cols+ (j+1) || 
	// 				  index == (i+2)*cols+ (j+2) || 
	// 				  index == (i+3)*cols+ (j+3)
	// 				&& (x === 'red'  || x === 'blue') 
	// 				&& ((arr[i*cols+j] == x) 
	// 				&& (arr[(i+1)*cols+(j+1)] === x)
	// 				&& (arr[(i+2)*cols+(j+2)] === x)
	// 				&& (arr[(i+3)*cols+(j+3)] === x)))
	// 			{
	// 				this.index.push(index);
	// 				return true;
	// 			}
	// 	}, compareArrayLocations)
	// 			if (compareArray.length == 4 && compareArray.every((x, index, arr) => ((x === 'red' || x === 'blue') && x === arr[0]))) {
	// 				setWinningCircles(compareArrayLocations.index);
	// 				return true
	// 			};
	// 		}
	// 	}
	// 	return false;
	// }
	// function checkVerticalCells(){
	// 	let rows = numRows;
	// 	let cols = numCols;
	// 	for(let i = 0; i <= rows - 4; i++){
	// 		for(let j = 0; j < cols; j ++){
	// 			let compareArrayLocations = {
	// 				index:[]
	// 			}
	// 			let compareArray = filled.filter(function (x, index, arr) {
	// 				if((index == i*cols+j || 
	// 				index == (i+1)*cols+j || 
	// 				index == (i+2)*cols+j || 
	// 				index == (i+3)*cols+j)
	// 				&& (x === 'red'  || x === 'blue') 
	// 				&& ((arr[i*cols+j] == x) 
	// 				&& (arr[(i+1)*cols+j] === x)
	// 				&& (arr[(i+2)*cols+j] === x)
	// 				&& (arr[(i+3)*cols+j] === x)))
	// 				{
	// 					this.index.push(index);
	// 					return true;
	// 					}
	// 			}, compareArrayLocations);
	// 			if(compareArray.length == 4 && compareArray.every((x, index, arr) => ((x === 'red' || x === 'blue') && (x === arr[0])))) {
	// 				setWinningCircles(compareArrayLocations.index);
	// 				return true
	// 			};
	// 		}
	// 	}
	// 	return false;
	// }
	function changeTurn(){
		let current = turn;
		setTurn((current) =>{
			return current == 'red' ? 'blue' : 'red'
		});
	}
	function renderRows(numRows){
		const rows = [];
		for(let i = 0; i < numRows; i++){
			rows.push(
				<Row 
				key={i}
				changeTurn={changeTurn} 
				rowNumber={i} 
				numCols={numCols} 
				addFilled={addFilled}
				winningCircles={winningCircles}
				/>)
		}
		return rows;
	}
	
	return(
			<Container>
			  { gameOver && <h1>{`${turn.toUpperCase()} won. Game Over!`}</h1>}
				{filled === undefined && <div>filled is undefined</div>}
				{allowed === undefined && <div>allowed is undefined</div>}
				{setAllowed === undefined && <div>setAllowed is undefined</div>}
				{winningCircles === undefined && <div>winningCircles is undefined</div>}
				{setWinningCircles  === undefined && <div>setWinningCircles is undefined</div>}
				{gameOver === undefined && <div className='warning'>gameOver is undefined</div>}
				{setTurn === undefined && <div>setTurn is undefined</div>}
				<div className={`background && ${gameOver && 'disabledDiv'}`}>
					<table>
						<tbody>
							{renderRows(numRows)}
						</tbody>
					</table>
				</div>
			</Container>
			)
}