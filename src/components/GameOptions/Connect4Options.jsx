import { ListGroup } from 'react-bootstrap';
export default function Connect4Options({ handleChosenOption }){
	return (
			<>
				<h3 className='p-3'>Choose to play as:</h3>
				<ListGroup>
					<ListGroup.Item 
					onClick={()=>handleChosenOption('Red')} 
					action>
						Red
					</ListGroup.Item>
					<ListGroup.Item 
					onClick={()=>handleChosenOption('Blue')} 
					action>
						Blue
					</ListGroup.Item>
				</ListGroup>
			</>
		);
}