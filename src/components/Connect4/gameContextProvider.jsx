import { createContext, useContext, useState, useEffect} from 'react';
import { appContext } from './../../AppContext';
import {useParams} from 'react-router-dom';
import { Connect4 } from './index.jsx';
import './../../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { gameContext } from './gameContext';

export const GameContextProvider = (props) => {
	const socket = useContext(appContext);
	const numRows = 8;  // needs to be dynamic
	const numCols = 6;  // needs to be dynamic
	const [moves, setMoves] = useState([]);
	let [turn, setTurn] = useState('red');
	let [gameId, setGameId] = useState(null);
	let [gameOver, setGameOver] = useState(false);
	let [winningCircles, setWinningCircles] = useState([]);
	let [filled, setFilled] = useState(Array(numRows * numCols).fill(-1));
	let [allowed, setAllowed] = useState(Array.from(Array.from({ length: numCols }, (value, index) => index), arr => arr + (numRows - 1)*numCols));
	
	let { id } = useParams();
	useEffect(()=>{
		if(!id){
        socket.emit('createConnect4Game', {'name':'vijay'});
      }
			else{
        socket.emit('getExistingConnect4Game', {'id' : id});
      }
	}, []);

	useEffect(()=>{
			socket.on('newConnect4GameDetails', (data)=>{
						console.log(`new connect4 game details - ${JSON.stringify(data)}`);
						setGameId(data.id);
						setTurn(data.turn == 1 ? 'blue':'red')
						setFilled(data.filled);
						setAllowed(data.allowed);
			});	
		}, []);
	useEffect(()=>{
			socket.on('ongoingConnect4GameDetails', (data) =>{
				console.log(`existing connect4 game details - ${JSON.stringify(data)}, ${gameId}`);
				
					console.log(`existing connect4 game details - ${JSON.stringify(data)}`);
					setGameId(data.id);
					setTurn(data.turn == 1 ? 'blue':'red')
					setFilled(data.filled);
					setAllowed(data.allowed);
					setWinningCircles(data.winningCircles);
				
			})

	}, [gameId]);

	useEffect(()=>{
				socket.on('connect4MoveSuccess', (data) =>{
					console.log(`a move was played - ${JSON.stringify(data)}`);
					if(data.id == gameId){
						console.log(`a move was played - ${JSON.stringify(data)}`);
						setTurn(data.turn == 1 ? 'blue':'red')
						setMoves((moves) => filled.filter((x, i)=> x != -1))
						setFilled(data.filled);
						setAllowed(data.allowed);	
					}
			})

	}, [gameId]);

	useEffect(()=>{
		socket.on('connect4gameover', (data)=>{
			if(data.id == gameId){
				setTurn(data.turn == 1 ? 'blue':'red')
				setFilled(data.filled);
				setAllowed(data.allowed);
				setGameOver(true);
				console.log(`winning circles are  - ${JSON.stringify(data.winningCircles)}`);
				setWinningCircles(data.winningCircles)
			}
		
		})
	}, [gameId])
	useEffect(()=>{
		socket.on('moveNotAllowed', ()=>{
			console.warn('move not allowed')
		})
	}, [])
	
	return (
	<gameContext.Provider 
	value={{
		gameId, 
		socket,
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
		numCols
		}}
	>
		{ gameId === null ? 
		<><h1>{`No game to render`}</h1></>	
		:
		(
				<>
					<h1>Game ID : #{gameId}</h1>
					<div>{`Moves : ${moves}`}</div>
					{props.children}
				</>
		)
		
	}
		
	</gameContext.Provider>
	)
}