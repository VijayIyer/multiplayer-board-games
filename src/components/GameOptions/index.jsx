import TicTacToeOptions from "./TicTacToeOptions";
import Connect4Options from "./Connect4Options";
import { Container, Modal, Button } from "react-bootstrap";
import { appContext } from "../../AppContext";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect, useContext } from "react";
function GameOptions({ type, handlePrompt }) {
  const { createNewGame } = useContext(appContext);
  const [component, setComponent] = useState(null);
  const handleChosenOption = (option) => {
    createNewGame(type, option);
    handlePrompt();
  };
  useEffect(() => {
    console.log(`setting show to ${type}`);
    switch (type) {
      case "TicTacToe":
        setComponent(
          <TicTacToeOptions handleChosenOption={handleChosenOption} />
        );
        break;
      case "Connect4":
        setComponent(
          <Connect4Options handleChosenOption={handleChosenOption} />
        );
        break;
      default:
        break;
    }
  }, [type]);

  return (
    <Modal onHide={handlePrompt} show={type}>
      <Modal.Dialog>
        {component}

        <Modal.Footer>
          <Button onClick={handlePrompt} variant='outline-dark'>
            Close
          </Button>
        </Modal.Footer>
      </Modal.Dialog>
    </Modal>
  );
}
export { GameOptions };
