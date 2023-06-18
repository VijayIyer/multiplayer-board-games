import { useEffect, useContext, useState } from "react";
import { Button, Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { appContext } from "./../../AppContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export function Home() {
  const navigate = useNavigate();
  const { user, setUser, userName, setUserName, socket } =
    useContext(appContext);
  const [ongoingGames, setOngoingGames] = useState([]);
  let id = null;
  function updateOngoingGames() {
    socket.on("newGameCreated", (data) => {
      console.log(JSON.stringify(data));
      setOngoingGames((ongoingGames) => [...ongoingGames, data]); // append and return new array reference
    });
  }

  useEffect(() => {
    updateOngoingGames();
  }, []);
  useEffect(() => {
    socket.emit("getAllOngoingGames", (data) => {
      console.log(`getting all onging games :${JSON.stringify(data)}`);
      setOngoingGames(data);
    });
  }, []);
  useEffect(() => {
    if (user) {
      axios
        .get(process.env.REACT_APP_SERVER_URL + "/user", {
          headers: {
            Authorization: "Bearer " + user,
          },
        })
        .then((res) => res.data)
        .then((user) => {
          console.log(`setting username - ${user.name}`);
          setUserName(user.name);
        })
        .catch((err) => console.error(err));
    } else {
      console.log(`no user token`);
      navigate("/login");
    }
  }, [user]);

  return (
    <Container className='d-flex gap-3 flex-column' fluid>
      <Row xs={4} lg={4} md={4}>
        <Col>
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
            <Col xs={2} sm={2} lg={2} md={2}>
              <Card>
                <Card.Header>{`${game.type} #${game.gameId}`}</Card.Header>
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
  );
}
