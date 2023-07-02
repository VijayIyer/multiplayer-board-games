import { Card, Button } from "react-bootstrap";
export function GameCard({ game, joinGame }) {
  return (
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
            <Button onClick={() => joinGame(game.id)} variant='outline-dark'>
              Join
            </Button>
          )}
          {game.type === "Connect4" && (
            <Button onClick={() => joinGame(game.id)} variant='outline-dark'>
              Join
            </Button>
          )}
        </Card.Link>
      </Card.Footer>
    </Card>
  );
}
