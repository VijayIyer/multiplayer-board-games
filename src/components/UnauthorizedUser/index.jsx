import { Modal, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
export default function UnauthorizedUser({ authorized }){
	const [show, setShow] = useState(false);
	useEffect(()=>{
		setShow(!authorized);
	}, [show])
	return (
		<div className={`modal ${show ? 'show': ''}`}>
			<Modal.Dialog>
	        <Modal.Header closeButton>
	          <Modal.Title>Login Failed / No Token</Modal.Title>
	        </Modal.Header>

	        <Modal.Body>
	          <p>You are unauthorized to perform the previous action. Please login to get auth token</p>
	        </Modal.Body>

	        <Modal.Footer>
	          <Button variant="secondary"><Link to='/login'>Go to login</Link></Button>
	          
	        </Modal.Footer>
	      </Modal.Dialog>
    </div>
		)
}