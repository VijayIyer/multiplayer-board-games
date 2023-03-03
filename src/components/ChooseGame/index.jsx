import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { TicTacToe } from '../TicTacToe';
import { Connect4 } from '../Connect4';
import { PageNotFound } from '../PageNotFound';

export class ChooseGame extends Component{
	render(){
		return (
			<div>
			<h1>Choose New Game:</h1>
				<ul>
					<li>
						<Link to='/game/tictactoe'>
							<Button variant='outline-dark'>Tic Tac Toe</Button>
						</Link>
					</li>
					<li>
						<Link to='/game/connect4'>
								<Button variant='outline-dark'>Connect-4</Button>
						</Link>
					</li>
					<li>
						<Link to='/game/chutesAndLadders'>
								<Button variant='outline-dark'>Chutes and Ladders</Button>
							</Link>
					</li>
				</ul>
			
			</div>

			)
	}
}