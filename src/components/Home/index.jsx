import { useEffect, useContext, useState } from "react";
import { Button, Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { appContext } from "./../../AppContext";
import { useNavigate } from "react-router-dom";
import { JoinOptions } from "../JoinOptions";
import "./index.css";
import axios from "axios";
export function Home() {
  const navigate = useNavigate();
  const { user, setUserName, socket, ongoingGames, setOngoingGames } =
    useContext(appContext);
  const [promptType, setPromptType] = useState(null);
  const [joiningGameId, setJoiningGameId] = useState(null);
  const handleJoinGamePrompt = () => {
    setPromptType(null);
    setJoiningGameId(null);
  };
  const joinGame = (gameId) => {
    console.log(`sending event to join game ${gameId}`);
    socket.emit("checkIfInGame", { id: gameId, token: user }, (data) => {
      console.log(data);
      let route;
      if (!data.alreadyInGame) {
        setPromptType(data.gameData.type);
        setJoiningGameId(data.gameData.id);
      } else {
        switch (data.gameData.type) {
          case "TicTacToe":
            route = `/game/TicTacToe/${gameId}`;
            break;
          case "Connect4":
            route = `/game/Connect4/${gameId}`;
            break;
          default:
            break;
        }
        navigate(route, { state: data.gameData });
      }
    });
  };
  useEffect(() => {
    socket.emit("getAllOngoingGames", (data) => {
      console.log(`getting all onging games :${JSON.stringify(data)}`);
      setOngoingGames(data);
    });
  }, [socket]);
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
  }, [user, navigate, setUserName]);

  useEffect(() => {
    function navigateToGame(data) {
      if (data.type === "TicTacToe") {
        navigate(`/game/TicTacToe/${data.id}`, { state: data });
      } else if (data.type === "Connect4") {
        navigate(`/game/Connect4/${data.id}`, { state: data });
      }
    }
    socket.on("newGameDetails", (data) => navigateToGame(data));
    return () => {
      socket.off("newGameDetails", (data) => navigateToGame(data));
    };
  }, [socket, navigate]);

  return (
    <>
      {promptType !== null && joiningGameId !== null ? (
        <JoinOptions
          handleJoinGamePrompt={handleJoinGamePrompt}
          type={promptType}
          gameId={joiningGameId}
        />
      ) : null}
      <Container className='d-flex gap-3 flex-column' fluid>
        <Row xs={4} lg={4} md={4}>
          <Col>
            <Link to='/newGame' style={{ textDecoration: "none" }}>
              <Card className='gameCard'>
                <Card.Body>
                  <Card.Text>+</Card.Text>
                  <Card.Text>New Game</Card.Text>
                </Card.Body>
              </Card>
            </Link>
          </Col>
          {ongoingGames.map((game, index) => {
            return (
              <Col key={game.id} xs={3} sm={3} lg={3} md={3}>
                <Card className='gameCard'>
                  <Card.Header>{`${game.type} #${game.id}`}</Card.Header>
                  <Card.Body>
                    {game.users.map((user) => {
                      return <Card.Text>{user}</Card.Text>;
                    })}
                  </Card.Body>
                  <Card.Footer>
                    <Card.Link>
                      {game.type === "TicTacToe" && (
                        <Button
                          onClick={() => joinGame(game.id)}
                          variant='outline-dark'
                        >
                          Join
                        </Button>
                      )}
                      {game.type === "Connect4" && (
                        <Button
                          onClick={() => joinGame(game.id)}
                          variant='outline-dark'
                        >
                          Join
                        </Button>
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
