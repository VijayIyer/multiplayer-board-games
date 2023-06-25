import { useEffect, useContext, useState } from "react";
import { Button, Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { appContext } from "./../../AppContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export function Home() {
  const navigate = useNavigate();
  const { user, setUser, userName, setUserName, socket } = useContext(appContext);
  const [ongoingGames, setOngoingGames] = useState([]);
  function updateOngoingGames() {
    socket.on("newGameCreated", (data) => {
      console.log(JSON.stringify(data));
      setOngoingGames((ongoingGames) => [...ongoingGames, data]); // append and return new array reference
    });
  }
  const joinGame = (gameId)=>{
    console.log(`sending event to join game ${gameId}`);
    socket.emit('joinGame', { 'id':gameId, 'token':user }, (data)=>{
      console.log(`joined game ${JSON.stringify(data)}`);
      let route;
      switch(data.type){
        case 'Tic Tac Toe':
          route = `/game/tictactoe/${data.gameId}`;
          break;
        case 'Connect4':
          route = `/game/connect4/${data.gameId}`;
          break;
        default:
          break;
      }
      navigate(route);
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

  useEffect(() => {
        socket.on("newGameDetails", (data)=>{
          if(data.type === 'TicTacToe'){
            navigate(`/game/tictactoe/${data.id}`, { state : data});
            }
          else if (data.type === 'Connect4'){
            navigate(`/game/connect4/${data.id}`, { state: data});
            }
        });
        return ()=>{
          socket.off("newGameDetails", (data)=>{
          if(data.type === 'TicTacToe'){
            navigate(`/game/tictactoe/${data.id}`, { state : data});
            }
          else if (data.type === 'Connect4'){
            navigate(`/game/connect4/${data.id}`, { state: data});
            }
          });
        }
    }, []);

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
            <Col xs={3} sm={3} lg={3} md={3}>
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
                      <Button 
                        onClick={()=>joinGame(game.gameId)} 
                        variant='outline-dark'>
                        Join
                      </Button>
                    )}
                    {game.type === "Connect4" && (
                      <Button 
                        onClick={()=>joinGame(game.gameId)} 
                        variant='outline-dark'>
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
  );
}
