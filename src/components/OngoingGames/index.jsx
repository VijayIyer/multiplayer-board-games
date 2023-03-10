import { useContext, useState, useEffect } from 'react';
import { appContext } from './../../AppContext';
import { Link } from 'react-router-dom';
import './../../App.css';
import './index.css'
import Button from 'react-bootstrap/Button';

export function OngoingGames() {
	const socket  = useContext(appContext);
	const [ongoingGames, setOngoingGames] = useState([]);
	let id = null;
	function updateOngoingGames(){
		socket.on('newGameCreated', (data) =>{
				console.log(JSON.stringify(data));
				setOngoingGames((ongoingGames) =>{
					return ongoingGames.concat(data)
					}); // append and return new array reference
			})
		}

	useEffect(()=>{
				updateOngoingGames();
				console.log(`${JSON.stringify(ongoingGames)}`);
			}, []);



	useEffect(()=>{
		socket.emit('getAllOngoingGames', (data)=>{
				console.log(`getting all onging games :${JSON.stringify(data)}`)
				setOngoingGames(data);
			});
	}, []);

	

	return(
			<>
			<h1>
				Ongoing Games
			</h1>

			<div className="ongoingGames">
				{	ongoingGames.map((game, index) =>{
						return (
							<div className="ongoingGamesList">
							<div>{`Game Id : ${game.gameId}`}</div>
							<div>{`${game.type}`}</div>
							{game.type === 'Tic Tac Toe'
							&& 
							<Link to={`/game/tictactoe/${game.gameId}`}>
								<Button variant='outline-dark'>></Button>
							</Link>
							}
							{game.type === 'Connect4'
							&& 
							<Link to={`/game/connect4/${game.gameId}`}>
								<Button variant='outline-dark'>></Button>
							</Link>
							}
							</div>
							)
					})
				}
			</div>
			</>
			)
}
