import { useState, useEffect, useContext } from "react";
import { Container, Modal, Button } from "react-bootstrap";
import { appContext } from "../../AppContext";
import "bootstrap/dist/css/bootstrap.min.css";
import TicTacToeOptions from "../GameOptions/TicTacToeOptions";
import Connect4Options from "../GameOptions/Connect4Options";
export function JoinOptions({ handleJoinGamePrompt, type, gameId }) {
  const { joinGame } = useContext(appContext);
  const [component, setComponent] = useState(null);
  const handleChosenOption = (option) => {
    console.log(`joining game after choosing option`);
    joinGame(type, option, gameId);
    handleJoinGamePrompt();
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
  }, [type, gameId, handleChosenOption]);
  return (
    <Modal onHide={handleJoinGamePrompt} show={type}>
      <Modal.Dialog>
        {component}

        <Modal.Footer>
          <Button onClick={handleJoinGamePrompt} variant='outline-dark'>
            Close
          </Button>
        </Modal.Footer>
      </Modal.Dialog>
    </Modal>
  );
}
