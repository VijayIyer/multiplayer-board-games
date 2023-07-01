import { Modal, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
export default function UnauthorizedUser({ authorized }) {
  const handleClose = () => {};
  return (
    <Modal show={!authorized}>
      <Modal.Dialog>
        <Modal.Header closeButton>
          <Modal.Title>Login Failed / No Token</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>
            You are unauthorized to perform the previous action. Please login to
            get auth token
          </p>
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
