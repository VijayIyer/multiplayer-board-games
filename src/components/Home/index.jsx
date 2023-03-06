import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
export class Home extends Component {
	render(){
		return(
			
			<Container className="d-flex mt-5 gap-3 flex-column">
				
				<div>
					<Link to='/newGame'>
						<Button variant='outline-dark'>New Game</Button>
					</Link>
				</div>
				<div>
					<Link to='/join'>
							<Button variant='outline-dark'>Join an ongoing game</Button>
					</Link>
				</div>
				
			</Container>
			
			)
	}
}