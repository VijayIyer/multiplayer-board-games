import { ListGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
export default function TicTacToeOptions({ handleChosenOption }){
	return (
			<>
				<h3 className='p-3'>Choose to play as:</h3>
				<ListGroup>
					<ListGroup.Item 
					onClick={()=>handleChosenOption('X')} 
					action>
						X
					</ListGroup.Item>
					<ListGroup.Item 
					onClick={()=>handleChosenOption('O')} 
					action>
						0
					</ListGroup.Item>
				</ListGroup>
			</>
		);
}