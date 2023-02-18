import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';
export class Home extends Component {
	render(){
		return(
			<Container>
				
				<div>
					<Link to='/newGame'>
						<Button variant='outline-dark'>New Game</Button>
					</Link>
				</div>
				<div>
					<Link to='/join'>
							<Button variant='outline-dark'>Join Ongoing Games</Button>
					</Link>
				</div>
				
			</Container>
			)
	}
}