import { useContext, useState, useEffect } from "react";
import { appContext } from "./../../AppContext";
import { Link } from "react-router-dom";
import "./../../App.css";
import "./index.css";
import { Container, Row, Col, Button, Card } from "react-bootstrap";

export function OngoingGames() {
  const { socket } = useContext(appContext);
  const [ongoingGames, setOngoingGames] = useState([]);
  let id = null;
  useEffect(() => {
    socket.on("newGameCreated", (data) => {
      setOngoingGames((ongoingGames) => [...ongoingGames,data]);
      }); // append and return new array reference
    
    return ()=>{
      socket.off('newGameCreated', (data) => {
      setOngoingGames((ongoingGames) => [...ongoingGames,data]);
      })
    }
  }, []);
  useEffect(() => {
    socket.emit("getAllOngoingGames", (data) => {
      console.log(`getting all onging games :${JSON.stringify(data)}`);
      setOngoingGames(data);
    });
  }, []);

  return (
    <>
      <h1>Ongoing Games</h1>

      <Container>
        <Row xs={2} xl={2} md={2} className='g-4'>
          <Col xs={2} xl={2} md={2}>
            <Link to='/newGame' style={{ textDecoration: "none" }}>
              <Card className='new_game'>
                <Card.Body>
                  <Card.Text>+</Card.Text>
                  <Card.Text>New Game</Card.Text>
                </Card.Body>
              </Card>
            </Link>
          </Col>
          {ongoingGames.map((game, index) => {
            return (
              <Col xs={12} md={500}>
                <Card>
                  <Card.Header>{`${game.type}`}</Card.Header>
                  <Card.Body>
                    {game.users.map((user) => {
                      return <Card.Text>{user}</Card.Text>;
                    })}
                  </Card.Body>
                  <Card.Footer>
                    <Card.Link>
                      {game.type === "Tic Tac Toe" && (
                        <Link to={`/game/tictactoe/${game.gameId}`}>
                          <Button variant='outline-dark'>Join</Button>
                        </Link>
                      )}
                      {game.type === "Connect4" && (
                        <Link to={`/game/connect4/${game.gameId}`}>
                          <Button variant='outline-dark'>Join</Button>
                        </Link>
                      )}
                    </Card.Link>
                  </Card.Footer>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
}
