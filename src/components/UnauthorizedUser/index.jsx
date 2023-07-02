import { Modal, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { appContext } from "../../AppContext";
export default function UnauthorizedUser() {
  const { authorized, setAuthorized } = useContext(appContext);
  const handleClose = () => {
    setAuthorized(true);
  };
  return (
    <Modal show={!authorized} onHide={handleClose}>
      <Modal.Dialog>
        <Modal.Header closeButton>
          <Modal.Title>Login Failed / No Token</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          You are unauthorized to perform the previous action. Please login to
          get auth token
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={handleClose} variant='outline-dark'>
            <Link to='/login' style={{ textDecoration: "none" }}>
              Go to login
            </Link>
          </Button>
        </Modal.Footer>
      </Modal.Dialog>
    </Modal>
  );
}
