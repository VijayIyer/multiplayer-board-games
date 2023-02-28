import { createContext, useContext, useState, useEffect} from 'react';
import { appContext } from './../../AppContext';
import {useParams} from 'react-router-dom';
import { Connect4 } from './index.jsx';
import './../../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export const gameContext = createContext(null);
export const Connect4Game = () => {
	const socket = useContext(appContext);
	let { id } = useParams()
	useEffect(()=>{
		if(!id){
        socket.emit('createTicTacToeGame', {'name':'vijay'});
      }
			else{
        socket.emit('getExistingTicTacToeGame', {'id' : id});
      }
	}, []);

	useEffect(()=>{
			socket.on('newConnect4GameDetails', (data)=>{
							setGameId(data.id);
							setFilled(data.filled);
							setAllowed(data.allowed);
							setWinningCircles(data.winningCircles);
			});	
	}, []);

	const numRows = 8;
	const numCols = 6;
	let [filled, setFilled] = 
	//useState(Array(props.numRows * props.numCols).fill(-1));
	useState(Array(numRows * numCols).fill(-1));
	let [allowed, setAllowed] = useState(Array.from(Array.from({ length: numCols }, (value, index) => index), arr => arr + (numRows - 1)*numCols));
	let [turn, setTurn] = useState('red');
	let [gameId, setGameId] = useState(-1);
	let [gameOver, setGameOver] = useState(false);
	let [winningCircles, setWinningCircles] = useState([]);

	return (
	<gameContext.Provider 
	value={
		filled=filled,
		setFilled=setFilled,
		allowed=allowed, 
		setAllowed=setAllowed,
		turn=turn,
		setTurn=setTurn,
		gameOver=gameOver,
		setGameOver=setGameOver,
		winningCircles=winningCircles,
		setWinningCircles=setWinningCircles
		}
	>
		<>
		{id && <h1>Game ID : {id}</h1>}
		<Connect4 numRows={numRows} numCols={numCols} />
		</>
	</gameContext.Provider>
	)
}