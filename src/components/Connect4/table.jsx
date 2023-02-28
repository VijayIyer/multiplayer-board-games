import React, { Component } from 'react';
import { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import './table.css'
import { gameContext } from './gameContext';

export class Cell extends Component{
	constructor(props){
		super(props);
		this.state = {
			fill : false,
			fillColor:this.props.turn
		}
		this.fill = this.fill.bind(this);
	}
	fill(e){
		if(this.props.allowed.some(x => x === this.props.cellNumber) && !this.state.fill){
			this.setState({
				fill: true,
				fillColor: this.props.turn === 'red' ? 'red' : 'blue'
			})
		  this.props.setTurn();
			this.props.allowed.push(this.props.cellNumber - 6);
			this.props.addFilled(this.props.cellNumber);
		}
	}
	render(){
		// console.log(`this cell is in allowed? ${this.props.allowed.some(x => x == this.props.cellNumber)} is filled? ${this.state.fill} with color ${this.state.fillColor}`)
		return (
			<td className={`${this.props.allowed.some(x => x === this.props.cellNumber) ? (this.state.fill ? (this.state.fillColor === 'red'? 'red-fill' : 'blue-fill'): 'allowed') : ''} ${this.props.winningCircles.some(x => x === this.props.cellNumber) ? 'winning': ''}`} onClick={(e) => this.fill(e)} >
			</td>)
	}
}

export class Row extends Component{
	constructor(props){
		super(props);
		this.renderCols = this.renderCols.bind(this);
	}
	renderCols(numCols){
		// console.log(`allowed : ${this.props.allowed}`);
		let cols = [];
		for(let i = 0; i < numCols; i++){
			const cell = this.props.rowNumber * numCols + i;
			cols.push(
				(
					<Cell 
					key={cell} 
					turn={this.props.turn} 
					setTurn={this.props.setTurn}
					className={`${this.props.allowed.some(x => x === cell)  ? 'allowed' : ''}`}allowed={this.props.allowed}
					 addFilled={this.props.addFilled}
					 cellNumber={cell}
					 onClick={(e)=>this.fill(e)}
					 winningCircles={this.props.winningCircles}
					 />));
		}
		return cols;
	}
	render(){
		return (
			<tr key={this.props.rowNumber}>
				{this.renderCols(this.props.numCols)}
			</tr>)
	}
}

export const Table = (props) => {
	let { filled, setFilled, allowed, setAllowed, winningCircles, setWinningCircles} = useContext(gameContext);
	
	// 	super(props);
	// 	this.state={
	// 		filled:Array(props.numRows * props.numCols).fill(-1),
	// 		allowed:Array.from(Array.from({ length: props.numCols }, (value, index) => index), arr => arr + (this.props.numRows - 1)*this.props.numCols),
	// 		turn:'red',
	// 		gameOver:false,
	// 		winningCircles:[]
	// 	}
	// 	this.setTurn = this.setTurn.bind(this);
	// 	this.addFilled = this.addFilled.bind(this);
	// 	this.isGameOver = this.isGameOver.bind(this);
	// }
	function addFilled(cellNumber){
		let current = this.state.turn;
		let filled = this.state.filled;
		filled[cellNumber] = current;
		this.setState({
			filled: filled
		}, ()=>{
			this.setState({
				gameOver:this.isGameOver()
			})
		});
	}
	function isGameOver(){
		return this.checkVerticalCells()
		|| this.checkHorizontalCells() 
		|| this.checkLeftRightDiagonals()
		|| this.checkRightLeftDiagonals();
	}
	// these 4 methods need to be more clean and easier to understand
	function checkHorizontalCells(){
		let compareArrayLocations = {
		index:[]
	}
		let rows = this.props.numRows;
		let cols = this.props.numCols;
		for(let i = 0; i < rows; i++){
			for(let j = 0; j <= cols - 4; j ++){
				let compareArrayLocations = {
		index:[]
	}
				let compareArray =this.state.filled.filter(function (x, index, arr) {
					if(index == i*cols+j || 
						index == i*cols+ (j + 1) || 
						index == i*cols+ (j + 2) || 
						index == i*cols+ (j + 3)
					&& (x === 'red'  || x === 'blue') 
					&& ((arr[i*cols+j] === x) 
					&& (arr[i*cols+(j+1)]=== x)
					&& (arr[i*cols+(j+2)]=== x)
					&& (arr[i*cols+(j+3)]=== x)))
					{
						this.index.push(index);
						return true;
					}
			}, compareArrayLocations)
				console.log(`compareArrayLocations: ${compareArrayLocations.index}`)
				if (compareArray.length == 4 && compareArray.every((x, index, arr) => ((x === 'red' || x === 'blue') && x === arr[0]))) {
					this.setState({
						winningCircles: compareArrayLocations.index
					});
					return true
				};
			}
		}
		return false;
	}
	function checkLeftRightDiagonals(){
	
	let rows = this.props.numRows;
		let cols = this.props.numCols;
		for(let i = 0; i <= rows - 4; i++){
			for(let j = cols - 1; j >= cols - 4; j--){
				let compareArrayLocations = {
		index:[]
	}
				let compareArray =this.state.filled.filter(function (x, index, arr) {
					if(index == i*cols+j || 
						index == (i+1)*cols+ (j-1) || 
						index == (i+2)*cols+ (j-2) || 
						index == (i+3)*cols+ (j-3)
					&& (x === 'red'  || x === 'blue') 
					&& ((arr[i*cols+j] == x) 
					&& (arr[(i+1)*cols+(j-1)] === x)
					&& (arr[(i+2)*cols+(j-2)] === x)
					&& (arr[(i+3)*cols+(j-3)] === x)))
					{

						this.index.push(index);
						return true;
					}
			}, compareArrayLocations)

				console.log(`compareArrayLocations: ${compareArrayLocations.index}`)
				if (compareArray.length == 4 && compareArray.every((x, index, arr) => ((x == 'red' || x == 'blue') && x == arr[0]))) {
					this.setState({
						winningCircles: compareArrayLocations.index
					})
					return true
				};
			}
		}
		return false;
	}
	function checkRightLeftDiagonals(){
		
		let rows = this.props.numRows;
		let cols = this.props.numCols;
		for(let i = 0; i <= rows - 4; i++){
			for(let j = 0; j <= cols - 4; j ++){
				let compareArrayLocations = {
					index:[]
					}
				let compareArray =this.state.filled.filter(function (x, index, arr) {
				if (index == i*cols+j || 
					  index == (i+1)*cols+ (j+1) || 
					  index == (i+2)*cols+ (j+2) || 
					  index == (i+3)*cols+ (j+3)
					&& (x === 'red'  || x === 'blue') 
					&& ((arr[i*cols+j] == x) 
					&& (arr[(i+1)*cols+(j+1)] === x)
					&& (arr[(i+2)*cols+(j+2)] === x)
					&& (arr[(i+3)*cols+(j+3)] === x)))
				{
					this.index.push(index);
					return true;
				}
		}, compareArrayLocations)
				console.log(`compareArrayLocations: ${compareArrayLocations.index}`)
				if (compareArray.length == 4 && compareArray.every((x, index, arr) => ((x === 'red' || x === 'blue') && x === arr[0]))) {
					this.setState({
						winningCircles: compareArrayLocations.index
					})
					return true
				};
			}
		}
		return false;
	}
	function checkVerticalCells(){
		console.log(`checking vertical cells`);
		
		console.log('checking vertical 4 in a row');
		let rows = this.props.numRows;
		let cols = this.props.numCols;
		for(let i = 0; i <= rows - 4; i++){
			for(let j = 0; j < cols; j ++){
				let compareArrayLocations = {
		index:[]
	}
				let compareArray =this.state.filled.filter(function (x, index, arr) {
					if((index == i*cols+j || 
					index == (i+1)*cols+j || 
					index == (i+2)*cols+j || 
					index == (i+3)*cols+j)
					&& (x === 'red'  || x === 'blue') 
					&& ((arr[i*cols+j] == x) 
					&& (arr[(i+1)*cols+j] === x)
					&& (arr[(i+2)*cols+j] === x)
					&& (arr[(i+3)*cols+j] === x)))
					{
						this.index.push(index);
						return true;
				}
		}, compareArrayLocations);
				console.log(`compareArray : ${compareArray}`)
				if(compareArray.length == 4 && compareArray.every((x, index, arr) => ((x === 'red' || x === 'blue') && (x === arr[0])))) {
					console.log(`compareArray length ${compareArray.length}`);
					this.setState({
						winningCircles: compareArrayLocations.index
					})
					return true
				};
			}
		}
		return false;
	}
	function setTurn(){
		let current = this.state.turn;
		this.setState({
			turn: current == 'red' ? 'blue' : 'red'
		});
	}
	function renderRows(numRows){
		const rows = [];
		for(let i = 0; i < numRows; i++){
			rows.push(
				<Row 
				key={i}
				turn={this.state.turn} 
				setTurn={this.setTurn} 
				allowed={this.state.allowed} 
				rowNumber={i} 
				numCols={this.props.numCols} 
				addFilled={this.addFilled}
				winningCircles={this.state.winningCircles}
				/>)
		}
		return rows;
	}
	
	return(
			<Container>
			  { this.state.gameOver && <h1>{`${(this.state.turn == 'red'? 'blue' : 'red').toUpperCase()} won. Game Over!`}</h1>}
				<div className={`background && ${this.state.gameOver && 'disabledDiv'}`}>
					<table>
						<tbody>
							{this.renderRows(this.props.numRows)}
						</tbody>
					</table>
				</div>
			</Container>
			)
}