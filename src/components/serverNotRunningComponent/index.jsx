import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
export const ServerNotRunningComponent  = () =>{
	return (
			<div className="container">
				<h1>
					Server not able to create game  / not running at this moment
				</h1>
				
				<Link to="/">
					<Button variant='outline-dark'>
						Back Home
					</Button>
				</Link>
			</div>
		)
}